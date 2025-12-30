# 🎨 GhibliStyle Converter

Transform yourself into a **Studio Ghibli character** using AI. Create stunning images or animated videos as a Miyazaki anime character from your favorite films!

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

<p align="center">
   <img width="1301" height="1327" alt="CleanShot 2025-12-30 at 18 50 34" src="https://github.com/user-attachments/assets/cb7e30e4-7311-4e85-a989-4421eb2d4f28" />
</p>

<p align="center">
   
https://github.com/user-attachments/assets/d542c691-e1ee-4bd5-abb1-df3f6e1272bc
</p>

https://github.com/user-attachments/assets/3331937f-4227-4c89-b406-12de7f56f153




## ✨ Features

### Core Features
- 🎨 **Authentic Ghibli Design** - UI inspired by Studio Ghibli's iconic visual style
- 🎭 **5 Character Styles** - Transform into characters from Spirited Away, Totoro, Howl's Moving Castle, Princess Mononoke, and Kiki's Delivery Service
- 🖼️ **Drag & Drop Upload** - Easy photo upload with drag and drop support
- 🤖 **AI-Powered Transformations** - Turn yourself into a Miyazaki anime character
- ✏️ **Custom Prompts** - Fine-tune your character style with custom prompts or use presets
- 💾 **One-Click Download** - Download your creations instantly
- 🌊 **Watercolor Effects** - Hand-drawn textures and soft gradients throughout
- ✨ **Magical Animations** - Floating particles, gentle glows, and organic movements
- 📱 **Responsive Design** - Works beautifully on desktop and mobile
- 🛡️ **Rate Limiting** - Built-in protection with Upstash Redis
- 🔍 **SEO Optimized** - Comprehensive meta tags, Open Graph, and structured data

### 🎬 NEW: Video Generation
- **Animated Ghibli Videos** - Create 8-second animated videos using Google's Veo 3.1 AI
- **Cinematic Animations** - Watch your character come to life with smooth, natural movements
- **Movie-Specific Scenes** - Each film theme has unique animation prompts and settings
- **720p HD Quality** - High-quality MP4 videos ready to share
- **Real-Time Progress** - Track video generation with live status updates
- **Fast Processing** - Videos ready in 1-3 minutes

### Two Modes Available
- 📸 **Transform Photo** - Generate stunning Ghibli-style images in 5-15 seconds
- 🎬 **Create Video** - Generate 8-second animated videos in 1-3 minutes

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
   # Required - Must have access to Gemini image generation AND Veo video models
   GEMINI_API_KEY=your_gemini_api_key

   # Optional - for production rate limiting
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   ```

   **Note:** Video generation requires access to Google's Veo 3.1 model, which may be in limited preview. Request access from Google AI Studio if needed.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧹 Code Quality

This project uses [Biome](https://biomejs.dev/) for linting and formatting. Available commands:

```bash
# Check code for issues (lint + format check)
npm run check

# Check and auto-fix issues
npm run check:fix

# Format all files
npm run format

# Lint only
npm run lint

# Lint and auto-fix
npm run lint:fix
```

### VSCode Integration

The project includes VSCode settings that enable:
- ✅ Format on save
- ✅ Auto-fix on save
- ✅ Organize imports on save

Install the [Biome VSCode extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) for the best experience.

## 🛠️ Tech Stack

| Technology                                    | Version | Purpose              |
| --------------------------------------------- | ------- | -------------------- |
| [Next.js](https://nextjs.org/)                | 16      | React framework      |
| [React](https://react.dev/)                   | 19      | UI library           |
| [TypeScript](https://www.typescriptlang.org/) | 5.9     | Type safety          |
| [Tailwind CSS](https://tailwindcss.com/)      | 4       | Styling              |
| [Biome](https://biomejs.dev/)                 | 2.3     | Linting & Formatting |
| [Framer Motion](https://www.framer.com/motion/) | -     | Animations           |
| [Google Gemini AI](https://ai.google.dev/)    | -       | Image & Video AI     |
| [Google Veo 3.1](https://deepmind.google/technologies/veo/) | -  | Video generation     |
| [Google Fonts](https://fonts.google.com/)     | -       | Quicksand & Caveat   |
| [Upstash](https://upstash.com/)               | -       | Rate limiting        |
| [Lucide React](https://lucide.dev/)           | -       | Icons                |

## 📁 Project Structure

```
ghibli-style-converter/
├── app/
│   ├── api/
│   │   ├── generate/
│   │   │   └── route.ts          # Image generation API endpoint
│   │   └── generate-video/
│   │       └── route.ts          # Video generation API endpoint (NEW)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Main app page with photo/video modes
├── components/
│   ├── ui/                       # Reusable UI components
│   ├── GhibliBackground.tsx      # Animated backgrounds
│   ├── Header.tsx
│   ├── ImageUploader.tsx         # Photo upload component
│   └── VideoUploader.tsx         # Video upload component (NEW)
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

#### Photo Mode
- **Spirited Away** 🌸 - Magical and whimsical characters with expressive features
- **Totoro Adventure** 🌳 - Innocent and cheerful countryside style
- **Howl's Moving Castle** ✨ - Elegant Victorian-era characters with flowing details
- **Princess Mononoke** 🐺 - Fierce warrior aesthetic with bold colors
- **Kiki's Delivery Service** 🧹 - Youthful and optimistic character design

#### Video Mode
- **Spirited Away** 🌸 - Character in mystical bathhouse with floating spirits
- **Totoro Adventure** 🌳 - Character in sunlit forest with falling leaves
- **Howl's Moving Castle** ✨ - Elegant character with magical sparkles and flowing movement
- **Princess Mononoke** 🐺 - Warrior in forest with mystical spirits
- **Kiki's Delivery Service** 🧹 - Cheerful character with gentle breeze animation

## 💡 Usage Tips

### For Photo Mode 📸
- **Clear, front-facing portraits** work best for character transformation
- Ensure your photo is **well-lit** with visible facial features
- Try the **"Spirited Away"** preset for classic Miyazaki character style
- **Headshots or selfies** produce the most detailed anime character results
- Experiment with different **character style prompts** for unique looks
- **Natural lighting** photos give the best hand-drawn aesthetic
- Processing time: **5-15 seconds**

### For Video Mode 🎬
- Use the same high-quality photos as photo mode for best results
- Video generation takes **1-3 minutes** - don't close the window!
- Each movie theme creates unique animated scenes
- Videos are **8 seconds long** at **720p HD quality**
- Perfect for social media sharing and profile videos
- Watch the real-time progress updates during generation

## 🔒 Rate Limiting

The API includes built-in rate limiting to manage costs:

### Photo Generation
- **5 requests per minute** per user
- **30 images per day** globally
- Uses Upstash Redis in production
- Falls back to in-memory limiting for development

### Video Generation
- **2 requests per hour** per user (more restrictive due to cost)
- **10 videos per day** globally
- 5-minute timeout protection
- Separate rate limit tracking from photos

**Note:** Video generation is significantly more expensive than image generation (~$0.20-0.50 per video vs ~$0.01 per image), hence the stricter limits.

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
