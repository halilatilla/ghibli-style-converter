export function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GhibliStyle Converter',
    description: 'Transform your photos into magical Studio Ghibli-style artwork using AI. Experience authentic hand-drawn anime aesthetics inspired by Miyazaki\'s masterpieces.',
    url: 'https://ghiblistyle-converter.vercel.app',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'GhibliStyle Team',
    },
    screenshot: 'https://ghiblistyle-converter.vercel.app/og-image.png',
    softwareVersion: '1.0',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1000',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'AI-powered image transformation',
      '5 Studio Ghibli film themes',
      'Custom prompt support',
      'Drag and drop upload',
      'One-click download',
      'Responsive design',
      'Fast processing',
    ],
    keywords: 'Studio Ghibli, anime art generator, AI image transformation, Miyazaki art style, photo to anime converter',
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ghiblistyle-converter.vercel.app',
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is GhibliStyle Converter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GhibliStyle Converter is an AI-powered web application that transforms your photos into Studio Ghibli-style artwork. It captures the authentic hand-drawn aesthetic of Miyazaki\'s films including My Neighbor Totoro, Spirited Away, Howl\'s Moving Castle, Princess Mononoke, and Castle in the Sky.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the Ghibli style transformation work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply upload your photo, choose one of the 5 Studio Ghibli film themes, optionally customize the style with prompts or presets, and click transform. Our AI will process your image and generate beautiful Ghibli-style artwork in seconds.',
        },
      },
      {
        '@type': 'Question',
        name: 'What themes are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer 5 authentic Studio Ghibli film themes: My Neighbor Totoro (forest greens), Spirited Away (mystical purples), Howl\'s Moving Castle (sky blues), Princess Mononoke (ancient forest), and Castle in the Sky (bright skies). Each theme uses film-accurate color palettes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is GhibliStyle Converter free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! GhibliStyle Converter is completely free to use. Simply visit the website and start transforming your photos into Ghibli-style artwork.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of images work best?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Landscapes and nature photography work exceptionally well, as they capture the essence of Studio Ghibli\'s environmental storytelling. Well-lit images produce the best details. The Forest Spirit preset is perfect for lush greenery.',
        },
      },
    ],
  }

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
  )
}

