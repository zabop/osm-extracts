import React, { useState, useEffect } from "react";

const regions = [
  { name: "Finland", path: "finland" },
  { name: "Iceland", path: "iceland" },
  { name: "Norway", path: "norway" },
  { name: "Sweden", path: "sweden" },
];

const extracts = [
  { name: "Power", fname: "power.zip" },
  { name: "Protected areas", fname: "protected_areas.zip" },
  { name: "Administrative divisions", fname: "admin_divisions.zip" },
];

function CountryLinks({ region }) {
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    // Construct the URL for the metadata JSON
    const metadataUrl = `https://ukzckrzlamlgsschrwgd.supabase.co/storage/v1/object/public/yosmgm-testing0/europe/${region.path}/power.metadata.json`;

    // Fetch the JSON data
    const fetchMetadata = async () => {
      const response = await fetch(metadataUrl);
      const data = await response.json();
      setLastUpdated(data["last-upload-human-readable"]);
    };

    fetchMetadata();
  }, []);

  return (
    <>
      <h1>{region.name}</h1>
      {lastUpdated && <p>Last updated: {lastUpdated} UTC</p>}
      <ul>
        {extracts.map((extract) => (
          <li key={`${region.path}/${extract.fname}`}>
            <a href={`${region.path}/${extract.fname}`}>{extract.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  return (
    <>
      {regions.map((region) => (
        <CountryLinks key={region.path} region={region} />
      ))}
    </>
  );
}

export default App;
