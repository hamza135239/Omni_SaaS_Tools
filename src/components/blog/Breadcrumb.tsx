import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem { label: string; href?: string; }
interface BreadcrumbProps { items: BreadcrumbItem[]; }

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        <li className="flex items-center gap-1">
          <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600 transition-colors truncate max-w-[200px]">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px]" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
