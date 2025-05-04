import React, { useState, useEffect } from "react";

const regions = [
  { name: "Finland", path: "europe/finland" },
  { name: "Iceland", path: "europe/iceland" },
  { name: "Norway", path: "europe/norway" },
  { name: "Sweden", path: "europe/sweden" },
];

const extracts = [
  { name: "Administrative regions", fname: "administrative_regions.gpkg" },
  { name: "Power", fname: "power.gpkg" },
  { name: "Protected areas", fname: "protected_areas.gpkg" },
];

function ExtractLink({ region, extract }) {
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const baseName = extract.fname.replace(".gpkg", "");
    const metadataUrl = `https://ukzckrzlamlgsschrwgd.supabase.co/storage/v1/object/public/yosmgm-testing0/${region.path}/${baseName}.metadata.json`;

    const fetchMetadata = async () => {
      const response = await fetch(metadataUrl);
      const data = await response.json();
      setLastUpdated(data["last-upload-human-readable"]);
    };

    fetchMetadata();
  }, [region.path, extract]);

  return (
    <li key={`${region.path}/${extract.fname}`}>
      <a
        href={`https://ukzckrzlamlgsschrwgd.supabase.co/storage/v1/object/public/yosmgm-testing0/${region.path}/${extract.fname}`}
      >
        {extract.name}
      </a>
      {lastUpdated && ` (last updated: ${lastUpdated} UTC)`}
    </li>
  );
}

function CountryLinks({ region }) {
  return (
    <>
      <h1>{region.name}</h1>
      <ul>
        {extracts.map((extract) => (
          <ExtractLink
            key={`${region.path}/${extract.fname}`}
            region={region}
            extract={extract}
          />
        ))}
      </ul>
    </>
  );
}

function App() {
  return (
    <>
      <h1>OSM Example GPKG Extracts</h1>
      <div>
        There are many different reasonable ways for OSM data processing. See
        examples below.
      </div>
      <div>
        Not quite what you want? Email zabop.github.io.uncanny066@passfwd.com.
      </div>
      <div>Files are updated around every UTC noon.</div>
      {regions.map((region) => (
        <CountryLinks key={region.path} region={region} />
      ))}
    </>
  );
}

export default App;
