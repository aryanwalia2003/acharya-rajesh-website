# Feature Roadmap & Logic

## Phase 1: MVP (Content First)
### A. The Scholar's Editor
- Rich text support for Hindi Unicode.
- Auto-save drafts to Postgres.
- Tagging system (e.g., #SaturnTransit, #Shakti).

### B. AI Astrology Suite
1. **Translator:** Converts Hindi long-form to English. Must preserve astrological terminology (e.g., keeping "Shani" or "Mahadasha" in italics).
2. **Summarizer:** Creates a 3-paragraph "Executive Summary" for the English view.
3. **Date Extractor:** Scans text for dates (e.g., "15th October 2024") and specific transits to create a "Quick Reference" table at the bottom of the blog.

## Phase 2: Conversions (Booking)
### A. The Appointment Engine
- **Calendar Logic:** Integration with a scheduling system.
- **Timezone Management:** Crucial for  astrology (IST vs. User Local Time).
- **Buffer Times:** 15-minute gaps between consultations.

### B. CTA Integration
- Sticky "Book an Appointment" button on mobile.
- Contextual CTAs: "Want to know how this transit affects *your* chart? Book a session."

## Phase 3: Scaling
- **Consultation Payments:** Integration with Stripe or Razorpay.
- **Newsletter:** Auto-emailing subscribers when a new blog is published.