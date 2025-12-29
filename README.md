# 🎨 GhibliStyle Converter

Transform your photos into magical **Studio Ghibli-style** artwork using AI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

<p align="center">
  <img width="2456" height="1860" alt="CleanShot 2025-12-30 at 01 03 10@2x" src="https://github.com/user-attachments/assets/3f3e8f92-e4ab-4c93-af99-9e2a716291da" />
</p>


## ✨ Features

- 🖼️ **Drag & Drop Upload** - Easy image upload with drag and drop support
- 🎭 **AI-Powered Transformation** - Convert any photo to Ghibli anime style
- ✏️ **Custom Prompts** - Fine-tune the style with your own prompts
- 💾 **One-Click Download** - Download your generated artwork instantly
- 📱 **Responsive Design** - Works beautifully on desktop and mobile
- ⚡ **Fast Processing** - Results in seconds
- 🛡️ **Rate Limiting** - Built-in protection with Upstash Redis

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

| Technology                                    | Version | Purpose         |
| --------------------------------------------- | ------- | --------------- |
| [Next.js](https://nextjs.org/)                | 16      | React framework |
| [React](https://react.dev/)                   | 19      | UI library      |
| [TypeScript](https://www.typescriptlang.org/) | 5.9     | Type safety     |
| [Tailwind CSS](https://tailwindcss.com/)      | 4       | Styling         |
| [Upstash](https://upstash.com/)               | -       | Rate limiting   |
| [Lucide React](https://lucide.dev/)           | -       | Icons           |

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

## 💡 Usage Tips

- **Landscapes** and scenic shots work exceptionally well
- **Portraits** will be stylized significantly
- Try adding **weather conditions** to the prompt (e.g., "sunset", "rainy day")
- Experiment with **different art styles** in your prompt

## 🔒 Rate Limiting

The API includes built-in rate limiting:

- **5 requests per minute** per user
- Uses Upstash Redis in production
- Falls back to in-memory limiting for development

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the beautiful art style of [Studio Ghibli](https://www.ghibli.jp/)

---

<p align="center">
  Made with ❤️ and a sprinkle of Totoro magic
</p>
