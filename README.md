# Original Personal Portfolio Template

A beautifully designed, production-ready personal portfolio template featuring a unique orbital experience section, dual themes, and comprehensive accessibility features.

## ✨ Features

### Core Sections
- **Hero**: Professional introduction with circular photo mask and CTAs
- **About**: Concise bio with highlighted achievements
- **Skills Grid**: Interactive skill chips with proficiency indicators and hover notes
- **Projects Gallery**: Filterable project cards with impact metrics
- **Unique Experience**: Orbital cards interaction with cross-highlighting
- **Certifications**: Sortable certification cards
- **Contact Form**: Fully validated form with ARIA-live feedback

### Design & Accessibility
- **Dual Themes**: Light/Dark mode with system preference detection
- **Responsive Design**: Mobile-first approach (≥360px to ≥1440px)
- **WCAG 2.2 AA Compliant**: 4.5:1 contrast ratios, semantic HTML, keyboard navigation
- **Performance Optimized**: Lazy loading, CLS < 0.05, bundle ≤150KB
- **Reduced Motion Support**: Respects user motion preferences

### Technical Highlights
- **Modern Stack**: React 18, TypeScript, Tailwind CSS, Vite
- **Modular Architecture**: Clean component separation
- **Type Safety**: Full TypeScript implementation
- **CSS Variables**: Theme system with smooth transitions
- **Semantic HTML**: Proper landmarks and ARIA labels

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd portfolio-template

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

### Linting
```bash
# Run ESLint
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation with theme toggle
│   ├── Hero.tsx        # Hero section with profile
│   ├── About.tsx       # About section
│   ├── SkillsGrid.tsx  # Interactive skills grid
│   ├── ProjectsGallery.tsx # Filterable projects
│   ├── UniqueExperience.tsx # Orbital experience section
│   ├── Certifications.tsx # Sortable certifications
│   ├── ContactForm.tsx # Validated contact form
│   ├── Footer.tsx      # Site footer
│   └── ThemeProvider.tsx # Theme management
├── data/
│   └── content.json    # All content data
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles and theme variables

public/
└── images/
    └── profile.jpg     # Profile image placeholder
```

## 🎨 Customization

### Content
Edit `src/data/content.json` to customize:
- Personal information
- Skills with SVG icons
- Project details and images
- Work experience
- Certifications
- Contact information

### Theming
Modify CSS variables in `src/index.css`:
```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #14b8a6;
  --color-accent: #f97316;
  /* ... more theme variables */
}
```

### Profile Image
Replace `public/images/profile.jpg` with your professional headshot.

## 🌟 Unique Experience Section

The orbital experience section features:

### How It Works
- **Central Hub**: Displays total experience count
- **Orbital Cards**: Company cards positioned in a circle around the hub
- **Smooth Animations**: CSS transforms for orbital positioning
- **Keyboard Navigation**: Arrow keys to navigate between experiences
- **Reduced Motion**: Disables animations when `prefers-reduced-motion` is set

### Editing the Interaction
1. **Add Experience**: Add new entries to `experience` array in `content.json`
2. **Modify Layout**: Adjust `radius` and positioning in `UniqueExperience.tsx`
3. **Animation Speed**: Modify `transition-all duration-300` classes
4. **Accessibility**: Ensure all interactive elements have proper ARIA labels

### Technical Implementation
- Uses CSS `transform: rotate()` and positioning
- Calculates angles: `(index * 360) / experience.length`
- Keyboard accessible with focus management
- Respects motion preferences

## 🎯 Performance Optimizations

- **Lazy Loading**: Images load only when needed
- **Code Splitting**: Automatic with Vite
- **CSS Optimization**: Tailwind purging unused styles
- **Bundle Analysis**: Keep track of bundle size
- **Image Optimization**: Compressed images from Pexels

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: ARIA labels and live regions
- **Color Contrast**: WCAG AA compliant ratios
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user preferences

## 📱 Responsive Breakpoints

- **Mobile**: 360px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## 🛠 Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Testing
npm run test         # Run tests (if configured)
```

## 📊 Lighthouse Scores Target

- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 90+

## 🔧 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Styling**: CSS Variables, Tailwind
- **Linting**: ESLint with TypeScript support

## 📄 License

This template is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Note**: This template uses placeholder images from Pexels. Replace with your actual content and images for production use.