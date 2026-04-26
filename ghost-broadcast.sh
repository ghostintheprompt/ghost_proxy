#!/bin/bash

# ghost-broadcast.sh
# Automates the deployment of the Release Workflow across all repositories in an account.
# Requires: GitHub CLI (gh) authenticated.

ACCOUNT="ghostintheprompt"
WORKFLOW_PATH=".github/workflows/release.yml"

echo "Scouring account: $ACCOUNT for repositories..."

# Get a list of all non-archived repositories
REPOS=$(gh repo list $ACCOUNT --limit 1000 --json name --jq '.[].name')

for REPO in $REPOS; do
    if [ "$REPO" == "ghost-proxy" ]; then
        echo "Skipping source repo: $REPO"
        continue
    fi

    echo "Broadcasting to: $REPO"
    
    # 1. Clone the repo into a temporary space
    git clone --depth 1 "https://github.com/$ACCOUNT/$REPO.git" "tmp_$REPO"
    
    # 2. Create the workflow directory
    mkdir -p "tmp_$REPO/.github/workflows"
    
    # 3. Copy the master release.yml
    cp "$WORKFLOW_PATH" "tmp_$REPO/$WORKFLOW_PATH"
    
    # 4. Commit and Push
    cd "tmp_$REPO"
    git add .
    git commit -m "MDRN_AUTO: Deploy standardized release workflow"
    git push origin main || git push origin master
    
    # 5. Cleanup
    cd ..
    rm -rf "tmp_$REPO"
    
    echo "Successfully updated $REPO"
done

echo "Broadcast complete. All nodes updated with Release capabilities."
