# 234 AfterDark Hub 🌙

A sleek nightlife and events discovery platform built with React, Vite, Tailwind CSS, and Storyblok CMS.

## ✨ Features

- 🎯 **Event Discovery**: Browse upcoming nightlife events
- ⏰ **Live Countdown**: Real-time countdown to events
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Neon UI**: Dark theme with glowing neon accents
- 🔗 **Easy RSVP**: One-click event confirmation
- 🌐 **CMS Powered**: Content managed through Storyblok

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Storyblok account (free tier available)

### Installation

1. **Clone and Install Dependencies**
   ```bash
   # Install dependencies
   npm install
   ```

2. **Setup Storyblok**
   - Create a free account at [Storyblok](https://www.storyblok.com/)
   - Create a new space
   - Get your Preview Access Token from Settings > Access Tokens

3. **Environment Configuration**
   ```bash
   # Copy the example env file
   copy .env.example .env
   
   # Edit .env and add your Storyblok token
   VITE_STORYBLOK_ACCESS_TOKEN=your-preview-token-here
   ```

4. **Content Setup in Storyblok**
   - Create a new Content Type called "Event" with these fields:
     - `title` (Text)
     - `date` (DateTime) 
     - `city` (Text)
     - `ticket_link` (Link - URL)
   - Create an "events" folder in your Content section
   - Add a few sample events

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
234-afterdark-hub/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx      # Navigation component
│   │   └── Footer.jsx      # Footer component
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Events.jsx      # Events listing
│   │   └── EventDetail.jsx # Single event page
│   ├── utils/              # Utility functions
│   │   └── storyblok.js    # Storyblok API helpers
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles + Tailwind
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
└── README.md               # You are here!
```

## 🛠 Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom neon themes
- **Routing**: React Router DOM
- **CMS**: Storyblok React SDK
- **Date/Time**: Day.js for countdown timers
- **Build Tool**: Vite for fast development

## 🎨 Design System

### Color Palette
- **Primary**: Purple neon (#c084fc)
- **Background**: Black (#000000)
- **Cards**: Dark gray with transparency
- **Text**: White with gray accents

### Custom CSS Classes
- `.neon-text`: Glowing purple text effect
- `.neon-button`: Glowing button with hover effects

## 📦 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Add your environment variable: `VITE_STORYBLOK_ACCESS_TOKEN`
4. Deploy!

### Netlify
1. Run `npm run build`
2. Drag the `dist` folder to [Netlify](https://netlify.com)
3. Set environment variables in site settings

## 🔧 Configuration

### Environment Variables
- `VITE_STORYBLOK_ACCESS_TOKEN`: Your Storyblok preview token

### Storyblok Content Model

#### Event Content Type
```javascript
{
  "title": "String",           // Event name
  "date": "DateTime",          // Event date and time  
  "city": "String",           // Event location
  "ticket_link": "Link"       // URL to tickets/registration
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

**Events not loading?**
- Check your `.env` file has the correct Storyblok token
- Ensure you have created events in the "events/" folder in Storyblok
- Check browser console for API errors

**Styling not working?**
- Make sure Tailwind is properly installed: `npm install -D tailwindcss`
- Check that `index.css` imports are correct

**Build errors?**
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check that all imports use `.jsx` extensions

---

Built with ❤️ for the nightlife community. Ready to light up the night! 🌟