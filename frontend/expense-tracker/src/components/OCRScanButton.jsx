import React, { useRef, useState } from "react";
import { Scan } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import OCRResultModal from "./OCRResultModal"; // make sure path is correct
import { API_PATHS } from "../utils/apiPaths";

export default function OCRScanButton() {
  const fileInputRef = useRef();
  const [extractedData, setExtractedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  

  const handleClick = () => {
    fileInputRef.current.click();
  };

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  event.target.value = null; // Reset file input to allow same file again
  setExtractedData(null);

  setImagePreview(URL.createObjectURL(file)); // 🖼️ Generate preview URL

  const formData = new FormData();
  formData.append("billImage", file);
  const token = localStorage.getItem("token");

  const toastId = toast.loading("Scanning...");
  try {
    setIsLoading(true);
    const res = await axios.post(API_PATHS.OCR.SCAN, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    setExtractedData(res.data.data);
    toast.success("Scanned successfully!", { id: toastId });
  } catch (error) {
    toast.error("Failed to scan receipt", { id: toastId });
  } finally {
    setIsLoading(false);
  }
};



 

  return (
    <>
      <button onClick={handleClick} disabled={isLoading} title="Scan Receipt">
          <Scan className="w-8 h-8 p-1 rounded-full text-white hover:bg-gray-900 hover:text-orange-500 hover:scale-105 duration-500 transition cursor-pointer" />
      </button>

      <input
        type="file"
        accept="image/*,application/pdf"
        capture="environment"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {extractedData && (
        <OCRResultModal
          data={extractedData}
          image={imagePreview} // ✅ Pass preview
          onClose={() => setExtractedData(null)}
        />
      )}
    </>
  );
}

