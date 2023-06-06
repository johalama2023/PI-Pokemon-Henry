import React from 'react';
import './Pagination.css';

const Pagination = ({ page, maxPage, setPage }) => {
  const pagesPerBlock = 6;
  const currentBlock = Math.ceil(page / pagesPerBlock);
  const maxBlock = Math.ceil(maxPage / pagesPerBlock);

  const arrayPages = [];
  const initialPage = (currentBlock - 1) * pagesPerBlock + 1;
  const finalPage =
    maxBlock === currentBlock ? maxPage : currentBlock * pagesPerBlock;
  for (let i = initialPage; i <= finalPage; i++) {
    arrayPages.push(i);
  }
  const handlePage = number=>{
    setPage(number)
  }
  const handlePrevious = ()=>{
    if(page -1 > 0){
        setPage(page-1)
    }
  }
  const handleNext = ()=>{
    if(page +1 <= maxPage){
        setPage(page+1)
    }
  }

  return (
    <div className="pagination">
    {page > 1 && (
      <div
        onClick={handlePrevious}
        className="pagination__prev pagination__active"
      >
        &#60;
      </div>
    )}
    <ul className="pagination__container">
      {arrayPages.map((e) => (
        <li
          onClick={() => handlePage(e)}
          className={`pagination__page ${page === e && "pagination__active"}`}
          key={e}
        >
          {e}
        </li>
      ))}
    </ul>
    {page < maxPage && (
      <div
        onClick={handleNext}
        className="pagination__next pagination__active"
      >
        &#62;
      </div>
    )}
  </div>
  );
};

export default Pagination;
