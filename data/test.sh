#!/bin/bash

test_api_methods() {
    # warmup
    hey -m GET http://localhost:3000/simple > /dev/null
    hey -m POST http://localhost:3000/simple > /dev/null

    # Create simple directory if it doesn't exist
    mkdir -p simple

    echo "Running GET benchmark"
    hey -n 1000 -m GET -o csv http://localhost:3000/simple > simple/get_results.csv
    echo "Running POST benchmark"
    hey -n 1000 -m POST -o csv http://localhost:3000/simple > simple/post_results.csv
    echo "Comparing results"
    poetry run python compare.py simple/{get,post}_results.csv --output simple/comparison.png
}

test_api_methods