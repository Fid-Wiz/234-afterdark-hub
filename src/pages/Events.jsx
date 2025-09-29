import { useEffect, useState } from "react";
import { getApi } from "../utils/storyblok";
import dayjs from "dayjs";

function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const storyblokApi = getApi();
        const { data } = await storyblokApi.get("cdn/stories", {
          version: "published",
          starts_with: "events/",   // fetch all inside events folder
        });
        setEvents(data.stories);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Check Storyblok setup.");
      }
    };
    fetchEvents();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!events.length) return <p className="text-white">Loading events...</p>;

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <h1 className="text-4xl text-pink-500 mb-8 text-center">
        Upcoming Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const content = event.content;
          const eventDate = dayjs(content.date);
          const daysLeft = eventDate.diff(dayjs(), "day");

          return (
            <div
              key={event.uuid}
              className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center border border-pink-500 hover:shadow-pink-500/50 transition"
            >
              <h2 className="text-2xl font-bold text-pink-400 mb-2">
                {content.title}
              </h2>
              <p className="text-gray-300 mb-2">📍 {content.city}</p>
              <p className="text-gray-400 mb-4">
                ⏳ {daysLeft >= 0 ? `${daysLeft} days left` : "Event Passed"}
              </p>
              <a
                href={content.ticket_link}
                target="_blank"
                rel="noreferrer"
                className="mt-auto bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg text-white font-semibold"
              >
                RSVP Now
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Events;
