'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { paginationConstants } from '@/lib/global/constants/pagination.constant'
import useCustomSearchParams from '@/lib/hooks/useCustomSearchParams'
import { useCallback } from 'react'

interface CustomPaginationProps {
  itemsCount: number
}

export default function CustomPagination({
  itemsCount,
}: CustomPaginationProps) {
  const { getQuery, pushQuery } = useCustomSearchParams()
  const getPage = () => parseInt(getQuery('page') || '1') ?? 1
  const setPage = (page: number) => pushQuery('page', page.toString())
  const getItemsPerPage = () =>
    parseInt(
      getQuery('itemsPerPage') ||
        paginationConstants.itemsPerPage.default.toString()
    ) ?? paginationConstants.itemsPerPage.default
  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page)
    },
    [setPage]
  )

  // Generate page numbers
  const start = 1
  const nbPages = Math.ceil(itemsCount / getItemsPerPage())
  const totalPages = nbPages - start + 1
  const getPageNumbers = useCallback(() => {
    const pages: number[] = []

    if (totalPages <= 7) {
      // If total pages is 7 or less, show all pages
      for (let i = start; i <= nbPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(start)

      if (getPage() - start > 3) {
        pages.push(-1) // Ellipsis
      }

      // Show pages around current page
      const pagesBefore = Math.max(getPage() - 1, start + 1)
      const pagesAfter = Math.min(getPage() + 1, nbPages - 1)

      for (let i = pagesBefore; i <= pagesAfter; i++) {
        if (i > start && i < nbPages) {
          pages.push(i)
        }
      }

      if (nbPages - getPage() > 3) {
        pages.push(-1) // Ellipsis
      }

      // Always show last page
      pages.push(nbPages)
    }

    return pages
  }, [start, itemsCount, nbPages, totalPages])

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => getPage() > start && handlePageChange(getPage() - 1)}
            className={
              getPage() <= start
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>

        {getPageNumbers().map((pageNumber, index) =>
          pageNumber === -1 ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => handlePageChange(pageNumber)}
                isActive={getPage() === pageNumber}
                className="cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              getPage() >= totalPages && handlePageChange(getPage() + 1)
            }
            className={
              getPage() >= totalPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
