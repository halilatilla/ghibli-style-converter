# 🎨 GhibliStyle Converter

Transform yourself into a **Studio Ghibli character** using AI. Become a Miyazaki anime character from your favorite films!

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

<p align="center">
<img width="1229" height="1289" alt="CleanShot 2025-12-30 at 13 56 40" src="https://github.com/user-attachments/assets/d51e5157-e88f-4c6a-814d-7873715d1d77" />
</p>


## ✨ Features

- 🎨 **Authentic Ghibli Design** - UI inspired by Studio Ghibli's iconic visual style
- 🎭 **5 Character Styles** - Transform into characters from Spirited Away, Totoro, Howl's Moving Castle, Princess Mononoke, and Kiki's Delivery Service
- 🖼️ **Drag & Drop Upload** - Easy photo upload with drag and drop support
- 🤖 **AI-Powered Character Transformation** - Turn yourself into a Miyazaki anime character
- ✏️ **Custom Prompts** - Fine-tune your character style with custom prompts or use presets
- 💾 **One-Click Download** - Download your Ghibli character portrait instantly
- 🌊 **Watercolor Effects** - Hand-drawn textures and soft gradients throughout
- ✨ **Magical Animations** - Floating particles, gentle glows, and organic movements
- 📱 **Responsive Design** - Works beautifully on desktop and mobile
- ⚡ **Fast Processing** - Your character generated in seconds
- 🛡️ **Rate Limiting** - Built-in protection with Upstash Redis
- 🔍 **SEO Optimized** - Comprehensive meta tags, Open Graph, and structured data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ghibli-style-converter.git
   cd ghibli-style-converter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Required
   GEMINI_API_KEY=your_gemini_api_key

   # Optional - for production rate limiting
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

| Technology                                    | Version | Purpose              |
| --------------------------------------------- | ------- | -------------------- |
| [Next.js](https://nextjs.org/)                | 16      | React framework      |
| [React](https://react.dev/)                   | 19      | UI library           |
| [TypeScript](https://www.typescriptlang.org/) | 5.9     | Type safety          |
| [Tailwind CSS](https://tailwindcss.com/)      | 4       | Styling              |
| [Framer Motion](https://www.framer.com/motion/) | -     | Animations           |
| [Google Fonts](https://fonts.google.com/)     | -       | Quicksand & Caveat   |
| [Upstash](https://upstash.com/)               | -       | Rate limiting        |
| [Lucide React](https://lucide.dev/)           | -       | Icons                |

## 📁 Project Structure

```
ghibli-style-converter/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts      # API endpoint with rate limiting
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Main app page
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── Header.tsx
│   └── ImageUploader.tsx
├── lib/
│   └── utils.ts
└── ...config files
```

## 🎨 Design Philosophy

This project captures the essence of Studio Ghibli's visual language:

- **Authentic Color Palettes** - Film-accurate colors from each Ghibli movie
- **Watercolor Textures** - Soft, hand-painted feel with organic gradients
- **Dappled Lighting** - Signature Ghibli light filtering effects
- **Organic Shapes** - Rounded corners and flowing animations
- **Whimsical Details** - Floating particles, gentle glows, and magical touches
- **Hand-drawn Typography** - Caveat font for that authentic handwritten feel

### Character Style Themes

Each character style captures the essence of iconic Ghibli films:

- **Spirited Away** 🌸 - Magical and whimsical characters with expressive features
- **Totoro Adventure** 🌳 - Innocent and cheerful countryside style
- **Howl's Moving Castle** ✨ - Elegant Victorian-era characters with flowing details
- **Princess Mononoke** 🐺 - Fierce warrior aesthetic with bold colors
- **Kiki's Delivery Service** 🧹 - Youthful and optimistic character design

## 💡 Usage Tips

- **Clear, front-facing portraits** work best for character transformation
- Ensure your photo is **well-lit** with visible facial features
- Try the **"Spirited Away"** preset for classic Miyazaki character style
- **Headshots or selfies** produce the most detailed anime character results
- Experiment with different **character style prompts** for unique looks
- Each film theme captures a different **character personality**
- **Natural lighting** photos give the best hand-drawn aesthetic

## 🔒 Rate Limiting

The API includes built-in rate limiting:

- **5 requests per minute** per user
- Uses Upstash Redis in production
- Falls back to in-memory limiting for development

## 🔍 SEO Features

This project is fully optimized for search engines:

- ✅ **Comprehensive Metadata** - Title, description, keywords, and more
- ✅ **Open Graph Tags** - Rich social media previews
- ✅ **Twitter Cards** - Optimized Twitter sharing
- ✅ **JSON-LD Structured Data** - WebApplication, FAQPage, and Breadcrumbs
- ✅ **Dynamic OG Image** - Auto-generated Open Graph images
- ✅ **Sitemap** - Dynamic sitemap generation
- ✅ **Robots.txt** - Proper crawler instructions
- ✅ **PWA Manifest** - Progressive Web App support
- ✅ **Mobile-First** - Responsive and mobile-optimized

### SEO Setup

1. **Update URLs** in `/app/layout.tsx`, `/app/sitemap.ts`, and `/public/robots.txt` with your actual domain
2. **Create icons** (favicon, PWA icons) - see [SEO_CHECKLIST.md](./SEO_CHECKLIST.md)
3. **Test structured data** with [Google Rich Results Test](https://search.google.com/test/rich-results)
4. **Submit sitemap** to Google Search Console

For detailed SEO documentation, see [SEO.md](./SEO.md) and [SEO_CHECKLIST.md](./SEO_CHECKLIST.md).

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the beautiful art style of [Studio Ghibli](https://www.ghibli.jp/)

---

<p align="center">
  Made with ❤️ and a sprinkle of Totoro magic
</p>
