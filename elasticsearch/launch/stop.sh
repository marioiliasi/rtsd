#!/usr/bin/env bash
docker stop elasticsearch
docker rm elasticsearch
docker network rm elasticsearch
