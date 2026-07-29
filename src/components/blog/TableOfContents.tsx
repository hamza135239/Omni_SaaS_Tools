"use client";
import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading { id: string; text: string; level: number; }

function extractHeadings(html: string): Heading[] {
  // Parse H2/H3 from HTML string
  const matches = [...html.matchAll(/<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[23]>/gi)];
  return matches.map((m) => ({
    level: parseInt(m[1]),
    id: m[2],
    text: m[3].replace(/<[^>]+>/g, "").trim(),
  }));
}

interface TableOfContentsProps { content: string; }

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = extractHeadings(content);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  if (!headings.length) return null;

  return (
    <nav className="card p-5 sticky top-20" aria-label="Table of contents">
      <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-900 dark:text-white">
        <List className="w-4 h-4 text-blue-600" /> Table of Contents
      </div>
      <ol className="space-y-1.5">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveId(id);
              }}
              className={`block text-sm transition-colors leading-snug py-0.5 ${
                level === 3 ? "pl-3" : ""
              } ${
                activeId === id
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
