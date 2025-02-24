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
        style={{ paddingInline: "9rem", letterSpacing: "0.89px" }}
      >
        {loading ? (
          <p>loading...</p>
        ) : (
          <div className="d-flex justify-content-between">
            <div style={{ width: "50%" }}>
              <h2 className="mb-3">{eventDetails?.title}</h2>
              Hosted By:{" "}
              <p style={{ fontSize: "1.2rem", fontWeight: "390" }}>
                <strong>Marketing Experts</strong>
              </p>
              <img
                src={eventDetails?.thumbnail}
                alt={eventDetails?.title}
                className="img-fluid mt-3 rounded"
                style={{ width: "25rem" }}
              />
              <h5 className="my-4" style={{ fontWeight: "bold" }}>
                Details:{" "}
              </h5>
              <p>{eventDetails?.description}</p>
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
                  {eventDetails?.day.slice(0, 3)} {formattedDate} at{" "}
                  {eventDetails?.sessionTimings[0]}
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
                <div className="d-flex g-4">
                  <div
                    className="p-2 rounded  align-items-center"
                    style={{ background: "white", marginLeft: "0.56rem" }}
                  >
                    <img
                      className="rounded-circle object-fit-cover"
                      src="https://images.pexels.com/photos/30468629/pexels-photo-30468629/free-photo-of-professional-portrait-of-a-blonde-woman-on-neutral-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt={eventDetails?.speakers[0]}
                      style={{ width: "70px", height: "70px" }}
                    />
                    <h6
                      style={{ lineHeight: "0", fontWeight: "bold" }}
                      className="mt-3"
                    >
                      {eventDetails?.speakers[0]}
                    </h6>
                    <p>Marketing Manager</p>
                  </div>
                  <div
                    className="p-2 rounded"
                    style={{ background: "white", marginLeft: "0.56rem" }}
                  >
                    <img
                      className="rounded-circle object-fit-cover"
                      src="https://images.pexels.com/photos/30468629/pexels-photo-30468629/free-photo-of-professional-portrait-of-a-blonde-woman-on-neutral-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt={eventDetails?.speakers[0]}
                      style={{ width: "70px", height: "70px" }}
                    />
                    <h6
                      style={{ lineHeight: "0", fontWeight: "bold" }}
                      className="mt-3"
                    >
                      {eventDetails?.speakers[0]}
                    </h6>
                    <p>Marketing Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};
export default EventDetails;
