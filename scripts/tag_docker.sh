#!/usr/bin/env bash

docker tag $AWS_ACCOUNT_NUMBER.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/test-sachin:latest $AWS_ACCOUNT_NUMBER.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/test-sachin:$IMAGE_TAG
