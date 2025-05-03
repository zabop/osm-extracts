FROM ghcr.io/osgeo/gdal:ubuntu-full-latest

WORKDIR /osm-extracts

RUN chmod +x extract.sh
RUN ./extract.sh