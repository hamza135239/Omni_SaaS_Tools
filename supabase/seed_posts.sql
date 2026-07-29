-- ============================================================
-- SEED DATA — 5 Fact-Checked Fleet Telematics Articles
-- Run this in Supabase SQL Editor AFTER schema.sql
-- ============================================================

-- 1. Create default admin profile (if not exists)
-- Replace with actual Auth User UUID if testing auth
INSERT INTO public.profiles (id, username, full_name, bio, role)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'editor', 'FleetTech Editorial Team', 'Independent telematics research & compliance experts.', 'admin')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Seed Articles
INSERT INTO public.posts 
  (title, slug, excerpt, content, content_html, status, author_id, category_id, is_featured, is_trending, published_at, seo_title, seo_description)
VALUES
(
  'Fleet Telematics for Small Businesses: A Practical, Honest Guide (2026)',
  'fleet-telematics-small-business-guide',
  'A no-fluff guide to fleet telematics for small business owners — what it is, what it actually costs, how it works, what the real fuel savings look like, and how to get started.',
  'If you run a business that depends on vehicles — a plumbing company, delivery service, landscaping crew, or mobile repair operation — fleet telematics might be the single most impactful technology investment you make in 2026...',
  '<h2 id="what-is-telematics">What Is Fleet Telematics?</h2><p>Fleet telematics is a combination of GPS (location), cellular communication, and vehicle data collection that works together to give fleet managers real-time visibility into their vehicles.</p><h2 id="real-benefits">What Telematics Actually Helps With</h2><p>Research from Verizon Connect found that fleets actively monitoring idle behavior achieved an average 15.9% reduction in idling time. A typical commercial vehicle burns approximately 0.8 gallons of fuel per hour at idle.</p>',
  'published',
  '00000000-0000-0000-0000-000000000001',
  1, -- GPS Tracking
  true,
  true,
  NOW() - INTERVAL '2 days',
  'Fleet Telematics for Small Business: A Practical, Honest Guide (2026)',
  'A no-fluff guide to fleet telematics for small business owners — costs, features, and real fuel savings.'
),
(
  'Motive ELD Keeps Disconnecting? Here''s What to Actually Do',
  'motive-eld-keeps-disconnecting-troubleshooting',
  'Step-by-step troubleshooting for Motive ELD Bluetooth disconnection errors — based on Motive''s own official support documentation, not guesswork.',
  'If your Motive ELD keeps disconnecting from the driver app, you''re dealing with one of the most commonly reported issues in Motive''s own support system...',
  '<h2 id="understand-connection">First: Understand What Connection You''re Troubleshooting</h2><p>The Motive ELD system involves two separate connections: Bluetooth between the ELD device and the phone, and Cellular between the device and Motive servers.</p><h2 id="troubleshooting-steps">Step-by-Step Fixes</h2><p>1. Use Motive''s built-in self-service troubleshooter.<br/>2. Turn OFF Power Saver Mode on the phone.<br/>3. Power cycle the Vehicle Gateway device (unplug for 5 minutes).</p>',
  'published',
  '00000000-0000-0000-0000-000000000001',
  2, -- ELD Compliance
  true,
  true,
  NOW() - INTERVAL '1 day',
  'Motive ELD Keeps Disconnecting: Official Fixes That Actually Work',
  'Troubleshooting Motive ELD Bluetooth disconnection errors based on official support documentation.'
),
(
  'How to Install a GPS Fleet Tracker in a Ford Transit: What You Need to Know',
  'how-to-install-gps-tracker-ford-transit',
  'A factual, step-by-step guide to installing an OBD-II GPS fleet tracker in a Ford Transit. Covers port location, activation, LED meanings, and troubleshooting.',
  'The Ford Transit is one of the most widely used cargo vans in the USA, and a common first vehicle for small businesses setting up GPS fleet tracking...',
  '<h2 id="port-location">Step 1: Locate the OBD-II Port</h2><p>The OBD-II port in a Ford Transit is located under the driver-side dashboard, above the brake pedal area, near the steering column.</p><h2 id="activation">Step 2: Activate Before Plugging In</h2><p>Always activate the tracker in your fleet portal before physical installation.</p>',
  'published',
  '00000000-0000-0000-0000-000000000001',
  1, -- GPS Tracking
  false,
  true,
  NOW() - INTERVAL '3 days',
  'Installing a GPS Fleet Tracker in a Ford Transit: Honest Step-by-Step Guide',
  'Step-by-step installation guide for OBD-II GPS trackers in Ford Transit cargo vans.'
),
(
  'Who Actually Needs an ELD? The Honest Answer Based on FMCSA Rules',
  'who-needs-an-eld-fmcsa-rules-explained',
  'Based directly on 49 CFR Part 395 — exactly who needs an ELD, who doesn''t, and the 4 official FMCSA exemptions that most small business owners qualify for.',
  'One of the most common — and most expensive — misunderstandings in small business fleet management is thinking you need an ELD when you don''t...',
  '<h2 id="gvwr-rule">The 10,001 lbs GVWR Rule</h2><p>Under 49 CFR 390.5, HOS regulations apply to vehicles with a GVWR of 10,001 lbs or more operating in interstate commerce.</p><h2 id="exemptions">The 4 Key Exemptions</h2><p>1. Short-haul 150 air-mile radius exemption.<br/>2. Pre-2000 engine model year exemption.<br/>3. 8-day paper log exemption per 30-day period.</p>',
  'published',
  '00000000-0000-0000-0000-000000000001',
  2, -- ELD Compliance
  false,
  false,
  NOW() - INTERVAL '4 days',
  'Who Needs an ELD? The Honest FMCSA Rules Explained for Small Business Fleets',
  'Understand FMCSA 49 CFR Part 395 ELD requirements and exemptions for small business fleets.'
),
(
  'Samsara vs Geotab vs Motive for Small Business Fleets: Honest Comparison',
  'samsara-vs-geotab-vs-motive-comparison',
  'A factual comparison of Samsara, Geotab, and Motive for small business box truck fleets — based on verified capabilities, real pricing ranges, and honest trade-offs.',
  'Three names dominate the fleet telematics market for small and mid-size businesses: Samsara, Geotab, and Motive...',
  '<h2 id="comparison">Samsara vs Geotab vs Motive</h2><p>All three support J1939 CAN-bus connectivity for heavy trucks and FMCSA-certified ELD logging. Samsara excels in UI polish and AI dashcam integration; Geotab offers deep data customization; Motive is driver-focused for trucking.</p>',
  'published',
  '00000000-0000-0000-0000-000000000001',
  8, -- Reviews & Comparisons
  true,
  true,
  NOW() - INTERVAL '5 days',
  'Samsara vs Geotab vs Motive for Box Trucks: An Honest 2026 Comparison',
  'Factual comparison of Samsara, Geotab, and Motive telematics systems for small fleets.'
)
ON CONFLICT (slug) DO NOTHING;
