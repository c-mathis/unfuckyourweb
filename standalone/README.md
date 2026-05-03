# Unfuckyourweb.com - Standalone Version

This is a standalone HTML/CSS/JS version that you can open directly in your browser and style easily without any build tools.

## 📁 Files

- **index.html** - Main HTML file with all content
- **styles.css** - Custom styles (edit this to change colors, fonts, spacing)
- **script.js** - All JavaScript functionality

## 🚀 Quick Start

1. **Open the website**: Just open `index.html` in your browser
2. **Edit styles**: Modify `styles.css` to change colors, fonts, etc.
3. **Edit content**: Modify `index.html` to change text, add sections, etc.
4. **Edit functionality**: Modify `script.js` to change interactions

## 🎨 Easy Styling Guide

### Change Colors

Open `styles.css` and modify the CSS variables at the top:

```css
:root {
    --color-bg: #000000;           /* Background color */
    --color-text: #ffffff;          /* Main text color */
    --color-text-muted: rgba(255, 255, 255, 0.5);  /* Subtle text */
    --color-cta-bg: #ffffff;        /* Button background */
    --color-cta-text: #000000;      /* Button text */
    --color-success: #4ade80;       /* Success messages */
    --color-error: #fbbf24;         /* Error messages */
}
```

### Change Fonts

In the HTML `<head>`, replace the Google Fonts link:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Then update the font in `styles.css` or the Tailwind config in `index.html`.

### Change Spacing

Modify these variables in `styles.css`:

```css
:root {
    --section-padding-y: 5rem;      /* Top/bottom section padding */
    --section-padding-x: 1.5rem;    /* Left/right section padding */
    --max-width: 80rem;             /* Maximum content width */
}
```

### Add/Edit Sections

All content is in `index.html`. You can:
- Add new sections between existing `<section>` tags
- Edit the 8 reasons in the Reasons Section
- Change hero text, footer text, etc.

## 📧 Contact Form Setup

The form is currently set up with a placeholder. You need to choose a form backend:

### Option 1: FormSubmit.co (Easiest - Free)

1. Open `script.js`
2. Find the `submitContactForm` function
3. Replace `YOUR_EMAIL@example.com` with your actual email:

```javascript
const formSubmitEndpoint = 'https://formsubmit.co/your@email.com';
```

That's it! Forms will be emailed to you.

### Option 2: Formspree

1. Sign up at https://formspree.io
2. Create a new form and get your endpoint
3. Update the endpoint in `script.js`

### Option 3: Custom Backend

Replace the fetch call in `submitContactForm()` with your API endpoint.

## 🛠️ How Tailwind Works Here

This version uses **Tailwind CDN** - all the utility classes (like `bg-black`, `text-white`, `px-6`) work automatically.

- **Pros**: No build process, works immediately
- **Cons**: Slightly larger file size, can't customize Tailwind config as much

If you want to remove Tailwind and use pure CSS, you'd need to convert all the utility classes to custom CSS in `styles.css`.

## 🎯 Customization Examples

### Change button style:
In `index.html`, find the button and edit the classes:
```html
<button class="bg-white text-black hover:bg-gray-200 px-8 py-4">
    Get Unfucked →
</button>
```

### Add a new reason:
Copy one of the reason divs and edit the number, title, and body text.

### Change animations:
Edit `script.js` to modify the Intersection Observer threshold or transition timing.

## 🌐 Deployment

You can deploy this to:
- **Netlify**: Drag and drop the `standalone` folder
- **Vercel**: Deploy as static site
- **GitHub Pages**: Push to a repo and enable Pages
- **Any web host**: Upload all three files to your server

## 📱 Mobile Responsive

The site is fully responsive. Test it by resizing your browser or using browser dev tools (F12 → Device Toolbar).

## ♿ Accessibility

- Focus states included for keyboard navigation
- Semantic HTML structure
- ARIA labels on form feedback
- Respects `prefers-reduced-motion` setting

## 🐛 Troubleshooting

**Styles not loading?**
- Make sure all three files are in the same folder
- Check browser console (F12) for errors

**Form not working?**
- Update the form endpoint in `script.js`
- Check browser console for network errors

**Icons not showing?**
- Make sure you have internet connection (icons load from CDN)
- Check that Phosphor Icons script is loading

## 📝 Notes

- This is a single-page site
- No server required
- No build process
- Internet required (for CDN resources: Tailwind, Fonts, Icons)

Want to make it work offline? You'll need to download and host the Tailwind CSS, Google Fonts, and Phosphor Icons locally.
