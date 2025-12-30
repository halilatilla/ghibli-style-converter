# ✅ SEO Implementation Checklist

## 🚀 Pre-Launch (Required)

### 1. Update URLs
- [ ] Update `metadataBase` in `/app/layout.tsx` with your actual domain
- [ ] Update sitemap URLs in `/app/sitemap.ts`
- [ ] Update robots.txt URLs in `/public/robots.txt`
- [ ] Update JSON-LD URLs in `/app/jsonld.tsx`
- [ ] Update OG image URLs if using custom domain

### 2. Create Assets
- [ ] Create favicon.ico (16x16, 32x32, 48x48)
- [ ] Create icon-16x16.png
- [ ] Create icon-32x32.png
- [ ] Create icon-192x192.png (PWA)
- [ ] Create icon-512x512.png (PWA)
- [ ] Create apple-touch-icon.png (180x180)
- [ ] Create screenshot-wide.png (1280x720)
- [ ] Create screenshot-narrow.png (750x1334)

**Tip**: Use Figma, Canva, or similar tools to create these with the Ghibli theme colors.

### 3. Social Media
- [ ] Update Twitter handle in metadata (or remove if not applicable)
- [ ] Test OG image with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter Card with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Test LinkedIn preview

### 4. Analytics Setup
- [ ] Create Google Analytics 4 property
- [ ] Add GA4 tracking code to layout.tsx
- [ ] Set up conversion goals
- [ ] Create Google Search Console property
- [ ] Verify ownership in Search Console
- [ ] Submit sitemap to Search Console

## 📊 Post-Launch (Week 1)

### Search Console
- [ ] Verify site is indexed
- [ ] Check for crawl errors
- [ ] Submit sitemap manually if needed
- [ ] Request indexing for main page

### Testing
- [ ] Test all pages load correctly
- [ ] Verify structured data with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test mobile-friendliness with [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [ ] Check Core Web Vitals with [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Verify robots.txt is accessible: `yoursite.com/robots.txt`
- [ ] Verify sitemap is accessible: `yoursite.com/sitemap.xml`
- [ ] Verify manifest is accessible: `yoursite.com/manifest.json`

## 🎯 Ongoing (Monthly)

### Monitoring
- [ ] Check Search Console for errors
- [ ] Review keyword rankings
- [ ] Monitor Core Web Vitals
- [ ] Check backlink profile
- [ ] Review bounce rate and engagement
- [ ] Update content based on search trends

### Content
- [ ] Publish at least 1 blog post
- [ ] Update existing content
- [ ] Add internal links
- [ ] Respond to user feedback
- [ ] Create social media posts

## 🛠️ Tools You'll Need

### Free Tools
1. **Google Search Console** - [search.google.com/search-console](https://search.google.com/search-console)
2. **Google Analytics** - [analytics.google.com](https://analytics.google.com)
3. **Bing Webmaster Tools** - [bing.com/webmasters](https://www.bing.com/webmasters)
4. **PageSpeed Insights** - [pagespeed.web.dev](https://pagespeed.web.dev)
5. **Rich Results Test** - [search.google.com/test/rich-results](https://search.google.com/test/rich-results)

### Paid Tools (Optional)
1. **Ahrefs** - Keyword research & backlinks
2. **SEMrush** - All-in-one SEO platform
3. **Moz** - SEO analytics
4. **Screaming Frog** - Technical SEO crawler

## 📈 Expected Timeline

| Week | Milestone |
|------|-----------|
| 1 | Initial indexing, brand terms ranking |
| 2-4 | Long-tail keywords start ranking |
| 4-8 | Increase in organic traffic |
| 8-12 | Competitive keywords ranking |
| 12+ | Steady organic growth |

## 🎨 Creating Favicon & Icons

### Using Figma/Canva
1. Create 512x512px design with Ghibli theme
2. Use forest green (#5B8C5A) background
3. Add sparkle emoji (✨) or Totoro silhouette
4. Export at different sizes
5. Convert to .ico format for favicon

### Quick Online Tools
- [Favicon.io](https://favicon.io/) - Generate from text/emoji
- [RealFaviconGenerator](https://realfavicongenerator.net/) - All formats
- [Canva](https://www.canva.com/) - Design custom icons

## 🔗 Important URLs to Know

After deployment, these URLs should work:

- `https://yoursite.com/robots.txt`
- `https://yoursite.com/sitemap.xml`
- `https://yoursite.com/manifest.json`
- `https://yoursite.com/opengraph-image`
- `https://yoursite.com/favicon.ico`

## 🆘 Troubleshooting

### Site Not Indexed
1. Check robots.txt isn't blocking
2. Submit URL to Search Console
3. Build backlinks from other sites
4. Share on social media

### OG Image Not Showing
1. Clear Facebook cache in debugger
2. Check image dimensions (1200x630)
3. Verify image URL is absolute
4. Wait 24-48 hours for social media cache

### Structured Data Errors
1. Test with Rich Results Test tool
2. Check JSON-LD syntax
3. Verify all required fields
4. Update schema.org version

## 📝 Quick Commands

```bash
# Test local build
npm run build
npm start

# Deploy to Vercel
vercel --prod

# Check if sitemap works
curl https://yoursite.com/sitemap.xml

# Check if robots.txt works
curl https://yoursite.com/robots.txt
```

## ✨ Pro Tips

1. **Focus on content quality** over keyword stuffing
2. **Build backlinks** from anime/art communities
3. **Engage on social media** to drive traffic
4. **Update content regularly** for freshness signals
5. **Monitor competitors** for keyword opportunities
6. **Optimize images** for fast loading
7. **Use descriptive alt text** for all images
8. **Internal linking** helps crawlers discover pages
9. **Mobile-first** is Google's priority
10. **User experience** impacts rankings

---

**Need Help?**
- Read the full [SEO.md](./SEO.md) guide
- Check [Next.js SEO docs](https://nextjs.org/learn/seo/introduction-to-seo)
- Visit [Google Search Central](https://developers.google.com/search)

