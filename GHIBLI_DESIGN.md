# 🎨 Ghibli Design System

This document outlines the authentic Studio Ghibli-inspired design system implemented throughout the GhibliStyle Converter application.

## 🎬 Film-Accurate Color Palettes

Each theme is meticulously crafted from the actual color palettes of Studio Ghibli films:

### 🌿 My Neighbor Totoro (となりのトトロ)
- **Primary**: `#5B8C5A` - Authentic forest green
- **Secondary**: `#B8D8BA` - Soft sage green
- **Accent**: `#FFD966` - Warm sunshine yellow
- **Atmosphere**: Summer countryside magic with lush greenery

### 🏮 Spirited Away (千と千尋の神隠し)
- **Primary**: `#8B6BA8` - Mystical purple from bathhouse
- **Secondary**: `#C5A8D6` - Soft lavender
- **Accent**: `#FFB84D` - Golden lantern glow
- **Atmosphere**: Mystical spirit realm with ethereal lighting

### ☁️ Howl's Moving Castle (ハウルの動く城)
- **Primary**: `#7BA5C9` - Soft sky blue
- **Secondary**: `#B8D4E6` - Gentle cloud blue
- **Accent**: `#F5C391` - Warm peach/coral
- **Atmosphere**: European romance with dreamy skies

### 🌲 Princess Mononoke (もののけ姫)
- **Primary**: `#4A7C59` - Deep forest green
- **Secondary**: `#7AA989` - Moss and lichen green
- **Accent**: `#D45D5D` - Blood red accent
- **Atmosphere**: Ancient forest spirits and primal nature

### ⚙️ Castle in the Sky (天空の城ラピュタ)
- **Primary**: `#5AA3CC` - Bright sky blue
- **Secondary**: `#91C7E6` - Cloud white-blue
- **Accent**: `#E5B676` - Ancient gold/bronze
- **Atmosphere**: Sky adventure with floating ruins

## 🖌️ Visual Design Elements

### Watercolor Effects
- **Hand-drawn textures** with fractal noise overlays
- **Soft gradients** that blend multiple colors organically
- **Dappled lighting** effects mimicking Ghibli's signature light filtering
- **Watercolor washes** using radial gradients with low opacity

### Typography
- **Display Font**: Caveat (handwritten feel)
  - Used for titles and magical elements
  - Letter spacing: 0.02em
  - Text shadow for depth
- **Body Font**: Quicksand (soft, rounded)
  - Weights: 400, 500, 600, 700
  - Smooth antialiasing

### Organic Shapes
- **Rounded corners**: 2rem (32px) for cards
- **Soft borders**: 2-3px with semi-transparent colors
- **Flowing animations**: Gentle easing with natural movement
- **Asymmetric shapes**: Avoiding perfect geometry

## ✨ Animation Philosophy

### Floating Elements
- **Dust particles**: Gentle vertical and horizontal drift
- **Spirit orbs**: Pulsing glow with scale changes
- **Leaves**: Falling with rotation and wind effects
- **Clouds**: Slow horizontal drift
- **Crystals**: Twinkling opacity changes

### Interaction Animations
- **Hover states**: 
  - Scale: 1.02-1.15
  - Translate Y: -2px to -4px
  - Duration: 300ms
- **Active states**: Scale: 0.92-0.98
- **Loading states**: Gentle rotation with pulsing
- **Success states**: Glowing effect with color cycling

### Timing Functions
- **ease-in-out**: For natural, organic movements
- **spring**: For playful, bouncy interactions
- **linear**: Only for continuous animations (shimmer, rotation)

## 🎭 Component Styling

### Cards (`.ghibli-card`)
```css
- Border radius: 2rem (32px)
- Background: rgba(15, 23, 42, 0.75) with backdrop blur
- Border: 2px solid with subtle transparency
- Shadow: Multi-layered for depth
- Watercolor edge effect with gradient border
```

### Buttons (`.ghibli-button`)
```css
- Border radius: 1.5rem (24px)
- Gradient background with theme colors
- Inset highlights for 3D effect
- Shimmer animation on hover
- Soft shadow with color tint
```

### Inputs & Textareas
```css
- Border radius: 1.5rem (24px)
- Focus: Glowing border with theme color
- Background: Semi-transparent with blur
- Shadow: Inner shadow for depth
```

### Badges
```css
- Border radius: Full (pill shape)
- Gradient background
- Hover: Lift effect with scale
- Border: 2px with theme color
```

## 🌈 Background System

### Gradient Layers
1. **Base gradient**: 4-color stops for depth
2. **Watercolor wash**: Radial gradients with theme colors
3. **Soft light accents**: Subtle highlights for dimension
4. **Noise texture**: Fractal noise for paper feel

### Particle Systems
- **Totoro**: Dust motes (40 particles)
- **Spirited Away**: Spirit orbs (20 particles)
- **Mononoke**: Falling leaves (20 particles)
- **Howl's**: Drifting clouds (8 particles)
- **Laputa**: Twinkling crystals (20 particles)

### Bottom Decorations
- **Grass**: Organic SVG path with gradient fill
- **Clouds**: Layered ellipses for depth

## 🎯 Design Principles

### 1. Authenticity
Every color, texture, and animation is inspired by actual Ghibli films. No generic anime styling.

### 2. Organic Feel
Avoid perfect geometry. Use soft curves, gentle animations, and natural timing.

### 3. Magical Details
Small touches matter: glowing effects, floating particles, subtle shimmer.

### 4. Watercolor Aesthetic
Soft edges, blended colors, hand-painted feel throughout.

### 5. Whimsical Interaction
Every interaction should feel delightful and slightly magical.

## 🛠️ Technical Implementation

### CSS Custom Properties
```css
--ghibli-primary
--ghibli-secondary
--ghibli-accent
--ghibli-background
--ghibli-background-dark
--ghibli-gradient
--ghibli-gradient-dark
```

### Framer Motion
- Used for all animations
- Spring physics for natural feel
- Staggered animations for lists
- AnimatePresence for enter/exit

### Backdrop Blur
- Applied to cards, buttons, and overlays
- Creates depth and layering
- Enhances the dreamy atmosphere

### Box Shadows
- Multi-layered for realistic depth
- Color-tinted with theme colors
- Inset shadows for 3D effects
- Glowing shadows for magical elements

## 📱 Responsive Considerations

- All animations respect `prefers-reduced-motion`
- Touch-friendly sizes (min 44x44px)
- Readable text at all sizes
- Graceful degradation on older browsers

## 🎨 Color Usage Guidelines

### Primary Color
- Main brand elements
- Card headers
- Important CTAs
- Icon backgrounds

### Secondary Color
- Gradients (paired with primary)
- Hover states
- Secondary actions
- Subtle accents

### Accent Color
- Highlights and sparkles
- Success states
- Decorative elements
- Attention-grabbing details

---

*This design system captures the essence of Studio Ghibli's visual language while maintaining modern web standards and accessibility.*

