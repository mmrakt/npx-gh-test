#!/bin/bash

while getopts "r:" opt; do
  case $opt in
    r) repo_name="$OPTARG"
    ;;
    \?) echo "Invalid option: -$OPTARG" >&2
    ;;
  esac
done

cd "$repo_name"

# gh auth
gh repo create nijibox/$repo_name --private

git remote add origin "https://github.com/nijibox/$repo_name.git"

git push -u origin main
