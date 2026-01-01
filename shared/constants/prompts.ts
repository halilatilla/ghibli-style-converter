export const DEFAULT_PHOTO_PROMPT =
  "Transform this person into a Studio Ghibli anime character in Miyazaki's signature art style. Expressive anime eyes, soft facial features, hand-drawn aesthetic, vibrant colors, whimsical and magical atmosphere. Keep the person's essence but reimagine them as a Ghibli character.";

export const DEFAULT_VIDEO_PROMPT =
  "Transform this person into a Studio Ghibli character. The character is alive and breathing, with subtle natural movements, wind gently blowing through hair, and a soft cinematic lighting. Magical atmosphere with a hand-drawn animation style.";

export interface StylePreset {
  name: string;
  emoji: string;
  prompt: string;
  videoPrompt: string;
}

export const STYLE_PRESETS: readonly StylePreset[] = [
  {
    name: "Spirited Away",
    emoji: "🌸",
    prompt:
      "Transform this person into a Studio Ghibli character in the style of Spirited Away. Hand-drawn anime character with expressive eyes, soft features, Miyazaki's signature art style, vibrant colors, whimsical and magical atmosphere.",
    videoPrompt:
      "Transform this person into a Spirited Away character gently turning and smiling in a mystical bathhouse setting with floating spirits and magical sparkles",
  },
  {
    name: "Totoro Adventure",
    emoji: "🌳",
    prompt:
      "Transform this person into a Studio Ghibli character like Satsuki or Mei from My Neighbor Totoro. Innocent and cheerful expression, simple countryside clothing, hand-drawn anime style with warm earthy tones.",
    videoPrompt:
      "Transform this person into a Totoro character standing in a sunlit forest with leaves gently falling around them and a cheerful innocent expression",
  },
  {
    name: "Howl's Moving Castle",
    emoji: "✨",
    prompt:
      "Transform this person into an elegant Studio Ghibli character from Howl's Moving Castle. Detailed Victorian-style clothing, flowing hair, expressive features, magical and romantic atmosphere, Miyazaki's beautiful watercolor-like style.",
    videoPrompt:
      "Transform this person into a Howl's Moving Castle character in elegant Victorian clothing with magical sparkles and flowing movement in a romantic setting",
  },
  {
    name: "Princess Mononoke",
    emoji: "🐺",
    prompt:
      "Transform this person into a fierce Studio Ghibli character like Princess Mononoke. Strong and determined expression, tribal/warrior attire, bold colors, connection with nature, epic and adventurous atmosphere.",
    videoPrompt:
      "Transform this person into a Princess Mononoke warrior character with determined expression and natural forest backdrop with mystical spirits",
  },
  {
    name: "Kiki's Delivery",
    emoji: "🧹",
    prompt:
      "Transform this person into a charming Studio Ghibli character like Kiki. Youthful and optimistic expression, simple clothing style, bright and cheerful colors, coming-of-age story aesthetic.",
    videoPrompt:
      "Transform this person into a Kiki character with cheerful expression and gentle breeze moving their hair in a bright optimistic setting",
  },
] as const;
