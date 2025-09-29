# 234 AfterDark Hub - Copilot Instructions

This is a React + Vite nightlife events platform with the following key technologies and patterns:

## Tech Stack
- **Frontend**: React 18 (JavaScript only, no TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom neon theme
- **Routing**: React Router DOM  
- **CMS**: Storyblok React SDK
- **Date/Time**: Day.js for countdowns

## Project Structure
- `/src/components/` - Reusable UI components (Navbar, Footer)
- `/src/pages/` - Route pages (Home, Events, EventDetail)  
- `/src/utils/` - Utility functions (Storyblok helpers)
- Custom CSS classes for neon effects in `index.css`

## Design System
- Dark theme with neon purple accents (#c084fc)
- `.neon-text` and `.neon-button` classes for glowing effects
- Responsive grid layouts with Tailwind
- Nightlife/club aesthetic throughout

## Key Features
- Event listing from Storyblok CMS
- Event detail pages with live countdown timers
- RSVP functionality (demo/placeholder)
- Responsive neon-themed UI

## Development Notes
- All files use `.jsx` extension
- Environment variables prefixed with `VITE_`
- Storyblok content structure: events with title, date, city, ticket_link fields
- Error handling for missing Storyblok configuration