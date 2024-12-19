#!/bin/bash

# Get the last changed markdown file in content directory
CHANGED_FILE=$(git status --porcelain content/ | grep '.[md|mdx]$' | head -n 1 | awk '{print $2}')

if [ ! -z "$CHANGED_FILE" ]; then
    # Extract title from frontmatter (assumes title is in format: title: "Your Title")
    TITLE=$(grep -m 1 "title:" "$CHANGED_FILE" | sed 's/title:[[:space:]]*"\(.*\)"/\1/')
    echo "[post-update]:$TITLE"
else
    echo "📝 Update blog content"
fi