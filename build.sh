#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

repo_url=$(aws ssm get-parameter --name benford-ecr-repo-url | jq -r '.Parameter.Value')

docker build -t benford-api $dir
docker tag benford-api:latest $repo_url
docker push $repo_url
