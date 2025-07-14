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

      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`transition-colors duration-200 hover:bg-yellow-400 border rounded px-2 py-1 md:px-3 md:py-1
      ${currentPage === page ? "bg-blue-500 text-white" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="p-0 m-0 text-gray-500 cursor-default">
            {page}
          </span>
        )
      )}

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
