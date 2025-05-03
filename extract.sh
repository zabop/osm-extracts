#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

curl https://download.geofabrik.de/europe/liechtenstein-latest.osm.pbf --output latest.osm.pbf
ogr2ogr latest.gpkg latest.osm.pbf

aws s3 cp latest.gpkg s3://osm-extracts/latest.gpkg