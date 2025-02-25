import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import Header from "./components/Header";
import Shimmer from "./components/Shimmer";
import { useState } from "react";

const App = () => {
  const { data, loading, error } = useFetch(
    "https://meetup-app-two.vercel.app/events"
  );
  const [filterEvents, setFilterEvents] = useState("Both");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = data?.filter((event) => {
    const matchesType =
      filterEvents === "Both" ? true : event.type == filterEvents;

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.title.toUpperCase().includes(searchQuery.toUpperCase()) ||
      event.tags.some(
        (tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tag.toUpperCase().includes(searchQuery.toUpperCase())
      );

    return matchesSearch && matchesType;
  });
  return (
    <>
      <Header handleSearch={setSearchQuery} />
      <main
        style={{ paddingInline: "9rem", height: "105vh" }}
        className="pb-5 pt-3 bg-light pb-5"
      >
        <div className="d-flex justify-content-between">
          <h1 className="mt-2 mb-4">Meetup Events</h1>
          <select
            className="bg-white text-secondary border border-0 rounded"
            style={{
              padding: "0rem",
              height: "2rem",
              outline: "none",
              boxShadow: "none",
            }}
            onChange={(e) => setFilterEvents(e.target.value)}
          >
            <option value="Both">Select Event Type &nbsp;</option>
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
        </div>
        {loading && (
          <div>
            <Shimmer />
          </div>
        )}
        {error && <p className="text-danger">{error}</p>}
        {filteredEvents?.length > 0 ? (
          <div className="row g-5">
            {filteredEvents?.map((event) => {
              // Ensure event.date exists before formatting
              let formattedDate = "Date not available";
              if (event.date) {
                const eventDate = new Date(event.date);
                const month = eventDate.toLocaleString("en-US", {
                  month: "short",
                }); // "Aug"
                const day = eventDate.getDate(); // "20"
                const year = eventDate.getFullYear(); // "2025"
                formattedDate = ` ${month} ${day} ${year}`; // "Aug 20 2025"
              }

              return (
                <div className="col-12 col-md-6 col-lg-4" key={event._id}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/event/${event._id}`}
                  >
                    <div className="card">
                      <div className="position-relative">
                        <img
                          src={event.thumbnail}
                          className="card-img-top "
                          alt="Event Thumbnail"
                          style={{ height: "20rem" }}
                        />
                        {event.type === "Offline" ? (
                          <span
                            className="bg-white text-black rounded p-2 position-absolute top-0 start-0 m-2 badge"
                            style={{ fontSize: "1rem" }}
                          >
                            Offline
                          </span>
                        ) : (
                          <span
                            className="bg-white text-black rounded p-2 position-absolute top-0 start-0 m-2 badge"
                            style={{ fontSize: "1rem" }}
                          >
                            Online
                          </span>
                        )}
                      </div>
                      <div className="card-body">
                        <p className="text-secondary">
                          {event.day.slice(0, 3)}
                          {formattedDate} •{" "}
                          {event.sessionTimings?.[0].split(":")[0]}:
                          {event.sessionTimings?.[0].split(":")[1]}{" "}
                          {event.sessionTimings?.[0].split(" ")[1]} IST
                        </p>
                        <h5 className="card-title">{event.title}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p>No event found.</p>
          </div>
        )}
      </main>
    </>
  );
};

export default App;
