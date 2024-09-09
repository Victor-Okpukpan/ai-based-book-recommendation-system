import { useState } from "react";
import CustomModal from "@/components/CustomModal";

export default function Suggestions({ suggestions }) {
  let [isOpen, setIsOpen] = useState(false);
  let [data, setData] = useState({});

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(obj) {
    setIsOpen(true);
    setData(obj);
  }

  return (
    <div className="w-full lg:px-4 pb-40">
      <div className="mx-auto w-full md:h-72 grid gap-3 grid-cols-2 md:grid-cols-3">
        {/* Iterate through each suggestion */}
        {suggestions.map((obj, index) => (
          <div
            key={index}
            className="col-span-1 lg:mx-2 mb-4 h-fit border shadow-md hover:shadow-xl cursor-pointer"
            onClick={() => openModal(obj)}
          >
            <img src={obj.image} alt={obj.title} className="w-full h-auto" />
          </div>
        ))}

        {/* Custom modal to display the book details */}
        <CustomModal closeModal={closeModal} isOpen={isOpen} data={data} />
      </div>
    </div>
  );
}
