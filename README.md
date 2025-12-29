# 🎨 GhibliStyle Converter

Transform your photos into magical **Studio Ghibli-style** artwork using AI.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

<p align="center">
  <img src="https://placehold.co/800x400/e8f5e9/2e7d32?text=GhibliStyle+Converter+Demo" alt="Demo" />
</p>

## ✨ Features

- 🖼️ **Drag & Drop Upload** - Easy image upload with drag and drop support
- 🎭 **AI-Powered Transformation** - Convert any photo to Ghibli anime style
- ✏️ **Custom Prompts** - Fine-tune the style with your own prompts
- 💾 **One-Click Download** - Download your generated artwork instantly
- 📱 **Responsive Design** - Works beautifully on desktop and mobile
- ⚡ **Fast Processing** - Results in seconds

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
   
   Create a `.env.local` file in the root directory with your API keys.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Lucide React](https://lucide.dev/) | Icons |

## 📁 Project Structure

```
ghibli-style-converter/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts      # API endpoint
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

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the beautiful art style of [Studio Ghibli](https://www.ghibli.jp/)

---

<p align="center">
  Made with ❤️ and a sprinkle of Totoro magic
</p>
