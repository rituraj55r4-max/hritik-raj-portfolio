# Hritik Raj portfolio

Buildless static site. Serve `dist/` over HTTP. Identity and hosting configuration are in `.openai/hosting.json`.

## Current functionality

- Two source-linked independent analyses and one original agency hiring proposal, maintained in `dist/cases.js`.
- Ad Doctor and break-even CPA/ROAS calculators run locally in the visitor's browser.
- One job opportunity form includes preferred interview date/time in IST. It validates future times and prepares identical messages for WhatsApp and Gmail, with an email-app fallback. Visitors must send in each app. Editing any field invalidates the prepared links. Nothing is delivered or stored by the site.
- No separate interview section or Calendar booking flow remains. Hritik confirms the proposed time in his reply.
- Scroll-linked background video and separate 30-second tutorial.
- No analytics, Meta Pixel, Meta reporting connection or calendar account access is configured. The reporting panel deliberately has no results.

## Connecting a real portfolio campaign

1. Make the approved site accessible to the intended visitors before directing paid traffic to it. The current hosted review is owner-private. Connect the custom domain separately after verifying its DNS controls.
2. Decide the business outcome: genuine hiring enquiries and accepted interviews. Outbound email, WhatsApp and Calendar clicks are intent signals, not confirmed enquiries.
3. Use campaign and creative UTMs on destination links. Add the user's actual Meta dataset/pixel only after agreeing the measurement and consent setup, then validate events. The static draft forms currently cannot confirm that a visitor sent an email or invitation.
4. Connect an authorised reporting provider or a server-side Meta Marketing API integration to the selected ad account/campaign. Keep tokens in server secrets. Never place them in `dist/`, frontend JavaScript, query strings exposed to visitors, or a public spreadsheet.
5. Fetch only the approved campaign aggregates on a schedule. Publish spend, landing-page visits and verified outcomes with date range, currency, account timezone, attribution definition and last successful refresh. Indicate stale data after a failed refresh. This is periodically refreshed reporting, not instantaneous data.
6. Reconcile hiring enquiries and accepted interviews in a private tracker. Deduplicate and publish only counts. Do not publish recruiter names, contact details or calendar contents.
7. Begin with dated manual Ads Manager exports if a reporting integration is not ready. Clearly label them snapshots. For this job-seeking campaign, cost per qualified enquiry/interview is more useful than invented ecommerce ROAS.

Meta's official Marketing API collection: https://www.postman.com/meta/facebook-marketing-api/collection/0zr4mes/facebook-marketing-api-mapi

## Sources

- Bombay Shaving Co. / Whilter.AI: https://www.whilter.ai/work/bombay-shaving-co/
- iDroid Academy / Branx: https://branx.in/portfolio/idroid-academy-meta-ads-case-study/

These are publisher-reported results, not Hritik's client work. Proposed experiments and copy are independent concepts. Keep that distinction visible when editing.
