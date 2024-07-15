import React, { useState, useEffect } from "react";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pagesArray = Array.from({ length: pageCount }, (_, index) => index + 1);
    setPages(pagesArray);
  }, [itemsCount, pageSize]);

  if (pages.length <= 1) return null;

  return (
    <nav>
      
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <span className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
