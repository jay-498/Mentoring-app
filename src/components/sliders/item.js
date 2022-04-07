import React, { useState } from "react";

export default function({...props }) {
  let [state, setstate] = useState(0);

  return (
    <div class="slide-item">
      <img
        src={props.download_url}
        alt="ss"
        style={{
          minHeight: "100px",
          minWidth: "230px",
          objectFit: "fill",
          backgroundPosition: "center",
          WebkitTransformOrigin: "center"
        }}
        height={"120px"}
      />
      <button
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          padding: "40px"
        }}
        onClick={() => {
          setstate(p => p + 1);
        }}
      >
        click
      </button>
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%"
        }}
      >
        {state}
      </div>
    </div>
  );
}
