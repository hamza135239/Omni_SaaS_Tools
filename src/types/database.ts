// ============================================================
// Supabase Database Types — Auto-generated from schema
// ============================================================

export type PostStatus = "draft" | "published" | "scheduled" | "archived";
export type UserRole = "admin" | "author" | "editor";
export type CommentStatus = "pending" | "approved" | "spam" | "deleted";

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  bio: string | null;
  avatar_url: string | null;
  website: string | null;
  twitter: string | null;
  linkedin: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  icon: string | null;
  post_count: number;
  created_at: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  post_count: number;
  created_at: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  content_html: string | null;
  featured_image: string | null;
  featured_image_alt: string | null;
  status: PostStatus;
  author_id: string | null;
  category_id: number | null;
  reading_time: number;
  view_count: number;
  like_count: number;
  comment_count: number;
  is_featured: boolean;
  is_trending: boolean;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_image: string | null;
  noindex: boolean;
  published_at: string | null;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  author?: Profile;
  category?: Category;
  tags?: Tag[];
}

export interface Comment {
  id: number;
  post_id: number;
  parent_id: number | null;
  author_name: string;
  author_email: string;
  author_url: string | null;
  content: string;
  status: CommentStatus;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  replies?: Comment[];
}

export interface Media {
  id: number;
  filename: string;
  url: string;
  alt_text: string | null;
  caption: string | null;
  size: number | null;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  name: string | null;
  status: "active" | "unsubscribed";
  confirmed: boolean;
  token: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: "new" | "read" | "replied" | "spam";
  ip_address: string | null;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: string | null;
  description: string | null;
  updated_at: string;
}

// Pagination helper type
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Database schema type for Supabase client
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      posts: {
        Row: Post;
        Insert: Omit<Post, "id" | "created_at" | "updated_at" | "view_count" | "like_count" | "comment_count" | "reading_time">;
        Update: Partial<Omit<Post, "id" | "created_at">>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, "id" | "created_at" | "post_count">;
        Update: Partial<Omit<Category, "id" | "created_at">>;
      };
      tags: {
        Row: Tag;
        Insert: Omit<Tag, "id" | "created_at" | "post_count">;
        Update: Partial<Omit<Tag, "id" | "created_at">>;
      };
      comments: {
        Row: Comment;
        Insert: Omit<Comment, "id" | "created_at">;
        Update: Partial<Omit<Comment, "id" | "created_at">>;
      };
      media: {
        Row: Media;
        Insert: Omit<Media, "id" | "created_at">;
        Update: Partial<Omit<Media, "id" | "created_at">>;
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriber;
        Insert: Omit<NewsletterSubscriber, "id" | "subscribed_at" | "token">;
        Update: Partial<Omit<NewsletterSubscriber, "id" | "subscribed_at">>;
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: Omit<ContactSubmission, "id" | "created_at">;
        Update: Partial<Omit<ContactSubmission, "id" | "created_at">>;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: Omit<SiteSetting, "updated_at">;
        Update: Partial<SiteSetting>;
      };
    };
    Functions: {
      increment_view_count: {
        Args: { post_id_param: number };
        Returns: void;
      };
      search_posts: {
        Args: { search_term: string };
        Returns: Post[];
      };
    };
  };
};
