import { useEffect, useState } from "react";
import { getApi } from "../utils/storyblok";
import axios from "axios";

function Confessions() {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // form state
  const [newConfession, setNewConfession] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [selectedTag, setSelectedTag] = useState("random 🎲");
  const [submitting, setSubmitting] = useState(false);

  // filter + random state
  const [filterTag, setFilterTag] = useState("All");
  const [randomConfession, setRandomConfession] = useState(null);

  // Storyblok credentials
  const managementToken = import.meta.env.VITE_STORYBLOK_MANAGEMENT_TOKEN;
  const spaceId = import.meta.env.VITE_STORYBLOK_SPACE_ID;
  const folderId = 96058125703483; // 👈 replace with your Confessions folder ID

  // ✅ fetch confessions
  const fetchConfessions = async () => {
    try {
      const storyblokApi = getApi();
      const { data } = await storyblokApi.get("cdn/stories", {
        version: "published",
        starts_with: "confessions/",
      });

      console.log("📥 Confessions:", data.stories);
      setConfessions(data.stories);
    } catch (err) {
      console.error("❌ Error fetching confessions:", err);
      setError("Failed to load confessions.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ load once + poll every 10s
  useEffect(() => {
    fetchConfessions(); // initial load
    const interval = setInterval(fetchConfessions, 10000); // refresh every 10s
    return () => clearInterval(interval); // cleanup
  }, []);

  // submit confession
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newConfession.trim()) return;

    setSubmitting(true);

    try {
      await axios.post(
        `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories`,
        {
          story: {
            name: "Confession",
            slug: "confession-" + Date.now(),
            parent_id: folderId,
            content: {
              component: "confessions",
              text: newConfession,
              author: anonymous ? "Anonymous" : "User",
              tags: [selectedTag],
              hearts: 0,
              fire: 0,
              laughs: 0,
            },
          },
          publish: 1,
        },
        {
          headers: {
            Authorization: managementToken,
          },
        }
      );

      setNewConfession("");
      setSelectedTag("random 🎲");

      fetchConfessions(); // ✅ refresh instantly after submit
    } catch (err) {
      console.error("❌ Error submitting confession:", err);
      alert("Failed to submit confession. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  // random confession
  const handleRandomConfession = () => {
    if (confessions.length > 0) {
      const random =
        confessions[Math.floor(Math.random() * confessions.length)];
      setRandomConfession(random);
    }
  };

  // handle reactions
  const handleReaction = async (confession, field) => {
    try {
      const updatedValue = (confession.content[field] || 0) + 1;

      await axios.put(
        `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories/${confession.id}`,
        {
          story: {
            content: {
              ...confession.content,
              [field]: updatedValue,
            },
          },
          publish: 1,
        },
        { headers: { Authorization: managementToken } }
      );

      // update UI instantly
      setConfessions((prev) =>
        prev.map((c) =>
          c.id === confession.id
            ? { ...c, content: { ...c.content, [field]: updatedValue } }
            : c
        )
      );
    } catch (err) {
      console.error("❌ Error updating reaction:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold neon-text animate-pulse">
          Loading Confessions...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <h1 className="text-4xl font-bold neon-text mb-8 text-center">
        Confessions Box 💌
      </h1>

      {/* Stats + Random */}
      <div className="flex flex-col items-center mb-6">
        <p className="text-gray-400 mb-3">
          🔥 {confessions.length} secrets shared so far
        </p>
        <button
          onClick={handleRandomConfession}
          className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-lg text-white font-bold shadow-md"
        >
          🎲 Surprise Me
        </button>
      </div>

      {/* Show random confession */}
      {randomConfession && (
        <div className="max-w-2xl mx-auto mb-8 p-6 bg-gray-900/70 border border-purple-500/40 rounded-lg animate-pulse">
          <p className="text-lg italic text-gray-200">
            “{randomConfession.content.text}”
          </p>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-500">
              — {randomConfession.content.author || "Anonymous"}
            </span>
            {randomConfession.content.tags && (
              <span className="text-xs bg-pink-600/30 text-pink-300 px-2 py-1 rounded">
                {randomConfession.content.tags.join(", ")}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Tag filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {["All", "love 💘", "secrets 🤐", "regrets 😔", "funny 😂", "random 🎲"].map(
          (tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-4 py-2 rounded-lg ${
                filterTag === tag
                  ? "bg-pink-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tag}
            </button>
          )
        )}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto mb-12 bg-gray-900/70 p-6 rounded-lg border border-pink-500/20"
      >
        <textarea
          value={newConfession}
          onChange={(e) => setNewConfession(e.target.value)}
          placeholder="Write your confession here..."
          className="w-full p-3 rounded-lg bg-black/50 text-white border border-gray-700 focus:border-pink-500 outline-none resize-none"
          rows={4}
        />
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
              className="accent-pink-500"
            />
            Post as Anonymous
          </label>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="bg-black/50 text-white border border-gray-700 rounded-lg p-2"
          >
            <option value="love 💘">Love 💘</option>
            <option value="secrets 🤐">Secrets 🤐</option>
            <option value="regrets 😔">Regrets 😔</option>
            <option value="funny 😂">Funny 😂</option>
            <option value="random 🎲">Random 🎲</option>
          </select>
          <button
            type="submit"
            disabled={submitting}
            className="neon-button px-6 py-2"
          >
            {submitting ? "Submitting..." : "Submit Confession"}
          </button>
        </div>
      </form>

      {/* Confession list */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {confessions.length === 0 ? (
          <p className="text-center text-gray-400">No confessions yet 👀</p>
        ) : (
          confessions
            .filter((c) =>
              filterTag === "All" ? true : c.content.tags?.includes(filterTag)
            )
            .map((c) => (
              <div
                key={c.uuid}
                className="bg-gray-900/70 border border-pink-500/30 rounded-lg p-6 hover:border-pink-500 transition"
              >
                <p className="text-lg text-gray-200 italic">“{c.content.text}”</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">
                    — {c.content.author || "Anonymous"}
                  </p>
                  {c.content.tags && (
                    <span className="text-xs bg-pink-600/30 text-pink-300 px-2 py-1 rounded">
                      {c.content.tags.join(", ")}
                    </span>
                  )}
                </div>

                {/* Reactions */}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleReaction(c, "hearts")}
                    className="flex items-center gap-1 hover:text-pink-400"
                  >
                    ❤️ {c.content.hearts || 0}
                  </button>
                  <button
                    onClick={() => handleReaction(c, "fire")}
                    className="flex items-center gap-1 hover:text-orange-400"
                  >
                    🔥 {c.content.fire || 0}
                  </button>
                  <button
                    onClick={() => handleReaction(c, "laughs")}
                    className="flex items-center gap-1 hover:text-yellow-400"
                  >
                    😂 {c.content.laughs || 0}
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Confessions;
