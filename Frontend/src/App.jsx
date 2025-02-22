import useFetch from "./useFetch";
const App = () => {
  const { data, loading, error } = useFetch(
    "https://meetup-app-two.vercel.app/events"
  );
  console.log(data);
  return (
    <>
      {" "}
      <main style={{ marginInline: "5rem" }} className="my-5">
        {" "}
        <h1>Meetup Events</h1> {loading && <p>Loading...</p>}
        <div className="row g-5">
          {" "}
          {data?.map((event) => (
            <div className="col col-md-4" key={event._id}>
              <div className="card">
                <img
                  src={event.thumbnail}
                  className="card-img-top"
                  alt="..."
                  style={{ height: "20rem" }}
                />
                <div className="card-body">
                  <p className="text-secondary">
                    {event.sessionTimings[0]} IST
                  </p>
                  <h5 className="card-title">{event.title}</h5>
                </div>
              </div>
            </div>
          ))}{" "}
        </div>{" "}
      </main>{" "}
    </>
  );
};
export default App;
