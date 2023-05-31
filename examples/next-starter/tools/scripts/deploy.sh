#!/bin/bash

git tag -a "$1" -m "$1" && git push -u origin main $1
