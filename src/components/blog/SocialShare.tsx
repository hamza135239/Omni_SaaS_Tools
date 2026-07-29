"use client";
import { Twitter, Linkedin, Link2, Facebook } from "lucide-react";
import { useState } from "react";

interface SocialShareProps { title: string; url: string; showLabel?: boolean; }

export function SocialShare({ title, url, showLabel }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const buttons = [
    {
      label: "Twitter/X",
      icon: <Twitter className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
      color: "hover:text-sky-500",
    },
    {
      label: "Facebook",
      icon: <Facebook className="w-4 h-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      color: "hover:text-blue-600",
    },
    {
      label: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      color: "hover:text-blue-700",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {showLabel && <span className="text-sm text-gray-500 mr-1">Share:</span>}
      {buttons.map(({ label, icon, href, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className={`btn-ghost btn-icon text-gray-400 ${color} transition-colors`}
        >
          {icon}
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className={`btn-ghost btn-icon transition-colors ${copied ? "text-green-500" : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`}
        title={copied ? "Copied!" : "Copy link"}
      >
        <Link2 className="w-4 h-4" />
      </button>
    </div>
  );
}
