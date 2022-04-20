#!/usr/bin/env bash

docker build \
-f Dockerfile \
-t $AWS_ACCOUNT_NUMBER.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/test-sachin:latest .


