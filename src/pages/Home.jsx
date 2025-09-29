import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="text-center space-y-8">
      {/* Hero Section */}
      <div className="py-16">
        <h1 className="text-6xl font-bold neon-text mb-6">
          Welcome to the Night
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover the hottest nightlife events in your city. From underground raves to exclusive club nights, 
          we've got your after-dark adventures covered.
        </p>
        <Link to="/events" className="neon-button text-lg">
          Explore Events
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 py-16">
        <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/20">
          <h3 className="text-xl font-semibold text-purple-300 mb-4">Live Events</h3>
          <p className="text-gray-400">
            Stay updated with real-time event listings and never miss the hottest parties.
          </p>
        </div>
        <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/20">
          <h3 className="text-xl font-semibold text-purple-300 mb-4">Easy RSVP</h3>
          <p className="text-gray-400">
            Secure your spot with one-click RSVP and get instant confirmation.
          </p>
        </div>
        <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-500/20">
          <h3 className="text-xl font-semibold text-purple-300 mb-4">City Guide</h3>
          <p className="text-gray-400">
            Explore events across multiple cities and find your perfect night out.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home