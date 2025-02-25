import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const EventDetails = () => {
  const { data, loading } = useFetch(
    "https://meetup-app-two.vercel.app/events"
  );

  const { eventId } = useParams();
  const eventDetails = data?.find((event) => event._id == eventId);

  let formattedDate = "Date not available";
  if (eventDetails?.date) {
    const eventDate = new Date(eventDetails.date);
    const month = eventDate.toLocaleString("en-US", { month: "short" });
    const day = eventDate.getDate();
    const year = eventDate.getFullYear();
    formattedDate = `${month} ${day} ${year}`;
  }

  return (
    <>
      <Header />
      <main
        className="bg-light py-4"
        style={{
          paddingInline: "9rem",
          letterSpacing: "0.89px",
        }}
      >
        {loading ? (
          <p>Loading....</p>
        ) : (
          <div className="d-flex justify-content-between">
            <div style={{ width: "50%" }}>
              <h2 className="mb-3">{eventDetails?.title}</h2>
              Hosted By:{" "}
              <p style={{ fontSize: "1.2rem", fontWeight: "390" }}>
                <strong>{eventDetails?.hostedBy}</strong>
              </p>
              <img
                src={eventDetails?.thumbnail}
                alt={eventDetails?.title}
                className="img-fluid mt-3 rounded"
                style={{ width: "40rem" }}
              />
              <h5 className="my-4" style={{ fontWeight: "bold" }}>
                Details:{" "}
              </h5>
              <p style={{ whiteSpace: "pre-wrap", width: "40rem" }}>
                {eventDetails?.description}
              </p>
              <h5 style={{ fontWeight: "bold" }}>Additional Information</h5>
              <p>
                <strong>Dress Code: </strong>
                {eventDetails?.dressCode}
              </p>
              <p>
                <strong>Age Restrictions: </strong>
                {eventDetails?.ageRestrictions}
              </p>
              <h5 style={{ fontWeight: "bold" }}>Event Tags: </h5>
              <span className="btn btn-danger">
                {eventDetails?.tags[0]}
              </span>{" "}
              &nbsp;
              <span className="btn btn-danger">
                {eventDetails?.tags[1]}
              </span>{" "}
              &nbsp;
              {eventDetails?.tags[2] && (
                <span className="btn btn-danger">{eventDetails?.tags[2]}</span>
              )}
            </div>
            <div style={{ marginLeft: "5rem", letterSpacing: "0.89px" }}>
              <div className="bg-white p-4 rounded">
                <p>
                  <FontAwesomeIcon style={{ color: "gray" }} icon={faClock} />{" "}
                  &nbsp;&nbsp;
                  {eventDetails?.day.slice(0, 3)} {formattedDate} at
                  {eventDetails?.sessionTimings[0]} to <br /> &nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;
                  {eventDetails?.day.slice(0, 3)} {formattedDate}&nbsp;
                  {eventDetails?.sessionTimings[1]}
                </p>
                <p>
                  {" "}
                  <FontAwesomeIcon
                    style={{ color: "gray" }}
                    icon={faLocationDot}
                  />
                  &nbsp;&nbsp; &nbsp;
                  {eventDetails?.address}
                  <br />
                  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{eventDetails?.venue}
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faIndianRupeeSign}
                    style={{ color: "gray" }}
                  />
                  &nbsp; &nbsp;&nbsp; {eventDetails?.price}
                </p>
              </div>
              <div className="my-5">
                <h5 style={{ fontWeight: "bold" }}>
                  Speakers:({eventDetails?.speakers.length})
                </h5>
                <div
                  className="d-flex mt-3  rounded bg-light"
                  style={{
                    gap: "1rem",
                  }}
                >
                  {eventDetails?.speakers?.map((speaker) => (
                    <div
                      key={speaker._id}
                      className="p-2 rounded  align-items-center d-flex flex-column text-center"
                      style={{
                        background: "white",
                        marginLeft: "0.56rem",
                        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1) ",
                        width: "14rem",
                      }}
                    >
                      <img
                        className="rounded-circle object-fit-cover"
                        src={speaker?.image}
                        alt=""
                        style={{ width: "70px", height: "70px" }}
                      />
                      <h6
                        style={{ lineHeight: "0", fontWeight: "bold" }}
                        className="mt-3"
                      >
                        {speaker?.name}
                      </h6>
                      <p>{speaker?.occupation.split("at")[0]}</p>
                    </div>
                  ))}
                </div>
                <button
                  className="btn btn-danger pe-5 ps-5 my-4 d-flex m-auto"
                  style={{ letterSpacing: "2px" }}
                >
                  RSVP
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};
export default EventDetails;
