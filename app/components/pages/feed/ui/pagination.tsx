import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '~/components/ui/pagination'
import { Button } from '~/components/ui/button'

export default function PaginationFeed({
  page,
  setPage,
  totalPages,
}: {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
}) {
  return (
    <div className="flex justify-end items-center gap-12">
      <div className="flex items-center gap-4">
        <h2 className="whitespace-nowrap font-medium">
          Halaman {page} dari {totalPages}
        </h2>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                className="bg-white border-2 text-black max-w-8 hover:bg-gray-200"
                disabled={page === 1}
                onClick={() => setPage(1)}
              >
                <div>
                  <IconChevronsLeft size={20} />
                </div>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                className="bg-white border-2 text-black max-w-8 hover:bg-gray-200"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <div>
                  <IconChevronLeft size={20} />
                </div>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                className="bg-white border-2 text-black max-w-8 hover:bg-gray-200"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <div>
                  <IconChevronRight size={20} />
                </div>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                className="bg-white border-2 text-black max-w-8 hover:bg-gray-200"
                disabled={page === totalPages}
                onClick={() => setPage(totalPages)}
              >
                <div>
                  <IconChevronsRight size={20} />
                </div>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
