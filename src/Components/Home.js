import React from "react";
import ExcelUpload from "./ExcelUpload";

const Home = () => {
  return (
    <div>
      <h1>Reporting Tool</h1>

      <div>
        <h5>Download your report in following ways</h5>
        <ExcelUpload/>
      </div>
    </div>
  );
};

export default Home;
