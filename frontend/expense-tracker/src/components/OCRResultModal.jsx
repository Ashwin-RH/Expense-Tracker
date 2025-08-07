import React, { useEffect, useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button"; // ✅ Required
import axios from "axios";
import toast from "react-hot-toast";
import { API_PATHS } from "../utils/apiPaths";
import { CalendarRange, IndianRupee } from "lucide-react";
import { BiCategoryAlt } from "react-icons/bi";
import DashboardLayout from "./layouts/DashboardLayout";
import { IoMdClose } from "react-icons/io";



export default function OCRResultModal({ data, image, onClose }) {
  if (!data) return null;

  const { amount, category, billDate, items = [], taxInfo = [], rawText } = data;

  const [editedAmount, setEditedAmount] = useState(amount || '');
const [editedCategory, setEditedCategory] = useState(category || '');
const [editedDate, setEditedDate] = useState(billDate?.slice(0, 10) || '');
const [saving, setSaving] = useState(false);
const [enlarged, setEnlarged] = useState(false);


useEffect(() => {
  setEditedAmount(data.amount || '');
  setEditedCategory(data.category || '');
  setEditedDate(data.billDate?.slice(0, 10) || '');
}, [data]);

const handleSave = async () => {
  if (!editedAmount || !editedCategory || !editedDate) {
    toast.error("Please fill all fields before saving.");
    return;
  }

  setSaving(true); // disable button
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to save.");
      return;
    }

    const res = await axios.post(API_PATHS.TRANSACTIONS.SAVE, {
  ...data,
  amount: parseFloat(editedAmount),
  category: editedCategory,
  billDate: editedDate,
}, {
  headers: { Authorization: `Bearer ${token}` },
});


    toast.success("Expense saved successfully!");
    setTimeout(() => onClose(), 500); // Close after 0.5s close modal
  } catch (err) {
    console.error("Save Error:", err);
    toast.error("Failed to save expense.");
  }finally {
    setSaving(false); // re-enable button
  }
};




  return data && (   
<div className="fixed inset-0 z-40 bg-transparent  flex items-center justify-center">

{/* Modal Content */}

  <div className="absolute my-auto top-34.5 z-40 backdrop-blur-lg bg-gradient-to-r from-gray-800 via-gray-850 bg-[length:150%_100%] to-gray-900 text-white rounded-2xl  shadow-2xl p-6 border border-white/20 w-[90%] max-w-lg overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-gray-600">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Details</h2>
      <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-bold cursor-pointer"><IoMdClose/></button>
    </div>


       <div className="grid grid-cols-2 gap-4">
  {/* Amount Card */}
  <div className="flex w-[7rem] h-[5rem] md:h-28 md:w-[13.7rem] gap-1 md:gap-3 items-center bg-gradient-to-br from-black/20 via-black/5 to-white/20 px-2 py-2 md:px-4 md:py-3 rounded-2xl shadow-md shadow-black/40 border-t border-gray-500 justify-start text-white transition-transform">
    <div className="w-9 h-9 md:w-10 md:h-10 p-2 text-teal-400 bg-gradient-to-r from-teal-700/40 to-teal-800 border-2 border-teal-600 flex items-center justify-center rounded-full bg-teal-600/10 border">
      <IndianRupee className="text-[20px] md:text-[24px]" />
    </div>
    <div className="space-y-1">
      <h6 className="text-xs text-gray-300 md:text-sm font-medium">Amount</h6>
      <div className="flex items-center gap-1">
      <span className="text-gray-400 text-xl md:text-[27px] font-semibold">₹</span>
      <input
        type="number"
        className="bg-transparent text-white text-xl md:text-[27px] font-semibold w-full outline-none"
        value={editedAmount}
        onChange={(e) => setEditedAmount(e.target.value)}
      />
      </div>

      {/* <span className="text-xl md:text-[27px] font-semibold">₹ {amount}</span> */}
    </div>
  </div>

  {/* Category Card */}
  <div className="flex w-[7rem] h-[5rem] md:h-28 md:w-[13.7rem] items-center gap-1 md:gap-5 bg-gradient-to-br from-black/20 via-black/5 to-white/20 px-3 py-2 md:px-4 md:py-3 rounded-2xl shadow-md shadow-black/40 border-t border-gray-500 justify-center text-white">
    <div className="w-9 h-9 md:w-12 md:h-10 p-2 text-fuchsia-400 bg-gradient-to-r from-fuchsia-700/10 to-fuchsia-800/40 border-2 border-fuchsia-600 flex items-center justify-center rounded-full bg-fuchsia-600/10 border">
      <BiCategoryAlt className="text-[18px] md:text-[24px]"/>
    </div>
    <div>
      <h2 className="text-xs text-gray-300 md:text-sm font-medium">Category</h2>
      <input
        type="text"
        className="bg-transparent  text-white text-[15px] md:text-[22px] font-semibold w-full outline-none"
        value={editedCategory}
        onChange={(e) => setEditedCategory(e.target.value)}
      />

      {/* <span className="text-[15px] md:text-[22px] font-semibold">{category}</span> */}
    </div>
  </div>

  {/* Bill Date Card */}
  <div className="flex w-[9rem] h-[5rem] md:h-28 md:w-[17rem] items-center gap-2 md:gap-3 bg-gradient-to-br from-black/20 via-black/5 to-white/20 px-3 py-2 md:px-4 md:py-3 rounded-2xl shadow-md shadow-black/40 border-t border-gray-500 justify-start text-white">
    <div className="w-9 h-9 md:w-10 md:h-10 p-2 text-indigo-400 bg-gradient-to-r from-indigo-700/10 to-indigo-800/40 border-2 border-indigo-600 flex items-center justify-center rounded-full bg-indigo-600/10 border">
      <CalendarRange className="text-[18px] md:text-[24px]" />
    </div>
    <div>
      <h2 className="text-xs md:text-sm text-gray-300 font-medium">Bill Date</h2>
      <input
  type="date"
  className="bg-transparent text-white text-[12px] md:text-[22px] font-semibold w-full placeholder:text-sm md:placeholder:text-base outline-white"
  placeholder="YYYY/MM/DD"
  max={new Date().toISOString().split("T")[0]} // Prevent future dates
  value={editedDate}
  onChange={(e) => setEditedDate(e.target.value)}
/>

      {/* <span className="text-[15px] md:text-[22px] font-semibold">{billDate?.slice(0, 10)}</span> */}
    </div>
  </div>
  {image && (
  <div className="pl-10 md:pl-15 mb-4">
    {/* <h3 className="text-sm text-gray-400 mb-1">Scanned Image Preview</h3> */}
    <img
      src={image}
      alt="Scanned Bill"
      className="rounded-lg border border-white/20 shadow-lg w-20 h-[6rem] md:w-40 md:h-40 object-cover md:object-contain cursor-pointer hover:scale-105 duration-500 transition"
      onClick={() => setEnlarged(true)}
    />
  </div>
)}
</div>
        {items.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Items</h3>
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li key={index} className="border border-gray-500 p-2 rounded-lg">
                  <p><strong>{item.name}</strong></p>
                  <p className="text-slate-400">Qty: {item.qty}, Amount: ₹{item.amount}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {taxInfo.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Tax Info</h3>
            <ul className="space-y-1">
              {taxInfo.map((tax, index) => (
                <li key={index} className="border p-2 rounded">
                  <p>{tax.type} — {tax.rate}% → ₹{tax.amount}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
  onClick={handleSave}
  disabled={saving}
  className={`mt-4 px-4 py-2 text-white rounded-lg flex mx-auto transition cursor-pointer ${
    saving
      ? "bg-gray-500 cursor-not-allowed "
      : "bg-violet-500/50 hover:bg-violet-600"
  }`}
>
  {saving ? "Saving..." : "Save"}
</button>

{enlarged && (
  <div
    className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center"
    onClick={() => setEnlarged(false)}
  >
    <img
      src={image}
      alt="Full View"
      className="w-[15rem] h-[22rem] md:w-[27rem] md:h-[30rem] max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl"
    />
  </div>
)}
      </div>
    </div>
);
}