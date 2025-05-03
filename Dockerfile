FROM ghcr.io/osgeo/gdal:ubuntu-full-latest

WORKDIR /osm-extracts

COPY extract.sh .

RUN chmod +x extract.sh
RUN ./extract.sh