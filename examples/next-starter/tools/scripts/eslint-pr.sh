#!/bin/bash
set -e

git fetch origin main:refs/remotes/origin/main

files=$(git diff origin/main HEAD --name-only --diff-filter ACMR | egrep '\.(js|jsx|ts|tsx)$')
if [ -n "$files" ]; then
    echo "$files" | xargs $(npm bin)/eslint --format junit -o reports/eslint/js-lint-results.xml
    RESULT=$?

  [ $RESULT -ne 0 ] && exit 1
fi

exit 0
