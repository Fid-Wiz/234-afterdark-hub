import { useEffect, useState } from "react";
import { getApi } from "../utils/storyblok";

function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const storyblokApi = getApi();
        const { data } = await storyblokApi.get("cdn/stories", {
          version: "published",
          starts_with: "sponsors/",
        });

        console.log("🔍 Sponsors data from Storyblok:", data.stories);
        setSponsors(data.stories);
      } catch (err) {
        console.error("❌ Error fetching sponsors:", err);
        setError("Failed to load sponsors. Please check your Storyblok setup.");
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold neon-text animate-pulse">
          Loading Sponsors...
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

  if (sponsors.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold text-purple-300 mb-4">
          No Sponsors Found
        </h3>
        <p className="text-gray-400">
          Create sponsor stories in your Storyblok space to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <h1 className="text-4xl font-bold neon-text mb-8 text-center">
        Our Sponsors
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sponsors.map((sponsor) => {
          const content = sponsor.content;

          // universal logo resolver
          let logoUrl = null;
          if (content.logo) {
            if (typeof content.logo === "string") {
              logoUrl = content.logo;
            } else if (content.logo.filename) {
              logoUrl = content.logo.filename;
            } else if (content.logo.url) {
              logoUrl = content.logo.url;
            }
          }

          // universal name resolver
          const sponsorName =
            content.name || content.title || sponsor.name || "Unnamed Sponsor";

          return (
            <a
              key={sponsor.uuid}
              href={content.link || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center bg-gray-900/50 p-4 rounded-lg border border-pink-500/20 hover:border-pink-500 transition"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={sponsorName}
                  className="h-20 object-contain mb-4"
                />
              ) : (
                <div className="h-20 w-full flex items-center justify-center text-gray-500 text-sm">
                  No Logo
                </div>
              )}
              <p className="text-lg text-gray-300">{sponsorName}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Sponsors;
