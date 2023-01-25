#!/bin/bash

key="YOUR OpenAI API KEY GOES HERE"


prompt=$*
payload=$(echo -n "{\"model\":\"text-davinci-003\",\"prompt\": \"$prompt\" ,\"max_tokens\":400,\"temperature\":0.3}")
curl -s  https://api.openai.com/v1/completions -H "Content-Type: application/json" -H "Authorization: Bearer $key" --data-raw "$payload" | jq -r '.choices[].text'| tail -n +3
