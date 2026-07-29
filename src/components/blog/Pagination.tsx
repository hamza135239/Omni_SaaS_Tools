import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  function pageUrl(p: number) {
    return p === 1 ? basePath : `${basePath}?page=${p}`;
  }

  // Generate page numbers to show — always show first, last, and 2 around current
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 flex-wrap">
      {/* Prev */}
      {currentPage > 1 ? (
        <Link
          href={pageUrl(currentPage - 1)}
          className="btn-secondary btn-sm flex items-center gap-1"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Link>
      ) : (
        <span className="btn-secondary btn-sm flex items-center gap-1 opacity-40 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" /> Previous
        </span>
      )}

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400 select-none">…</span>
        ) : (
          <Link
            key={p}
            href={pageUrl(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-blue-600 text-white"
                : "btn-secondary"
            }`}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={pageUrl(currentPage + 1)}
          className="btn-secondary btn-sm flex items-center gap-1"
          aria-label="Next page"
        >
          Next <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="btn-secondary btn-sm flex items-center gap-1 opacity-40 cursor-not-allowed">
          Next <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
