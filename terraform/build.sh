#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
. $dir/clean.sh
build_dir="$dir/../.builds"

mkdir $build_dir

pushd $dir/../api
zip -r "$build_dir/benford_api.zip" api.py
pushd my_env/Lib/site-packages
zip -g -r "$build_dir/benford_api.zip" .
popd
popd