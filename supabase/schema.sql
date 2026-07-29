-- ============================================================
-- TOOLBOX SAAS PLATFORM — SUPABASE DATABASE SCHEMA
-- Copy and run this entire file in your Supabase SQL Editor
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE post_status AS ENUM ('draft', 'published', 'scheduled', 'archived');
CREATE TYPE user_role AS ENUM ('admin', 'author', 'editor');
CREATE TYPE comment_status AS ENUM ('pending', 'approved', 'spam', 'deleted');

-- ============================================================
-- AUTHORS / PROFILES
-- ============================================================
CREATE TABLE public.profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username     TEXT UNIQUE NOT NULL,
  full_name    TEXT NOT NULL,
  bio          TEXT,
  avatar_url   TEXT,
  website      TEXT,
  twitter      TEXT,
  linkedin     TEXT,
  role         user_role NOT NULL DEFAULT 'author',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE public.categories (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT NOT NULL UNIQUE,
  slug         TEXT NOT NULL UNIQUE,
  description  TEXT,
  color        TEXT DEFAULT '#2563eb',
  icon         TEXT,
  post_count   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TAGS
-- ============================================================
CREATE TABLE public.tags (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT NOT NULL UNIQUE,
  slug         TEXT NOT NULL UNIQUE,
  post_count   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- POSTS
-- ============================================================
CREATE TABLE public.posts (
  id                BIGSERIAL PRIMARY KEY,
  title             TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  excerpt           TEXT,
  content           TEXT NOT NULL DEFAULT '',
  content_html      TEXT,
  featured_image    TEXT,
  featured_image_alt TEXT,
  status            post_status NOT NULL DEFAULT 'draft',
  author_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category_id       BIGINT REFERENCES public.categories(id) ON DELETE SET NULL,
  reading_time      INTEGER DEFAULT 5, -- minutes
  view_count        BIGINT DEFAULT 0,
  like_count        BIGINT DEFAULT 0,
  comment_count     BIGINT DEFAULT 0,
  is_featured       BOOLEAN DEFAULT FALSE,
  is_trending       BOOLEAN DEFAULT FALSE,
  -- SEO Fields
  seo_title         TEXT,
  seo_description   TEXT,
  canonical_url     TEXT,
  og_image          TEXT,
  noindex           BOOLEAN DEFAULT FALSE,
  -- Scheduling
  published_at      TIMESTAMPTZ,
  scheduled_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Full-text search index on posts
CREATE INDEX posts_search_idx ON public.posts USING gin(
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, ''))
);
CREATE INDEX posts_status_idx ON public.posts(status, published_at DESC);
CREATE INDEX posts_category_idx ON public.posts(category_id);
CREATE INDEX posts_author_idx ON public.posts(author_id);
CREATE INDEX posts_slug_idx ON public.posts(slug);

-- ============================================================
-- POST TAGS (Junction Table)
-- ============================================================
CREATE TABLE public.post_tags (
  post_id  BIGINT NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id   BIGINT NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- ============================================================
-- MEDIA LIBRARY
-- ============================================================
CREATE TABLE public.media (
  id           BIGSERIAL PRIMARY KEY,
  filename     TEXT NOT NULL,
  url          TEXT NOT NULL,
  alt_text     TEXT,
  caption      TEXT,
  size         BIGINT, -- bytes
  mime_type    TEXT,
  width        INTEGER,
  height       INTEGER,
  uploaded_by  UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- COMMENTS
-- ============================================================
CREATE TABLE public.comments (
  id           BIGSERIAL PRIMARY KEY,
  post_id      BIGINT NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  parent_id    BIGINT REFERENCES public.comments(id) ON DELETE CASCADE,
  author_name  TEXT NOT NULL,
  author_email TEXT NOT NULL,
  author_url   TEXT,
  content      TEXT NOT NULL,
  status       comment_status NOT NULL DEFAULT 'pending',
  ip_address   INET,
  user_agent   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX comments_post_idx ON public.comments(post_id, status);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================================
CREATE TABLE public.newsletter_subscribers (
  id           BIGSERIAL PRIMARY KEY,
  email        TEXT NOT NULL UNIQUE,
  name         TEXT,
  status       TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  confirmed    BOOLEAN DEFAULT FALSE,
  token        TEXT UNIQUE DEFAULT gen_random_uuid()::TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- ============================================================
-- CONTACT FORM SUBMISSIONS
-- ============================================================
CREATE TABLE public.contact_submissions (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  subject      TEXT,
  message      TEXT NOT NULL,
  status       TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'spam')),
  ip_address   INET,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SITE SETTINGS
-- ============================================================
CREATE TABLE public.site_settings (
  key          TEXT PRIMARY KEY,
  value        TEXT,
  description  TEXT,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Default settings
INSERT INTO public.site_settings (key, value, description) VALUES
  ('site_name', 'ToolboxSaaS', 'Site name'),
  ('site_tagline', 'Free Online PDF Utilities, AI Resume Builder & Image Tools', 'Site tagline'),
  ('site_url', 'https://toolboxsaas.com', 'Production URL'),
  ('logo_url', '', 'Logo image URL'),
  ('favicon_url', '', 'Favicon URL'),
  ('ga4_id', '', 'Google Analytics 4 Measurement ID'),
  ('adsense_id', '', 'Google AdSense Publisher ID'),
  ('posts_per_page', '10', 'Number of posts per page'),
  ('allow_comments', 'true', 'Enable comments globally'),
  ('comment_moderation', 'true', 'Require comment approval'),
  ('footer_text', '© 2026 ToolboxSaaS. All rights reserved.', 'Footer copyright text');

-- ============================================================
-- PAGE VIEWS (for analytics)
-- ============================================================
CREATE TABLE public.page_views (
  id           BIGSERIAL PRIMARY KEY,
  post_id      BIGINT REFERENCES public.posts(id) ON DELETE CASCADE,
  path         TEXT NOT NULL,
  referrer     TEXT,
  user_agent   TEXT,
  country      TEXT,
  viewed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX page_views_post_idx ON public.page_views(post_id, viewed_at DESC);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-calculate reading time on post save
CREATE OR REPLACE FUNCTION calculate_reading_time()
RETURNS TRIGGER AS $$
DECLARE
  word_count INTEGER;
BEGIN
  word_count := array_length(regexp_split_to_array(NEW.content, '\s+'), 1);
  NEW.reading_time := GREATEST(1, CEIL(word_count::NUMERIC / 200));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_reading_time
  BEFORE INSERT OR UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION calculate_reading_time();

-- Auto-update category post_count
CREATE OR REPLACE FUNCTION update_category_post_count()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.category_id IS NOT NULL THEN
    UPDATE public.categories SET post_count = (
      SELECT COUNT(*) FROM public.posts
      WHERE category_id = OLD.category_id AND status = 'published'
    ) WHERE id = OLD.category_id;
  END IF;
  IF NEW.category_id IS NOT NULL THEN
    UPDATE public.categories SET post_count = (
      SELECT COUNT(*) FROM public.posts
      WHERE category_id = NEW.category_id AND status = 'published'
    ) WHERE id = NEW.category_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_category_count
  AFTER INSERT OR UPDATE OR DELETE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION update_category_post_count();

-- Increment view_count function (called from API)
CREATE OR REPLACE FUNCTION increment_view_count(post_id_param BIGINT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.posts SET view_count = view_count + 1
  WHERE id = post_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Full-text search function
CREATE OR REPLACE FUNCTION search_posts(search_term TEXT)
RETURNS SETOF public.posts AS $$
BEGIN
  RETURN QUERY
    SELECT * FROM public.posts
    WHERE status = 'published'
    AND to_tsvector('english', coalesce(title,'') || ' ' || coalesce(excerpt,'') || ' ' || coalesce(content,''))
        @@ plainto_tsquery('english', search_term)
    ORDER BY
      ts_rank(
        to_tsvector('english', coalesce(title,'') || ' ' || coalesce(excerpt,'') || ' ' || coalesce(content,'')),
        plainto_tsquery('english', search_term)
      ) DESC;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, owner write, admin full access
CREATE POLICY "profiles_public_read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_owner_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Posts: public read published, authenticated write own
CREATE POLICY "posts_public_read" ON public.posts FOR SELECT USING (status = 'published');
CREATE POLICY "posts_author_read_own" ON public.posts FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "posts_author_insert" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "posts_author_update" ON public.posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "posts_admin_all" ON public.posts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','editor'))
);

-- Categories: public read, admin write
CREATE POLICY "categories_public_read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_admin_all" ON public.categories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','editor'))
);

-- Tags: public read, admin write
CREATE POLICY "tags_public_read" ON public.tags FOR SELECT USING (true);
CREATE POLICY "tags_admin_all" ON public.tags FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','editor'))
);

-- Post tags: public read
CREATE POLICY "post_tags_public_read" ON public.post_tags FOR SELECT USING (true);
CREATE POLICY "post_tags_admin_all" ON public.post_tags FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','editor'))
);

-- Comments: public read approved, anyone insert, admin full
CREATE POLICY "comments_public_read" ON public.comments FOR SELECT USING (status = 'approved');
CREATE POLICY "comments_public_insert" ON public.comments FOR INSERT WITH CHECK (true);
CREATE POLICY "comments_admin_all" ON public.comments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','editor'))
);

-- Media: authenticated read, admin all
CREATE POLICY "media_auth_read" ON public.media FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "media_admin_all" ON public.media FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','editor'))
);

-- Newsletter: admin only
CREATE POLICY "newsletter_admin_all" ON public.newsletter_subscribers FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "newsletter_public_insert" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Contact submissions: admin only
CREATE POLICY "contact_admin_all" ON public.contact_submissions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "contact_public_insert" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Site settings: public read, admin write
CREATE POLICY "settings_public_read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings_admin_all" ON public.site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Page views: admin read, anyone insert
CREATE POLICY "page_views_admin_read" ON public.page_views FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "page_views_public_insert" ON public.page_views FOR INSERT WITH CHECK (true);

-- ============================================================
-- SEED DATA — Categories
-- ============================================================
INSERT INTO public.categories (name, slug, description, color) VALUES
  ('GPS Tracking', 'gps-tracking', 'Vehicle GPS tracking systems, devices, and best practices', '#2563eb'),
  ('ELD Compliance', 'eld-compliance', 'FMCSA ELD mandate, Hours of Service rules, and compliance guides', '#dc2626'),
  ('Fleet Dashcams', 'fleet-dashcams', 'AI dashcams, driver behavior monitoring, and video telematics', '#7c3aed'),
  ('Fleet Management Software', 'fleet-management-software', 'Fleet management platforms, dashboards, and software reviews', '#059669'),
  ('Asset Tracking', 'asset-tracking', 'Trailer, equipment, and asset GPS tracking solutions', '#d97706'),
  ('Driver Safety', 'driver-safety', 'Driver behavior scoring, coaching, and safety best practices', '#db2777'),
  ('Maintenance & Diagnostics', 'maintenance-diagnostics', 'Fleet maintenance, OBD-II, J1939, and vehicle diagnostics', '#0891b2'),
  ('Reviews & Comparisons', 'reviews-comparisons', 'Honest comparisons and reviews of fleet telematics products', '#65a30d');

-- ============================================================
-- SEED DATA — Tags
-- ============================================================
INSERT INTO public.tags (name, slug) VALUES
  ('Samsara', 'samsara'),
  ('Motive', 'motive'),
  ('Geotab', 'geotab'),
  ('Verizon Connect', 'verizon-connect'),
  ('Ford Transit', 'ford-transit'),
  ('Box Trucks', 'box-trucks'),
  ('OBD-II', 'obd-ii'),
  ('J1939', 'j1939'),
  ('ELD', 'eld'),
  ('FMCSA', 'fmcsa'),
  ('Geofencing', 'geofencing'),
  ('Fuel Savings', 'fuel-savings'),
  ('GPS', 'gps'),
  ('Fleet Software', 'fleet-software'),
  ('Small Business', 'small-business'),
  ('Dashcam', 'dashcam'),
  ('Asset Tracker', 'asset-tracker'),
  ('Troubleshooting', 'troubleshooting'),
  ('Installation Guide', 'installation-guide'),
  ('Cost Savings', 'cost-savings');

-- ============================================================
-- STORAGE BUCKETS (run these in Supabase Dashboard or via API)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- ============================================================
-- Create first admin user (run AFTER creating user via Auth)
-- Replace 'YOUR_USER_UUID' with the actual UUID from auth.users
-- ============================================================
-- INSERT INTO public.profiles (id, username, full_name, role) 
-- VALUES ('YOUR_USER_UUID', 'admin', 'Site Admin', 'admin');
