#!/bin/bash


while getopts "r:" opt; do
  case $opt in
    r) repo_name="$OPTARG"
    ;;
    \?) echo "Invalid option: -$OPTARG" >&2
    ;;
  esac
done

./gh/gh auth login

./gh/gh repo create $repo_name --private
