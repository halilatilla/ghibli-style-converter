export type GhibliFilm = "totoro" | "spirited" | "howl" | "mononoke" | "laputa";

export type ParticleType = "dust" | "leaves" | "spirits" | "clouds" | "crystals";

export interface GhibliColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundDark: string;
  card: string;
  cardDark: string;
  text: string;
  textMuted: string;
}

export interface GhibliThemeConfig {
  id: GhibliFilm;
  name: string;
  japaneseName: string;
  description: string;
  colors: GhibliColors;
  particles: ParticleType;
  gradient: string;
  gradientDark: string;
}
