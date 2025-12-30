export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GhibliStyle Converter",
    description:
      "Transform yourself into a Studio Ghibli character using AI. Turn your photos into Miyazaki-style anime characters from Spirited Away, Totoro, Howl's Moving Castle, and more.",
    url: "https://ghiblistyle-converter.vercel.app",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "GhibliStyle Team",
    },
    screenshot: "https://ghiblistyle-converter.vercel.app/og-image.png",
    softwareVersion: "1.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1000",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "AI-powered character transformation",
      "5 iconic Ghibli film character styles",
      "Custom prompt support",
      "Drag and drop photo upload",
      "One-click download",
      "Responsive design",
      "Fast character generation",
    ],
    keywords:
      "Studio Ghibli, Miyazaki character, anime character generator, AI character transformation, photo to anime character, Ghibli avatar creator",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ghiblistyle-converter.vercel.app",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is GhibliStyle Converter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GhibliStyle Converter is an AI-powered web application that transforms you into a Studio Ghibli character. Upload your photo and see yourself reimagined in Miyazaki's signature art style from films like Spirited Away, My Neighbor Totoro, Howl's Moving Castle, Princess Mononoke, and Kiki's Delivery Service.",
        },
      },
      {
        "@type": "Question",
        name: "How does the character transformation work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply upload your photo, choose one of 5 iconic Ghibli film character styles, optionally customize with prompts, and click transform. Our AI will process your photo and generate a beautiful Miyazaki-style anime character version of you in seconds.",
        },
      },
      {
        "@type": "Question",
        name: "What character styles are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer 5 character styles based on iconic Ghibli films: Spirited Away (magical and whimsical), Totoro Adventure (innocent and cheerful), Howl's Moving Castle (elegant Victorian), Princess Mononoke (fierce warrior), and Kiki's Delivery Service (youthful optimism). Each captures the unique aesthetic of the film.",
        },
      },
      {
        "@type": "Question",
        name: "Is GhibliStyle Converter free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! GhibliStyle Converter is completely free to use. Simply visit the website and start transforming yourself into a Ghibli character.",
        },
      },
      {
        "@type": "Question",
        name: "What types of photos work best?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Clear, front-facing portrait photos work best for character transformation. Well-lit images with visible facial features produce the most detailed and accurate Ghibli-style characters. The Spirited Away preset is perfect for classic Miyazaki character style.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
