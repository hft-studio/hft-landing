# HFT Landing Page - Agent Instructions

## UI Component Library

This project uses **shadcn/ui** with the **Aceternity UI** registry for building modern, animated UI components.

### Installing Components

Use the following command pattern to install components:

```bash
npx shadcn@latest add @aceternity/<component-name>
```

### Recommended Components for Landing Pages

When building landing page sections, prefer these Aceternity components:

**Hero Sections:**
- `hero-highlight` - Highlighted hero text effects
- `hero-parallax` - Parallax scrolling hero
- `spotlight` / `spotlight-new` - Spotlight effects
- `lamp` - Lamp lighting effect
- `aurora-background` - Aurora gradient backgrounds
- `background-beams` - Animated beam backgrounds
- `wavy-background` - Wavy animated backgrounds

**Text Effects:**
- `text-generate-effect` - Text generation animation
- `typewriter-effect` - Typewriter animation
- `flip-words` - Flipping word animation
- `colourful-text` - Colorful text effects
- `cover` - Text cover reveal effect

**Cards & Content:**
- `bento-grid` - Bento box grid layout
- `3d-card` - 3D hover card effects
- `card-hover-effect` - Hover effect cards
- `wobble-card` - Wobble animation cards
- `focus-cards` - Focus effect cards
- `glare-card` - Glare effect cards

**Navigation:**
- `floating-navbar` - Floating navigation bar
- `navbar-menu` - Dropdown navigation menu
- `resizable-navbar` - Responsive navbar
- `floating-dock` - macOS-style dock

**Scroll Effects:**
- `sticky-scroll-reveal` - Sticky scroll content reveal
- `parallax-scroll` - Parallax scrolling sections
- `tracing-beam` - Scroll tracing beam
- `container-scroll-animation` - Container scroll animations

**Backgrounds:**
- `background-gradient-animation` - Animated gradients
- `stars-background` - Starry night background
- `shooting-stars` - Shooting star effects
- `meteors` - Meteor shower effect
- `sparkles` - Sparkle effects
- `grid` - Grid background pattern

**Testimonials & Social Proof:**
- `animated-testimonials` - Animated testimonials
- `infinite-moving-cards` - Infinite scrolling cards
- `card-stack` - Stacked cards

**Interactive Elements:**
- `moving-border` - Animated border buttons
- `hover-border-gradient` - Gradient border on hover
- `animated-tooltip` - Animated tooltips
- `compare` - Before/after comparison slider

**Data Visualization:**
- `world-map` - Interactive world map
- `globe` - 3D globe visualization
- `timeline` - Vertical timeline

### Component Installation Example

```bash
# Install hero components
npx shadcn@latest add @aceternity/hero-highlight
npx shadcn@latest add @aceternity/lamp

# Install navigation
npx shadcn@latest add @aceternity/floating-navbar

# Install card components
npx shadcn@latest add @aceternity/bento-grid
npx shadcn@latest add @aceternity/3d-card
```

### List All Available Components

```bash
npx shadcn@latest list @aceternity
```

### Notes

- Components are installed to `src/components/ui/`
- Always check the Aceternity UI documentation for component props and usage
- Components use Framer Motion for animations (already included as `motion` dependency)
- Tailwind CSS is required and configured in this project
