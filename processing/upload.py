import datetime
import boto3
import time
import json
import sys
import os

session = boto3.session.Session()

client = session.client(
    "s3",
    region_name=os.environ["REGION_NAME"],
    endpoint_url=os.environ["ENDPOINT_URL"],
    aws_access_key_id=os.environ["KEY_ID"],
    aws_secret_access_key=os.environ["SECRET"],
)

client.upload_file(
    "dst.gpkg",
    "yosmgm-testing0",
    f"{sys.argv[1]}.gpkg",
)

timestamp = time.time()
humanTime = datetime.datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M:%S")

metadata = {"last-upload": timestamp, "last-upload-human-readable": humanTime}

with open("metadata.json", "w") as f:
    f.write(json.dumps(metadata))

client.upload_file(
    "metadata.json",
    "yosmgm-testing0",
    f"{sys.argv[1]}.metadata.json",
    ExtraArgs={
        "ContentType": "application/json",
    },
)
