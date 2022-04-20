#!/usr/bin/env bash

docker push $AWS_ACCOUNT_NUMBER.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/test-sachin:latest && \
docker push $AWS_ACCOUNT_NUMBER.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/test-sachin:$IMAGE_TAG
