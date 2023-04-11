import * as React from "react";

const Feature = ({ blok }) => {
  return (
    <div>
      <h1>{blok.name}</h1>
      <h3>{blok.description}</h3>
      <h5>{blok.icon}</h5>
    </div>
  );
};

export default Feature;
