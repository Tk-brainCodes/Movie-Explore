"use client"
import { usePagination, DOTS } from "../hooks/usePagination";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import classNames from "classnames";

interface IPaginationProps {
  onPageChange: any;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  className: any;
}

const Pagination = ({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
  className,
}: IPaginationProps) => {
  let siblingCount = 1;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange as []).length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = (paginationRange as [])[(paginationRange as []).length - 1];

  const returnPageOnDropdownClick = (pageNumber: number) => (): void => {
    onPageChange(pageNumber);
  };

  return (
    <>
      <div className='pagination-area'>
        <ul
          className={classNames("pagination-container", {
            [className]: className,
          })}
        >
          <span
            className={classNames("pagination-item", {
              disabled: currentPage === 1,
            })}
            onClick={onPrevious}
          >
            <IconChevronLeft size={20} />
          </span>
          {(paginationRange as []).map((pageNumber) => {
            if (pageNumber === DOTS) {
              return <li className='pagination-item dots'>&#8230;</li>;
            }

            return (
              <li
                className={classNames("pagination-item", {
                  selected: pageNumber === currentPage,
                })}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            );
          })}
          <span
            className={classNames("pagination-item", {
              disabled: currentPage === lastPage,
            })}
            onClick={onNext}
          >
            <IconChevronRight size={20}/>
          </span>
        </ul>
      </div>
    </>
  );
};
export default Pagination;
