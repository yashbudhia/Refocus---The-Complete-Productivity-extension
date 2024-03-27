import React, { useState, useEffect } from "react";
import axios from "axios";

function TabDataComponent() {
  const [tabData, setTabData] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch tab data from Express server
  const fetchTabData = () => {
    axios
      .get("http://localhost:3000/tab-data")
      .then((response) => {
        setTabData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    // Fetch tab data initially
    fetchTabData();

    // Set up interval for periodic updates
    const intervalId = setInterval(fetchTabData, 1000); // Update every 5 seconds (adjust interval as needed)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Run once on component mount

  return (
    <div>
      <h2>Tab Data</h2>
      {error ? (
        <p>Error fetching tab data: {error}</p>
      ) : tabData ? (
        <ul>
          {Object.keys(tabData).map((tabId) => (
            <li key={tabId}>
              <strong>Title:</strong> {tabData[tabId].title},
              <strong> URL:</strong> {tabData[tabId].url},
              <strong> Active:</strong> {tabData[tabId].active ? "Yes" : "No"}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading tab data...</p>
      )}
    </div>
  );
}

export default TabDataComponent;
