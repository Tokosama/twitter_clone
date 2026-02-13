import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Spinner() {
  return (
    <div>
      <ClipLoader
        color="white"
        size={80}
      />
    </div>
  );
}

export default Spinner;
