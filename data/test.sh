#!/bin/bash

test_api_methods() {
    echo "⚙️ Benchmarking simple GET and POST API routes"
    # warmup
    hey -m GET http://localhost:3000/simple > /dev/null
    hey -m POST http://localhost:3000/simple > /dev/null

    # Create simple directory if it doesn't exist
    mkdir -p simple

    echo "    Running GET benchmark"
    hey -n 1000 -m GET -o csv http://localhost:3000/simple > simple/get_results.csv
    echo "    Running POST benchmark"
    hey -n 1000 -m POST -o csv http://localhost:3000/simple > simple/post_results.csv
    echo "    Comparing results..."
    poetry run python compare.py simple/{get,post}_results.csv --output simple/comparison.png
    echo "    Output saved to simple/comparison.png"
}

test_action() {
    echo ""
    echo "⚙️ Benchmarking action vs simple POST API route"
    # warmup
    # Extract the ACTION_ID from the page
    ACTION_ID=$(curl -s http://localhost:3000/ | grep -o '\$ACTION_ID_[a-f0-9]*' | head -n 1)
    FORM_BOUNDARY="------WebKitFormBoundaryNur1GTzRzbQRfCPh"
    hey -m POST \
        -H "Content-Type: multipart/form-data; boundary=${FORM_BOUNDARY#--}" \
        -H "Accept: text/x-component" \
        -H "Next-Action: ${ACTION_ID#\$ACTION_ID_}" \
        -d ${FORM_BOUNDARY}$'\r\nContent-Disposition: form-data; name="1_'${ACTION_ID}$'"\r\n\r\n\r\n'${FORM_BOUNDARY}$'\r\nContent-Disposition: form-data; name="0"\r\n\r\n["$K1"]\r\n'${FORM_BOUNDARY}$'--' \
        http://localhost:3000/ > /dev/null


    # Create action directory if it doesn't exist
    mkdir -p action

    echo "    Running Server Action benchmark"
    hey -n 1000 -m POST -o csv \
        -H "Content-Type: multipart/form-data; boundary=${FORM_BOUNDARY#--}" \
        -H "Accept: text/x-component" \
        -H "Next-Action: ${ACTION_ID#\$ACTION_ID_}" \
        -d ${FORM_BOUNDARY}$'\r\nContent-Disposition: form-data; name="1_'${ACTION_ID}$'"\r\n\r\n\r\n'${FORM_BOUNDARY}$'\r\nContent-Disposition: form-data; name="0"\r\n\r\n["$K1"]\r\n'${FORM_BOUNDARY}$'--' \
        http://localhost:3000/ > action/action_results.csv
    echo "    Running simple POST benchmark"
    hey -n 1000 -m POST -o csv http://localhost:3000/simple > action/post_results.csv
    echo "    Comparing results..."
    poetry run python compare.py action/{action,post}_results.csv --output action/comparison.png
    echo "    Output saved to action/comparison.png"
}

test_api_methods
test_action
