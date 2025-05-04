import boto3
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
    sys.argv[1],
)
