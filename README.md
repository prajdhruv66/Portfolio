# Dhruv Prajapati — Portfolio

A 3D personal portfolio website built with **Three.js**, pure HTML, CSS, and JavaScript.

---

## 📁 File Structure

```
dhruv-portfolio/
├── index.html              ← Main entry point (open this in a browser)
├── css/
│   └── style.css           ← All styles (variables, layout, animations)
├── js/
│   └── main.js             ← Three.js scene, cursor, scroll reveal
├── assets/
│   └── images/
│       └── (add screenshots here)
└── README.md               ← This file
```

---

## 🚀 How to Run Locally

1. Unzip the folder
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge)
3. No build step or server required — it just works!

> ⚠️ The site uses Google Fonts and Three.js from CDN, so you'll need an internet connection the first time.

---

## 🖼️ Adding a Project Screenshot

When you have a screenshot of the Currency Converter ready:

1. Save the image as `assets/images/currency-converter.png`
2. Open `index.html` and find the `<!-- SCREENSHOT SLOT -->` comment
3. Replace the `<div class="screenshot-placeholder">` block with:

```html
<img src="assets/images/currency-converter.png"
     alt="Currency Converter screenshot"
     style="width:100%; border-radius:4px; object-fit:cover;" />
```

---

## ✏️ Things to Customise

| What | Where | Line hint |
|------|-------|-----------|
| Your email | `index.html` | Search `prodhruvpraj999` |
| College name | `index.html` | Search `Sardar Vallabhbhai` |
| Add new projects | `index.html` | Copy a `.project-card` block |
| Change colours | `css/style.css` | Edit `:root` variables at the top |
| Add live demo links | `index.html` | Replace `#` href in project cards |

---

## 🌐 Deploying for Free

### Vercel (Recommended)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import project → Deploy
3. Your site goes live at `your-name.vercel.app`

### Netlify
1. Go to [netlify.com](https://netlify.com) → "Add new site" → "Deploy manually"
2. Drag and drop the `dhruv-portfolio` folder
3. Done!

---

## 🛠️ Built With

- [Three.js r128](https://threejs.org/) — 3D scene
- [Google Fonts](https://fonts.google.com/) — Bebas Neue, Fira Code, Syne
- Vanilla HTML / CSS / JavaScript — no frameworks, no build tools

---

© 2025 Dhruv Prajapati
