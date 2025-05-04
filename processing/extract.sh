#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

region=$1
filter=$2
dst=$3

curl "https://download.geofabrik.de/${region}-latest.osm.pbf" --output latest.osm.pbf
osmium tags-filter -o filtered.osm.pbf latest.osm.pbf "${filter}"

echo "Writing ${region}_${dst}.gpkg" 
ogr2ogr "${region}_${dst}.gpkg" filtered.osm.pbf

python3 upload.py "${region} ${dst}"