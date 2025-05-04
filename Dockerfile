FROM ghcr.io/osgeo/gdal:ubuntu-full-latest

WORKDIR /osm-extracts

RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-venv \
    osmium-tool

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip3 install --upgrade b2

COPY extract.sh .
RUN chmod +x extract.sh

ENTRYPOINT ["./extract.sh"]