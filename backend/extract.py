import sys
import fitz  # PyMuPDF
import pytesseract
import numpy as np
import cv2
import io
from PIL import Image
import re
import json
import os
from datetime import datetime

# Set the path to Tesseract
pytesseract.pytesseract.tesseract_cmd = r"C:\Users\Ashwin\tesseract.exe"

def extract_text(file_path):
    extracted_text = ""

    if file_path.lower().endswith(".pdf"):
        doc = fitz.open(file_path)
        for page in doc:
            text = page.get_text().strip()
            if not text:
                pix = page.get_pixmap(dpi=300)
                img = Image.open(io.BytesIO(pix.tobytes("png")))
                text = pytesseract.image_to_string(img)
            extracted_text += text + "\n"

    elif file_path.lower().endswith(('.jpg', '.jpeg', '.png')):
        img = cv2.imread(file_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        denoised = cv2.fastNlMeansDenoising(gray, h=30)
        sharpened = cv2.filter2D(denoised, -1, np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]]))
        extracted_text = pytesseract.image_to_string(sharpened)

    return extracted_text.strip()

def extract_date(text):
    match = re.search(r'Date[:\s]*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})', text, re.IGNORECASE)
    if match:
        raw_date = match.group(1)
        for fmt in ["%d/%m/%y", "%d-%m-%Y", "%d/%m/%Y"]:
            try:
                return datetime.strptime(raw_date, fmt).strftime("%Y-%m-%d")
            except ValueError:
                continue
    return None

def extract_amount(text):
    lines = text.lower().splitlines()
    candidate_amounts = []

    for line in lines:
        if any(k in line for k in ['total', 'sub total', 'amount', 'grand total']):
            nums = re.findall(r'\d+\.\d{1,2}', line)
            nums = [float(n) for n in nums if float(n) >= 10.0]
            candidate_amounts.extend(nums)

    if candidate_amounts:
        return max(candidate_amounts)

    all_nums = re.findall(r'\d+\.\d{1,2}', text)
    amounts = [float(n) for n in all_nums if 10 <= float(n) <= 100000]
    return max(amounts) if amounts else None

def classify_type(text):
    text = text.lower()
    if "restaurant" in text or "dine" in text or "bill" in text:
        return "Expense"
    elif "credited" in text or "salary" in text:
        return "Income"
    return "Unknown"

def auto_category(text):
    text = text.lower()
    if "restaurant" in text or "food" in text or "biriyani" in text:
        return "Food & Dining"
    elif "electricity" in text:
        return "Utilities"
    elif "fuel" in text:
        return "Transportation"
    return "Miscellaneous"

def extract_tax_info_structured(lines):
    tax_info = []
    for line in lines:
        match = re.search(r'(CGST|SGST|IGST|VAT|Service Tax)[^\d]*(\d+(\.\d+)?)%[^\d]*(\d+(\.\d+)?)', line, re.IGNORECASE)
        if match:
            tax_info.append({
                "type": match.group(1),
                "rate": float(match.group(2)),
                "amount": float(match.group(4))
            })
    return tax_info

def extract_tax_lines(text):
    return [line.strip() for line in text.split('\n') if re.search(r'\b(?:CGST|SGST|IGST|GST|TAX(?:ABLE)?|VAT)\b', line.upper())]


def clean_item_name(name):
    name = re.sub(r'^[^a-zA-Z]+', '', name)
    name = re.sub(r'[^a-zA-Z\s&]+$', '', name)
    name = re.sub(r'\s+', ' ', name)
    return name.strip().title()

def extract_items(lines):
    items = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()

        # 1️⃣ Try matching one-line item entries: e.g. "Soft Drinks 2 40.00 80.00"
        one_line_match = re.search(r'^(.+?)\s+(\d+)\s+([\d.,]+)\s+([\d.,]+)$', line)
        if one_line_match:
            name = clean_item_name(one_line_match.group(1))
            qty = int(one_line_match.group(2))
            price = float(one_line_match.group(3).replace(',', ''))
            amount = float(one_line_match.group(4).replace(',', ''))
            if len(name) > 1:
                items.append({
                    "name": name,
                    "qty": qty,
                    "price": price,
                    "amount": amount
                })
            i += 1
            continue

        # 2️⃣ If next line has quantity-price info, current line is name
        if i + 1 < len(lines):
            next_line = lines[i + 1].strip()
            two_line_match = re.search(r'^(\d+)\s+([\d.,]+)\s+([\d.,]+)$', next_line)
            if two_line_match:
                name = clean_item_name(line)
                qty = int(two_line_match.group(1))
                price = float(two_line_match.group(2).replace(',', ''))
                amount = float(two_line_match.group(3).replace(',', ''))
                if len(name) > 1:
                    items.append({
                        "name": name,
                        "qty": qty,
                        "price": price,
                        "amount": amount
                    })
                i += 2
                continue

        i += 1
    return items



if __name__ == "__main__":
    file_path = sys.argv[1]

    # Debug logs
    print(">> [Python] File exists?", os.path.exists(file_path), file=sys.stderr)
    print(">> [Python] Path received:", file_path, file=sys.stderr)

    text = extract_text(file_path)
    lines = text.splitlines()

    print(">> Extracted Text:\n", text, file=sys.stderr)
    print(">> Tax Lines Found:", extract_tax_lines(text), file=sys.stderr)

    result = {
        "amount": extract_amount(text),
        "type": classify_type(text),
        "category": auto_category(text),
        "description": text[:200],
        "billDate": extract_date(text),
        "taxInfo": extract_tax_info_structured(lines),
        "rawText": text,
        "items": extract_items(lines),
    }

    print(json.dumps(result))  # 🔥 This is what goes back to Express
