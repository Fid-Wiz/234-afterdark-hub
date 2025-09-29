import { useEffect, useState } from "react";
import { getApi } from "../utils/storyblok";

function Gallery() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lightbox state
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const storyblokApi = getApi();
        const { data } = await storyblokApi.get("cdn/stories", {
          version: "published",
          starts_with: "gallery/",
        });
        console.log("🔍 Gallery data:", data.stories);
        setGalleries(data.stories);
      } catch (err) {
        console.error("❌ Error fetching gallery:", err);
        setError("Failed to load gallery.");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold neon-text animate-pulse">
          Loading Gallery...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-red-400 mb-4">Oops!</h2>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  if (galleries.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold text-purple-300 mb-4">
          No Gallery Items
        </h3>
        <p className="text-gray-400">
          Add media to the `gallery` folder in Storyblok to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <h1 className="text-4xl font-bold neon-text mb-8 text-center">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleries.map((gallery) => {
          const content = gallery.content;

          if (!content.media || content.media.length === 0) return null;

          return content.media.map((item, idx) => (
            <div
              key={`${gallery.uuid}-${idx}`}
              className="relative group overflow-hidden rounded-lg border border-purple-500/30 hover:border-purple-500 transition cursor-pointer"
              onClick={() => setLightbox(item)}
            >
              {item.filename.match(/\.(mp4|mov|webm)$/i) ? (
                <video
                  src={item.filename}
                  className="w-full h-48 object-cover"
                  muted
                />
              ) : (
                <img
                  src={item.filename}
                  alt={item.alt || "Gallery media"}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-sm text-purple-300 transition">
                {content.event_ref ? `Event: ${content.event_ref}` : "View"}
              </div>
            </div>
          ));
        })}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-5xl max-h-[90vh]">
            {lightbox.filename.match(/\.(mp4|mov|webm)$/i) ? (
              <video
                src={lightbox.filename}
                controls
                autoPlay
                className="max-h-[90vh] rounded-lg"
              />
            ) : (
              <img
                src={lightbox.filename}
                alt={lightbox.alt || "Gallery media"}
                className="max-h-[90vh] rounded-lg"
              />
            )}
          </div>
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-pink-400"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default Gallery;
