import paginationStyle from './pagination.module.css';
import { FaCaretRight } from "react-icons/fa";
import { FaCaretLeft } from "react-icons/fa";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageButtons = () => {
        const pageButtons = [];

        pageButtons.push(
            <button
                key={1}
                onClick={() => onPageChange(1)}
                className={currentPage === 1 ? paginationStyle.active : ''}
            >
                1
            </button>
        );

        if (totalPages > 2) {
            if (currentPage > 2) {
                pageButtons.push(<span key="ellipsis1"><IoEllipsisHorizontalSharp /></span>);
            }

            if (currentPage !== 1 && currentPage !== totalPages) {
                pageButtons.push(
                    <button key={currentPage} className={paginationStyle.active}>
                        {currentPage}
                    </button>
                );
            }

            if (currentPage < totalPages - 1) {
                pageButtons.push(<span key="ellipsis2"><IoEllipsisHorizontalSharp /></span>);
            }
        }

        if (totalPages > 1) {
            pageButtons.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={currentPage === totalPages ? paginationStyle.active : ''}
                >
                    {totalPages}
                </button>
            );
        }

        return pageButtons;
    };

    return (
        <div className={paginationStyle.pagination}>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                <FaCaretLeft />
            </button>
            {renderPageButtons()}
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                <FaCaretRight />
            </button>
        </div>
    );
};

export default Pagination;
