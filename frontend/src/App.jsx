import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

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
  const metadata = useQuery({
    queryKey: ["metadata", region.path, extract.fname],
    queryFn: () =>
      fetch(
        `https://ukzckrzlamlgsschrwgd.supabase.co/storage/v1/object/public/osm-extracts/${
          region.path
        }/${extract.fname.replace(".gpkg.zip", "")}.metadata.json`
      ).then((res) => res.json()),
  });

  if (metadata.isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <li key={`${region.path}/${extract.fname}`}>
      <a
        href={`https://ukzckrzlamlgsschrwgd.supabase.co/storage/v1/object/public/osm-extracts/${region.path}/${extract.fname}`}
      >
        {extract.name}
      </a>{" "}
      (last updated: {metadata.data["last-upload-human-readable"]} UTC)
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

const Region = ({ region }) => {
  const name = useParams().region;
  return (
    <div>
      <h2>{name}</h2>
      <div>{name}</div>
    </div>
  );
};
const Regions = ({ regions }) => {
  return (
    <div>
      <div>Under construction.</div>
      <ul>
        {regions.map((region) => (
          <li key={region.name}>
            <Link to={`/geojsons/${region.name}`}>{region.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
function GPKG() {
  return (
    <div>
      <h1>OSM Example Thematic GPKG Extracts</h1>
      <div>
        There are many different reasonable ways to process OSM data. See
        example outputs below.
      </div>
      <div>Updates every Monday.</div>
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
    </div>
  );
}

function App() {
  const padding = {
    padding: 5,
  };
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Link style={padding} to="/">
            GPKG
          </Link>
          <Link style={padding} to="/geojsons">
            GeoJSON
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<GPKG />} />
          <Route path="/geojsons" element={<Regions regions={regions} />} />
          <Route
            path="/geojsons/:region"
            element={<Region regions={regions} />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
