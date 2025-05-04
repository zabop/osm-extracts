import React, { useState, useEffect } from "react";

const regions = [
  { name: "Finland", path: "europe/finland" },
  { name: "Iceland", path: "europe/iceland" },
  { name: "Norway", path: "europe/norway" },
  { name: "Sweden", path: "europe/sweden" },
];

const extracts = [
  { name: "Power", fname: "power.gpkg" },
  { name: "Protected areas", fname: "protected_areas.gpkg" },
  { name: "Administrative divisions", fname: "admin_divisions.gpkg" },
];

function CountryLinks({ region }) {
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const metadataUrl = `https://ukzckrzlamlgsschrwgd.supabase.co/storage/v1/object/public/yosmgm-testing0/${region.path}/power.metadata.json`;

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
            <a
              href={`https://ukzckrzlamlgsschrwgd.supabase.co/storage/v1/object/public/yosmgm-testing0/${region.path}/${extract.fname}`}
            >
              {extract.name}
            </a>
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
