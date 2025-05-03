#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

curl https://download.geofabrik.de/europe/liechtenstein-latest.osm.pbf --output latest.osm.pbf
osmium tags-filter -o power.osm.pbf latest.osm.pbf nw/power
ogr2ogr power.gpkg power.osm.pbf

b2 file upload osm-extracts power.gpkg power.gpkg