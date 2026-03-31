# Property Maintenance Tracker

A beautiful, production-grade property maintenance tracking application built with React 18, Tailwind CSS, Framer Motion, and MUI Base UI.

## Features

- **Modern Light Theme** with white background and deep blue accents
- **MUI Base UI Integration** for accessible, unstyled components
- **Glass Morphism Design** with frosted glass effects and subtle shadows
- **Responsive Layout** works perfectly on desktop, tablet, and mobile
- **Smooth Animations** powered by Framer Motion
- **LocalStorage Persistence** - your data is saved automatically
- **Form Validation** with inline error messages
- **Status Management** with dropdown controls
- **Filter & Search** by property, urgency, and status

## Color Scheme

**Deep Blue Theme:**
- Primary: #1E40AF (Blue-800) - Deep professional blue
- Secondary: #2563EB (Blue-600) - Medium blue for accents
- Light: #3B82F6 (Blue-500) - Bright blue for highlights
- Background: #F8F9FA - Clean white/light gray
- Text: #1A1A24 - Dark gray for excellent readability

## Tech Stack

- **React 18** - Modern functional components with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **MUI Base UI** - Accessible headless components
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful icon system
- **date-fns** - Modern JavaScript date utility

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── GlassIcons.jsx       # Custom SVG icons with glass effects
│   ├── UrgencyPill.jsx      # Urgency badges and selector
│   ├── StatusDropdown.jsx   # Custom status dropdown
│   ├── SubmitForm.jsx       # Issue submission form
│   ├── TicketRow.jsx        # Table rows and mobile cards
│   ├── Dashboard.jsx        # Main dashboard view
│   ├── MuiButton.jsx        # MUI Base Button wrapper
│   └── MuiSelect.jsx        # MUI Base Select wrapper
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css                # Global styles

## Features Breakdown

### Submit Issue View
- Property dropdown with 5 pre-populated properties
- Category selection with custom glass icons
- 3-level urgency selector (Low, Medium, High)
- Rich text description with character counter
- Photo upload with preview
- Full form validation
- Success modal with animated checkmark

### Dashboard View
- 4 metric cards (Total, Open, In Progress, Resolved)
- Multi-filter system (Property, Urgency, Status)
- Responsive table/card layout
- Inline status editing
- Empty state with call-to-action
- Smooth animations and transitions

### Design System
- **Glass Cards**: Semi-transparent with blur and subtle shadows
- **Deep Blue Buttons**: Solid deep blue (#1E40AF) with hover effects
- **Urgency Pills**: Color-coded with glow effects
- **Status Badges**: Interactive dropdowns with smooth animations
- **Custom Icons**: Hand-crafted SVG icons for each category

## Key Components

### MUI Base UI Integration

The app uses MUI Base UI for accessible, unstyled components:

- **Button** - Fully accessible button with keyboard navigation
- **Select** - Custom dropdown with ARIA support

### Accessibility

- Proper ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators on all focusable elements
- Color is not the only signal (text labels included)
- Screen reader friendly

### Performance

- Code splitting with dynamic imports
- Optimized bundle size
- Lazy loading for images
- Smooth 60fps animations
- LocalStorage caching

## Data Model

Each maintenance ticket includes:
- Unique ticket ID (MNT-0001, MNT-0002, etc.)
- Property name
- Issue category
- Urgency level
- Description
- Optional photo
- Submission date
- Current status

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## License

MIT

## Credits

Built with React + Tailwind CSS + MUI Base UI
