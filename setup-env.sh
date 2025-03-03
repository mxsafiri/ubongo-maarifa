#!/bin/bash

# Read from .env.local and add to Vercel
if [ -f .env.local ]; then
  echo "Adding environment variables to Vercel..."
  
  # Extract variables from .env.local
  while IFS= read -r line || [[ -n "$line" ]]; do
    # Skip comments and empty lines
    if [[ ! "$line" =~ ^# && -n "$line" ]]; then
      # Extract variable name and value
      var_name=$(echo "$line" | cut -d= -f1)
      var_value=$(echo "$line" | cut -d= -f2-)
      
      # Add to Vercel
      echo "Adding $var_name..."
      vercel env add $var_name production <<< "$var_value"
    fi
  done < .env.local
  
  echo "Environment variables added successfully!"
else
  echo "Error: .env.local file not found!"
  exit 1
fi
