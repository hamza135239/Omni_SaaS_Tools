import Link from "next/link";
import { AlertTriangle, Home, BookOpen, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-content py-24 text-center">
      <div className="max-w-md mx-auto card p-8">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          The guide or page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col gap-2.5">
          <Link href="/" className="btn-primary w-full">
            <Home className="w-4 h-4" /> Go to Homepage
          </Link>
          <Link href="/blog" className="btn-secondary w-full">
            <BookOpen className="w-4 h-4" /> Browse All Articles
          </Link>
          <Link href="/search" className="btn-ghost w-full text-sm">
            <Search className="w-4 h-4" /> Search Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
