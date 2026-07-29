import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowUpRight } from "lucide-react";
import { formatDate, absoluteImageUrl } from "@/lib/seo";
import type { Post } from "@/types/database";

interface PostCardProps {
  post: Post;
  variant?: "default" | "hero" | "compact" | "horizontal";
  priority?: boolean;
}

export function PostCard({ post, variant = "default", priority = false }: PostCardProps) {
  const imageUrl = absoluteImageUrl(post.featured_image);
  const date = post.published_at ?? post.created_at;

  // ── Hero Main Feature Card ────────────────────────────────
  if (variant === "hero") {
    return (
      <article className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center card-editorial p-6 sm:p-8">
        <div className="lg:col-span-7 flex flex-col order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-3">
            {post.category && (
              <span className="badge-category">{post.category.name}</span>
            )}
            <span className="text-xs text-slate-400 font-medium">Lead Investigation</span>
          </div>

          <Link href={`/blog/${post.slug}`} className="group-hover:text-blue-600 transition-colors">
            <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-3">
              {post.title}
            </h1>
          </Link>

          {post.excerpt && (
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed line-clamp-3 mb-6">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            {post.author && (
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {post.author.full_name}
              </span>
            )}
            <span>•</span>
            <time dateTime={date}>{formatDate(date)}</time>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.reading_time} min read
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-lg aspect-[16/10] relative bg-slate-100 dark:bg-slate-800">
            <Image
              src={imageUrl}
              alt={post.featured_image_alt ?? post.title}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </Link>
        </div>
      </article>
    );
  }

  // ── Compact Side List Item ────────────────────────────────
  if (variant === "compact") {
    return (
      <article className="py-3 border-b border-slate-100 dark:border-slate-800/80 last:border-0 group">
        {post.category && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            {post.category.name}
          </span>
        )}
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
          <time dateTime={date}>{formatDate(date)}</time>
          <span>•</span>
          <span>{post.reading_time} min read</span>
        </div>
      </article>
    );
  }

  // ── Default Grid Card ──────────────────────────────────────
  return (
    <article className="card-editorial-hover group flex flex-col h-full overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        <Image
          src={imageUrl}
          alt={post.featured_image_alt ?? post.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          {post.category ? (
            <span className="badge-category">{post.category.name}</span>
          ) : (
            <span className="badge-category">Guide</span>
          )}
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.reading_time} min
          </span>
        </div>

        <Link href={`/blog/${post.slug}`} className="block mt-1 flex-1">
          <h2 className="font-serif-heading text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </Link>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500">
          <time dateTime={date}>{formatDate(date)}</time>
          <Link href={`/blog/${post.slug}`} className="text-slate-900 dark:text-slate-200 font-medium inline-flex items-center gap-0.5 group-hover:text-blue-600 transition-colors">
            Read <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
