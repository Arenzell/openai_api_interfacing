#!/bin/bash

key="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"


something=$*

    url=$(curl -s https://api.openai.com/v1/images/generations \
	       -H "Content-Type: application/json" \
	       -H "Authorization: Bearer $key" \
	       -d "{
  \"prompt\": \"$something\",
  \"n\": 1,
  \"size\": \"1024x1024\"
}"	    | jq -r ".data[].url")

    echo $url
    
