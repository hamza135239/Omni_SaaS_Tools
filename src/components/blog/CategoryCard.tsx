import Link from "next/link";
import type { Category } from "@/types/database";

interface CategoryCardProps { category: Category; }

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/blog/category/${category.slug}`}
      className="card-hover group flex flex-col items-center text-center p-4 gap-2"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-sm group-hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: category.color ?? "#2563eb" }}
        aria-hidden
      >
        {category.icon ?? "📁"}
      </div>
      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
        {category.name}
      </h3>
      {category.post_count > 0 && (
        <span className="text-xs text-gray-400">{category.post_count} articles</span>
      )}
    </Link>
  );
}
