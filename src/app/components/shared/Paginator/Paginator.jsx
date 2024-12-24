import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

const Paginator = ({ page, setPage, totalPages, limit = 4 }) => {
  // Helper function to generate an array of visible page numbers
  const getPageNumbers = () => {
    const pages = [];
  
    // If there is only one page, just show it
    if (totalPages === 1) {
      pages.push(1);
    }
    // If there are two or three pages, show them all without ellipses
    else if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    // If total pages are less than or equal to limit, show all pages
    else if (totalPages <= limit) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfLimit = Math.floor(limit / 2);
  
      // If the current page is within the first few pages
      if (page <= 3) {
        for (let i = 1; i <= limit; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
      // If the current page is near the end
      else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - limit + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      }
      // If the current page is somewhere in the middle
      else {
        pages.push(1);
        pages.push('...');
        for (let i = page - halfLimit; i <= page + halfLimit; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
  
    return pages;
  };
  
  

  const pageNumbers = getPageNumbers();

  return (
    <div style={{ display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        width:"400px"
        }}>
      <button
        disabled={page === 1}
        onClick={() => {
          setPage(page - 1);
        }}
        style={{padding:"10px",flexShrink:0, fontSize:"0.8rem", color:"white", backgroundColor:"#d51c29", border:"none", borderRadius:"6px", outline:"none"}}
      >
        <FaAnglesLeft />
      </button>
      {pageNumbers.map((pageNum, index) => (
        <button
          key={index}
          disabled={pageNum === '...'}
          onClick={() => {
            if (pageNum !== '...') setPage(pageNum);
          }}
          style={{
            color: pageNum === page ? '#d51c29' : 'black',
            cursor: pageNum === '...' ? 'default' : 'pointer',
            border:"none",
            fontSize:"1.2rem",
            fontWeight:"bold",
            padding:"10px",
            background:"transparent",
            flexShrink: 0,
          }}
        >
          {pageNum}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => {
          setPage(page + 1);
        }}
        style={{padding:"10px", fontSize:"0.8rem",flexShrink: 0, color:"white", backgroundColor:"#d51c29", border:"none", borderRadius:"6px", outline:"none"}}
      >
        <FaAnglesRight />
      </button>
    </div>
  );
};

export default Paginator;
