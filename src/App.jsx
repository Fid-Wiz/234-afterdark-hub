import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Sponsors from "./pages/Sponsors";
import Gallery from "./pages/Gallery";
import Confessions from "./pages/Confessions";



function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/gallery" element={<Gallery />} />
            <Route path="/confessions" element={<Confessions />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
