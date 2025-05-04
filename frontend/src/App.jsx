import React, { useState, useEffect } from "react";

const regions = [
  { name: "Finland", path: "europe/finland" },
  { name: "Iceland", path: "europe/iceland" },
  { name: "Norway", path: "europe/norway" },
  { name: "Sweden", path: "europe/sweden" },
];

const extracts = [
  { name: "Administrative regions", fname: "administrative_regions.gpkg.zip" },
  { name: "Power", fname: "power.gpkg.zip" },
  { name: "Protected areas", fname: "protected_areas.gpkg.zip" },
];

function ExtractLink({ region, extract }) {
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const baseName = extract.fname.replace(".gpkg.zip", "");
    const metadataUrl = `https://ukzckrzlamlgsschrwgd.supabase.co/storage/v1/object/public/osm-extracts/${region.path}/${baseName}.metadata.json`;

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
        href={`https://ukzckrzlamlgsschrwgd.supabase.co/storage/v1/object/public/osm-extracts/${region.path}/${extract.fname}`}
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
        There are many different reasonable ways to process OSM data. See
        example outputs below.
      </div>
      <div>Updated daily.</div>
      {regions.map((region) => (
        <CountryLinks key={region.path} region={region} />
      ))}
      <div>
        Not quite what you want? Intersted in a region not listed above? Some
        ideas on what you can do:
        <li>
          Look into the{" "}
          <a href="https://github.com/zabop/osm-extracts" target="_blank">
            processing scripts
          </a>{" "}
          yourself
        </li>
        <li>
          Contact me on{" "}
          <a href="mailto:osm-extracts@protonmail.com">
            osm-extracts@protonmail.com
          </a>{" "}
          or{" "}
          <a
            href="https://www.openstreetmap.org/messages/new/zabop"
            target="_blank"
          >
            on OSM
          </a>
        </li>
        <li>
          Contact{" "}
          <a
            href="https://www.geofabrik.de/data/vector-data.html"
            target="_blank"
          >
            <a href=""></a>
            Geofabrik
          </a>{" "}
          (they offer a data extraction service)
        </li>{" "}
        <li>
          {" "}
          If you are into power networks, you might also like{" "}
          <a
            href="https://www.infrageomatics.com/products/osm-export"
            target="_blank"
          >
            Infrageomatics
          </a>{" "}
          extracts
        </li>
      </div>
    </>
  );
}

export default App;
