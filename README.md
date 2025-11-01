# Nunta Faină – Romanian Wedding Website

A minimal, elegant static wedding website built with vanilla HTML/CSS/JS, designed for Netlify hosting with native Netlify Forms integration.

## 🚀 Quick Start

### Local Development

1. Clone or download this repository
2. Open `index.html` in a browser or use a local server:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server -p 8000
   ```
3. Visit `http://localhost:8000`

**Note:** The RSVP form won't submit locally (Netlify Forms require Netlify hosting), but you can test the form structure and styling.

## 📋 Prerequisites

- A Netlify account (free tier works)
- A domain name (optional - Netlify provides free subdomains)
- Basic knowledge of HTML/CSS for customization

## 🎨 Customization Guide

### Edit Date & Location

1. **Hero Section (index.html, line ~18):**
   ```html
   <p class="hero-subtitle">[Data] • [Ora] • [Oraș/Locație]</p>
   ```
   Replace with: `15 August 2024 • 18:00 • București`

2. **Countdown Timer (assets/script.js, line ~4):**
   ```javascript
   const weddingDate = new Date('2024-08-15T18:00:00').getTime();
   ```
   Update the date/time to your wedding date.

### Update Google Maps Embed

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your venue and click "Share" → "Embed a map"
3. Copy the iframe `src` URL
4. Replace the iframe `src` in `index.html` (line ~42)

### Edit Program & Info

Update the info cards in `index.html` (lines ~58-75):
- Ceremonie (Ceremony)
- Recepție (Reception)
- Dress Code
- Parcare (Parking)

### Customize FAQ

Edit the FAQ section in `index.html` (lines ~150-183). Each `faq-item` contains:
- `faq-question`: The question
- `faq-answer`: Your answer

### Change Colors

Edit CSS variables in `assets/styles.css` (lines ~2-16):

```css
:root {
    --color-accent: #8e6f64;        /* Main accent color */
    --color-bg: #faf8f6;            /* Background */
    --color-text: #222222;           /* Text color */
    /* ... */
}
```

### Change Fonts

The site uses Google Fonts:
- **Headings:** Playfair Display
- **Body:** Inter

To change fonts, update the font imports in `index.html` (line ~24) and CSS variables in `styles.css`.

### Update OG Image

Replace `/assets/og-image.svg` with your own 1200x630px image (or update the SVG). This appears when sharing the site on social media.

## 📦 Deploy to Netlify

### Method 1: Deploy via Git (Recommended)

1. **Push to GitHub/GitLab/Bitbucket:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider and select the repository
   - Netlify will auto-detect settings:
     - **Build command:** Leave empty (static site)
     - **Publish directory:** `.` (root)
   - Click "Deploy site"

### Method 2: Deploy via Drag & Drop

1. Zip the entire project folder (excluding `node_modules` if any)
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the zip file
4. Your site will be live instantly!

## 🔧 Configure Netlify Forms

After deploying, Netlify Forms will automatically detect your form. Here's how to manage submissions:

### View Submissions

1. Go to your Netlify dashboard
2. Navigate to **Forms** → **rsvp** (or your form name)
3. View all submissions in real-time

### Enable Email Notifications

1. Go to **Forms** → **rsvp** → **Settings**
2. Under **Email notifications**, click "Add notification"
3. Enter the email address where you want to receive submissions
4. Save

### Export Submissions

1. Go to **Forms** → **rsvp**
2. Click **Export CSV** to download all submissions

### Form Settings

- **Submission limit:** Set in Form settings if needed
- **Spam filtering:** Enabled by default (honeypot field included)
- **Form name:** `rsvp` (as specified in the hidden input)

## 🌐 Set Up Custom Domain

### Option 1: Use Netlify DNS (Easiest)

1. In Netlify dashboard, go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter `nuntafaina.ro` (and optionally `www.nuntafaina.ro`)
4. Choose **Add domain and configure DNS**
5. Follow Netlify's DNS setup instructions
6. Update nameservers at your domain registrar

### Option 2: Use External DNS

If your domain is managed elsewhere:

1. In Netlify, add the domain in **Domain management**
2. Get the Netlify DNS target (e.g., `nuntafaina-ro.netlify.app`)
3. At your DNS provider, create:
   - **CNAME record:** `www` → `nuntafaina-ro.netlify.app`
   - **A record** (for apex): Use Netlify's provided IP addresses
   - **ALIAS/ANAME record** (if supported): `nuntafaina.ro` → `nuntafaina-ro.netlify.app`

### Enable HTTPS

HTTPS is automatically enabled by Netlify with Let's Encrypt certificates. No action needed!

## 📱 Testing

### Test the Form

1. Deploy to Netlify (forms don't work locally)
2. Fill out and submit the form
3. Check **Forms** → **rsvp** in Netlify dashboard
4. Verify redirect to `/multumim.html` works

### Test Responsiveness

- **Mobile:** 375px, 414px widths
- **Tablet:** 768px width
- **Desktop:** 1200px+ width

Use browser DevTools or [Responsive Design Mode](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode)

### Lighthouse Audit

Run Lighthouse in Chrome DevTools:
- Target: 90+ Performance, 90+ Accessibility, 90+ SEO, 90+ Best Practices

## 📁 Project Structure

```
nuntafaina/
├── index.html          # Main page (home + RSVP form)
├── multumim.html       # Thank you page
├── assets/
│   ├── styles.css      # All styles
│   ├── script.js       # Countdown & smooth scroll
│   └── og-image.svg    # Social media preview image
├── favicon.svg         # Site favicon
├── CNAME               # Custom domain config
├── robots.txt          # SEO crawler rules
├── netlify.toml        # Netlify configuration
└── README.md           # This file
```

## 🔒 Security & Privacy

- **Security headers:** Configured in `netlify.toml`
- **GDPR compliance:** GDPR note included in form
- **Spam protection:** Honeypot field (`bot-field`) included
- **HTTPS:** Automatic via Netlify

## 🐛 Troubleshooting

### Form not submitting

- Ensure you're on the live Netlify site (forms don't work locally)
- Check form name matches: `name="rsvp"` and hidden input `value="rsvp"`
- Verify `data-netlify="true"` is present on the form
- Check browser console for errors

### Redirect not working

- Verify form `action="/multumim.html"` is correct
- Check `netlify.toml` redirect rules
- Ensure `multumim.html` exists in root directory

### Countdown not showing

- Check browser console for JavaScript errors
- Verify date in `script.js` is valid (future date)
- Ensure elements with IDs `days`, `hours`, `minutes`, `seconds` exist

### Styles not loading

- Verify `/assets/styles.css` path is correct
- Check file permissions
- Clear browser cache

## 📝 License

This project is provided as-is for personal use. Feel free to customize for your own wedding!

## 🙏 Credits

- **Fonts:** [Google Fonts](https://fonts.google.com) (Playfair Display, Inter)
- **Hosting:** [Netlify](https://netlify.com)
- **Forms:** [Netlify Forms](https://docs.netlify.com/forms/setup/)

---

**Questions?** Check the [Netlify Documentation](https://docs.netlify.com) or [Netlify Community](https://answers.netlify.com).

Made with ❤️ for special celebrations.

