#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

target=$1

curl "https://download.geofabrik.de/${target}-latest.osm.pbf" --output latest.osm.pbf
osmium tags-filter -o power.osm.pbf latest.osm.pbf nw/power
ogr2ogr power.gpkg power.osm.pbf

b2 file upload osm-extracts power.gpkg liechtenstein/power.gpkg