import React from "react";

const ShimmerEvent = () => {
  return (
    <div className="container my-4 p-4 bg-light rounded">
      <h2 className="placeholder-glow">
        <span className="placeholder col-6"></span>
      </h2>

      <p className="placeholder-glow">
        <strong></strong>
        <span className="placeholder col-3"></span>
      </p>

      <div className="row">
        <div className="col-md-4">
          <div className="placeholder w-100" style={{ height: "200px" }}></div>
        </div>

        <div className="col-md-8">
          <p className="placeholder-glow">
            <span className="placeholder col-10"></span>
            <span className="placeholder col-8"></span>
            <span className="placeholder col-6"></span>
          </p>
        </div>
      </div>

      <div className="p-3 my-3 border rounded bg-white">
        <p className="placeholder-glow">
          <span className="placeholder col-8"></span>
          <span className="placeholder col-4"></span>
        </p>
      </div>

      <h5 className="placeholder-glow">
        <span className="placeholder col-4"></span>
      </h5>
      <div className="row">
        <div className="col-6 col-md-3">
          <div className="placeholder w-100" style={{ height: "150px" }}></div>
        </div>
        <div className="col-6 col-md-3">
          <div className="placeholder w-100" style={{ height: "150px" }}></div>
        </div>
      </div>

      <div className="mt-3">
        <button className="btn btn-danger disabled placeholder col-3"></button>
      </div>
    </div>
  );
};

export default ShimmerEvent;
