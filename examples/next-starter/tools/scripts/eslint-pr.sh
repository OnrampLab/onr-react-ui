#!/bin/bash
set -e

git fetch origin main:refs/remotes/origin/main
files=$(git diff origin/main HEAD --name-only --diff-filter ACMR | egrep '\.(js|jsx|ts|tsx)$' || true)

if [[ -n "$files" ]]; then
  echo "$files" | xargs yarn eslint --format junit -o reports/eslint/js-lint-results.xml
fi

RESULT=$?

[ $RESULT -ne 0 ] && exit 1
exit 0
