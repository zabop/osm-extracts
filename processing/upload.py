import datetime
import boto3
import time
import json
import sys
import os

region = sys.argv[1]
dst = sys.argv[2]

session = boto3.session.Session()
# https://github.com/boto/boto3/issues/4435#issuecomment-2648819900
os.environ["AWS_REQUEST_CHECKSUM_CALCULATION"] = "when_required"
os.environ["AWS_RESPONSE_CHECKSUM_VALIDATION"] = "when_required"

client = session.client(
    "s3",
    region_name=os.environ["REGION_NAME"],
    endpoint_url=os.environ["ENDPOINT_URL"],
    aws_access_key_id=os.environ["KEY_ID"],
    aws_secret_access_key=os.environ["SECRET"],
)

client.upload_file(
    f"{'_'.join(region.split("/"))}_{dst}.gpkg.zip",
    "osm-extracts",
    f"{region}/{dst}.gpkg.zip",
)

timestamp = time.time()
humanTime = datetime.datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M:%S")

metadata = {"last-upload": timestamp, "last-upload-human-readable": humanTime}

with open("metadata.json", "w") as f:
    f.write(json.dumps(metadata))

client.upload_file(
    "metadata.json",
    "osm-extracts",
    f"{region}/{dst}.metadata.json",
    ExtraArgs={
        "ContentType": "application/json",
    },
)
