FROM ghcr.io/osgeo/gdal:ubuntu-full-latest

WORKDIR /osm-extracts

RUN curl https://download.geofabrik.de/europe/liechtenstein-latest.osm.pbf --output latest.osm.pbf
RUN ogr2ogr latest.gpkg latest.osm.pbf