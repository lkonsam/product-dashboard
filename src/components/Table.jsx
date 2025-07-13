import React, { useState, useMemo, useEffect, useRef } from "react";
import Pagination from "./Pagination";

export default function Table({ data, headers, className = "" }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: null,
  });
  const [pageNumbers, setPageNumbers] = useState([]);
  const [draggableHeaders, setDraggableHeaders] = useState(headers);

  const [inputQuery, setInputQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const dragIndex = useRef(null);
  const itemsPerPage = 10;

  useEffect(() => {
    setDraggableHeaders(headers);
  }, [headers]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(inputQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeout); // cleanup
  }, [inputQuery]);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      draggableHeaders.some((header) =>
        row[header.field]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [data, draggableHeaders, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const sortedData = useMemo(() => {
    if (sortConfig.field) {
      return [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.field] ?? "";
        const bValue = b[sortConfig.field] ?? "";

        if (!isNaN(aValue) && !isNaN(bValue)) {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return sortConfig.direction === "asc"
          ? aValue.toString().localeCompare(bValue)
          : bValue.toString().localeCompare(aValue);
      });
    }
    return filteredData;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, sortedData]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSort = (field) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return {
          field,
          direction:
            prev.direction === "asc"
              ? "desc"
              : prev.direction === "desc"
              ? null
              : "asc",
        };
      }
      return { field, direction: "asc" };
    });
  };

  useEffect(() => {
    const range = 1;
    const arr = [1];
    if (currentPage - range > 2) arr.push("..");
    for (
      let i = Math.max(2, currentPage - range);
      i <= Math.min(totalPages - 1, currentPage + range);
      i++
    ) {
      arr.push(i);
    }
    if (currentPage + range < totalPages - 1) arr.push("...");
    if (totalPages > 1) arr.push(totalPages);
    setPageNumbers(arr);
  }, [currentPage, totalPages]);

  // Drag functions
  const handleDragStart = (index) => {
    dragIndex.current = index;
  };

  const handleDrop = (index) => {
    const from = dragIndex.current;
    if (from === null || from === index) return;
    const newHeaders = [...draggableHeaders];
    const [moved] = newHeaders.splice(from, 1);
    newHeaders.splice(index, 0, moved);
    setDraggableHeaders(newHeaders);
    dragIndex.current = null;
  };

  return (
    <div className="mb-3 pb-1 border border-gray-200 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
      <div className="min-w-full inline-block align-middle">
        <table
          className={`min-w-max bg-white text-sm text-left mx-auto ${className}`}
        >
          <thead>
            <tr>
              <th
                colSpan={draggableHeaders.length}
                className="textleft md:text-right text-gray-400 p-3"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="p-1 border rounded w-80 lg:w-2/5"
                />
              </th>
            </tr>
            <tr>
              {draggableHeaders.map((header, index) => (
                <th
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                  onClick={() => header.sortable && handleSort(header.field)}
                  className={`px-4 py-2 border-b cursor-move select-none ${
                    header.sortable ? "hover:underline" : ""
                  } ${header.className || ""}`}
                >
                  <div className="flex items-center gap-1">
                    <span>{header.label}</span>
                    {header.sortable && sortConfig.field === header.field && (
                      <span>
                        {sortConfig.direction === "asc" ? "⬆️" : "⬇️"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={draggableHeaders.length}
                  className="text-center p-4 text-gray-400"
                >
                  No data found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr key={index} className="border-b">
                  {draggableHeaders.map((header, i) => (
                    <td
                      key={i}
                      className={`px-4 py-2 ${header.className || ""}`}
                    >
                      {header.field === "serial"
                        ? (currentPage - 1) * itemsPerPage + index + 1
                        : row[header.field] || "-"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        pageNumbers={pageNumbers}
      />
    </div>
  );
}
