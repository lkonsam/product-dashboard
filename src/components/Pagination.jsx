import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageNumbers,
}) {
  return (
    <div className="flex justify-center items-center gap-2 p-3">
      <button
        className="px-2 text-xl disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ⬅️
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={`px-3 py-1 border rounded ${
            currentPage === page ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={typeof page !== "number"}
        >
          {page}
        </button>
      ))}

      <button
        className="px-2 text-xl disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ➡️
      </button>
    </div>
  );
}
