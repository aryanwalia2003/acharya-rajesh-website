# Database Schema Design (Prisma/Postgres)

## User Model
- ID, Email, Name, Avatar.
- Role: `ADMIN` | `READER`.

## Blog Post Model
- ID, Title (Hindi), Slug.
- Content (Hindi).
- EnglishTranslation (Text).
- EnglishSummary (Text).
- Status: `DRAFT` | `PUBLISHED`.
- PublishedAt (DateTime).
- ImportantDates (JSONB): Array of objects `{ date: Date, event: String }`.

## Appointment Model
- ID, ClientID (FK), AdminID (FK).
- ScheduledTime (DateTime).
- Status: `PENDING` | `CONFIRMED` | `COMPLETED` | `CANCELLED`.
- MeetingLink (String).

## AI_Cache Model
- ID, Hash (of original text).
- ResultType: `TRANSLATION` | `SUMMARY`.
- Content (Text).