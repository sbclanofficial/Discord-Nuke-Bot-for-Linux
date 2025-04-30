#!/bin/bash

echo "Discord Server Setup Bot"
echo "------------------------"

read -p "Enter your Discord bot token: " TOKEN

read -p "Enter the server ID to modify: " SERVER_ID

node index.js "$TOKEN" "$SERVER_ID"
