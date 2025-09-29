import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApi } from "../utils/storyblok";
import dayjs from "dayjs";

function EventDetail() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const storyblokApi = getApi();
        const { data } = await storyblokApi.get(`cdn/stories/events/${slug}`, {
          version: "published",
        });
        setEvent(data.story);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [slug]);

  if (loading) return <p className="text-center text-gray-400">Loading event...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!event) return <p className="text-center text-gray-400">No event found.</p>;

  const content = event.content;
  const eventDate = dayjs(content.date);
  const daysLeft = eventDate.diff(dayjs(), "day");

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <h1 className="text-4xl text-pink-500 font-bold mb-6">{content.title}</h1>
      <p className="text-gray-300 mb-2">📍 {content.city}</p>
      <p className="text-gray-400 mb-6">
        📅 {eventDate.format("dddd, MMM DD, YYYY – h:mm A")}
      </p>
      <p className="mb-6 text-lg">
        ⏳ {daysLeft >= 0 ? `${daysLeft} days left until event` : "Event has passed"}
      </p>
      {content.ticket_link && (
        <a
          href={content.ticket_link}
          target="_blank"
          rel="noreferrer"
          className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg text-white font-bold"
        >
          Get Tickets
        </a>
      )}
    </div>
  );
}

export default EventDetail;
