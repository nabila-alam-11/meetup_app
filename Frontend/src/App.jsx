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
  const filteredEvents = data?.filter((event) =>
    filterEvents === "Both" ? data : event.type === filterEvents
  );
  return (
    <>
      <Header />
      <main style={{ paddingInline: "9rem" }} className="pb-5 pt-3 bg-light">
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
          <p>
            <Shimmer />
          </p>
        )}
        {error && <p className="text-danger">{error}</p>}
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
                        {event.sessionTimings?.[0] || "Time not available"} IST
                      </p>
                      <h5 className="card-title">{event.title}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default App;
