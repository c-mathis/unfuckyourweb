# 🚀 Unfuck Your Web - Deployment Guide

**Last Updated:** 2026-05-26

---

## ✅ What's Been Configured

### 1. Meta Pixel Tracking (ID: 1494351685495599)
- ✅ PageView event on page load
- ✅ Lead event on form submission
- ✅ Thank you page redirect for conversion tracking

### 2. Lead Capture Integration
- ✅ Form endpoint: `https://leads.unfuckyourweb.com/submit`
- ✅ Connected to centralized Unfuck Leads dashboard
- ✅ Automatic source tagging (referer = "unfuckyourweb" → source = "web")
- ✅ UTM parameter tracking
- ✅ Selected issues tracking (clickable list items)

### 3. Files Modified
- `index.html` - Added Meta Pixel base code, privacy policy link in footer
- `script.js` - Added Lead event, API integration, JSON payload
- `thank-you.html` - Created conversion landing page (NEW)
- `privacy-policy.html` - Created privacy policy page (NEW)

---

## 📤 Deploy to Production

### Option 1: Quick Deploy (Recommended)

```bash
cd /Users/beef/Repository/unfuckyourweb

# Stage changes
git add index.html script.js thank-you.html privacy-policy.html DEPLOY.md

# Commit
git commit -m "Add Meta Pixel tracking, leads integration, and privacy policy

- Install Meta Pixel (ID: 1494351685495599)
- Add Lead event on form submission
- Connect to centralized leads API
- Create thank you page for conversion tracking
- Add privacy policy page (required for Meta ads)
- Add UTM tracking and issue selection
- Ready for Meta Ads launch"

# Push to production
git push origin main
```

**Result:** Cloudflare Pages will auto-deploy in ~30 seconds.

---

### Option 2: Manual Deploy via Cloudflare Dashboard

1. Go to Cloudflare Dashboard → Pages
2. Find `unfuckyourweb` project
3. Upload files:
   - `index.html`
   - `script.js`
   - `style.css`
   - `thank-you.html`
4. Deploy

---

## 🧪 Testing After Deploy

### 1. Install Meta Pixel Helper
- Chrome extension: [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)

### 2. Test PageView Event
1. Visit https://unfuckyourweb.com
2. Check Pixel Helper icon
3. **Expected:** Shows "PageView" event firing

### 3. Test Lead Event
1. Scroll to form
2. Fill out name, email, problem description
3. (Optional) Click some list items to select issues
4. Submit form
5. **Expected:**
   - Pixel Helper shows "Lead" event
   - Success message appears
   - Redirects to `/thank-you.html` after 1.5 seconds

### 4. Verify Lead in Dashboard
1. Visit https://dashboard.unfuckyourweb.com
2. **Expected:** New lead appears with:
   - Source: "web"
   - Name, email, website, problem
   - Selected issues (if clicked)
   - UTM parameters (if in URL)

### 5. Test Meta Events Manager
1. Go to Meta Events Manager
2. Select your Pixel (1494351685495599)
3. Click "Test Events"
4. **Expected:** See PageView and Lead events in real-time

---

## 🎯 Meta Ads Setup Checklist

Once deployed and tested:

- [x] Meta Pixel installed and verified
- [x] Lead events tracking in Events Manager
- [x] Thank you page accessible
- [x] Leads appearing in dashboard
- [x] Privacy policy page at `/privacy-policy.html`
- [ ] Business verification (only if spending >$100/day)

---

## ⚠️ Optional Enhancements

### Priority 1: Privacy Policy ✅ COMPLETE
Privacy policy created at `/privacy-policy.html` with footer links on all pages.

### Priority 2: Conversion API (CAPI)
For iOS 14+ tracking, set up server-side tracking.

**Options:**
1. Meta CAPI integration in Cloudflare Worker
2. Use Meta's Conversions API Gateway
3. Third-party tool (Segment, Elevar, etc.)

Not critical for launch, but improves tracking quality.

---

## 📊 Expected Lead Data

Each lead will include:

```json
{
  "source": "web",
  "name": "John Doe",
  "email": "john@example.com",
  "website": "https://example.com",
  "problem": "Site is slow and looks outdated",
  "selected_issues": "Takes longer to load | Looks designed in 2003 | Mobile broken",
  "issues_count": 3,
  "utm_source": "facebook",
  "utm_medium": "cpc",
  "utm_campaign": "unfuck_web_cold",
  "utm_content": "ad_variant_1",
  "referrer": "https://facebook.com",
  "landing_page": "https://unfuckyourweb.com?utm_source=facebook...",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0..."
}
```

---

## 🔥 Launch Meta Ads

Once deployed:

1. **Create Campaign**
   - Objective: Leads
   - Conversion event: Lead (custom event from pixel)

2. **Set Budget**
   - Start: $20-50/day
   - Test for 7 days minimum

3. **Target Audience**
   - Business owners, marketers, agencies
   - Interests: web design, digital marketing, small business
   - Exclude: web developers, designers (they won't hire you)

4. **Ad Creative**
   - Match the provocative brand voice
   - Lead with pain: "Is your website costing you customers?"
   - Use social proof if you have it
   - CTA: "Get a Free Audit"

5. **Monitor**
   - Check dashboard daily for new leads
   - Response time: <24 hours (critical for warm leads)
   - Track Cost Per Lead (CPL) - aim for <$30

---

## 📁 Repository Structure

```
/Users/beef/Repository/unfuckyourweb/
├── index.html          # Main landing page (with Meta Pixel)
├── script.js           # Form handling + Lead event
├── style.css           # Styles
├── thank-you.html      # Conversion page (NEW)
├── privacy-policy.html # Privacy policy (NEW)
├── package.json        # Dependencies
└── DEPLOY.md           # This file
```

---

## 🆘 Troubleshooting

### "Pixel not firing"
- Clear browser cache
- Check browser console for errors
- Verify Pixel ID: `1494351685495599`

### "Lead event not tracking"
- Check Network tab for POST to `/submit`
- Verify response is 200 OK
- Check Meta Events Manager real-time events

### "Leads not in dashboard"
- Verify API endpoint: `https://leads.unfuckyourweb.com/submit`
- Check Cloudflare Worker logs
- Test API directly:
  ```bash
  curl -X POST https://leads.unfuckyourweb.com/submit \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","problem":"Test lead"}'
  ```

### "Form not submitting"
- Check browser console for CORS errors
- Verify payload format (should be JSON, not FormData)
- Check referer header (should include "unfuckyourweb")

---

## 🎯 Next Steps After Launch

1. **Monitor lead quality** - Are they real prospects?
2. **Optimize response time** - Fast response = higher close rate
3. **Test ad variations** - Creative, copy, audiences
4. **Add retargeting pixel** - Re-engage visitors who didn't convert
5. **Build email sequence** - Nurture leads who don't respond

---

**Ready to deploy?** Run the git commands above and test! 🚀
