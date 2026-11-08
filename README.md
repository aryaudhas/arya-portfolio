# Arya Udhas — personal site

Single-page portfolio built from `Arya_Udhas_Resume_Updated.docx`. No build step, no dependencies.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All page content |
| `styles.css` | Theme, layout, doodles, responsive + print styles |
| `script.js` | Types out the name, scroll reveal, active nav link, copy-email |
| `assets/Arya_Udhas_Resume.docx` | Résumé served by the "Download résumé" button |

## Preview locally

Open `index.html` in a browser, or serve it:

```bash
python -m http.server 8000
# http://localhost:8000
```

## Editing content

Everything lives in `index.html`, in plain HTML. Sections are marked with comments
(`<!-- EXPERIENCE -->` etc.).

Palette is at the top of `styles.css`:

```css
--paper:  #f7f0e3;  /* cream background */
--ink:    #1e2a44;  /* navy text       */
--accent: #d9694f;  /* terracotta      */
--pop:    #e8d273;  /* mustard         */
```

Doodles (spider on a web, bouncing tennis ball, paper plane) are inline SVGs at the top of
`index.html`, inside `.doodle--*` wrappers. Delete a wrapper to remove one. Their motion is
disabled automatically under `prefers-reduced-motion`.

The name is typed on load by `script.js`; the full name is always present in the HTML, so it
still reads correctly with JavaScript off or for screen readers.

## Publishing

Any static host works — GitHub Pages, Netlify, Cloudflare Pages, Vercel. For GitHub Pages:
push this folder to a repo, then Settings → Pages → deploy from `main` / root.

If you swap the résumé, keep the filename or update the `href` in the hero button.
