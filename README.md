# OMG! Live: omglive.co.uk

Website for **OMG! Live** (Glen & Gemma): live music, karaoke and compering.

It's a plain static site with no build step. Vercel deploys every push automatically.

| File | What it is |
|---|---|
| `index.html` | All the page content: edit text here |
| `styles.css` | Colours, fonts, layout (colours are at the top) |
| `script.js` | Mobile menu, scroll effects, booking form. Enquiries go via Messenger until `BOOKING_EMAIL` at the top is set |
| `assets/` | Logo and social share image |

To preview locally: `python3 -m http.server` then open http://localhost:8000
