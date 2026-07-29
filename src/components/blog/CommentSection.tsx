"use client";
import { useState } from "react";
import { MessageCircle, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/seo";
import type { Comment } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

interface CommentSectionProps { postId: number; }

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .then(({ data }) => setComments(data ?? []));
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !content.trim()) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: postId, author_name: name.trim(), author_email: email.trim(), content: content.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setStatus("success");
      setName(""); setEmail(""); setContent("");
    } catch (err: any) {
      setStatus("error");
      setError(err.message ?? "Failed to submit. Please try again.");
    }
  }

  return (
    <section aria-labelledby="comments-heading">
      <h2 id="comments-heading" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-6">
        <MessageCircle className="w-5 h-5 text-blue-600" />
        Comments {comments.length > 0 && <span className="badge-gray">{comments.length}</span>}
      </h2>

      {/* Existing Comments */}
      {comments.length > 0 ? (
        <div className="space-y-4 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-sm">
                    {comment.author_name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{comment.author_name}</p>
                    <time className="text-xs text-gray-400">{formatDate(comment.created_at)}</time>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm mb-6">No comments yet. Be the first to share your thoughts!</p>
      )}

      {/* Comment Form */}
      {status === "success" ? (
        <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-green-700 dark:text-green-300">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">Thank you! Your comment is awaiting moderation and will appear shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-5 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Leave a Comment</h3>
          <p className="text-xs text-gray-400">Your email address will not be published. Comments are moderated.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="comment-name">Name *</label>
              <input id="comment-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} className="input" placeholder="Your name" />
            </div>
            <div>
              <label className="label" htmlFor="comment-email">Email *</label>
              <input id="comment-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={254} className="input" placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="comment-content">Comment *</label>
            <textarea id="comment-content" value={content} onChange={(e) => setContent(e.target.value)} required rows={4} maxLength={2000} className="input resize-none" placeholder="Share your thoughts, questions, or corrections..." />
            <p className="text-xs text-gray-400 mt-1">{content.length}/2000 characters</p>
          </div>
          {error && (
            <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{error}</p>
          )}
          <button type="submit" disabled={status === "loading"} className="btn-primary">
            {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Submit Comment
          </button>
        </form>
      )}
    </section>
  );
}
