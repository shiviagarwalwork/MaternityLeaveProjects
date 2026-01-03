#!/bin/bash
# generate-context.sh
# Auto-generate project stats from git for CLAUDE.md

echo "# Project Stats (Auto-Generated)"
echo "Generated: $(date)"
echo ""

# Total commits
echo "**Total Commits:** $(git rev-list --count HEAD)"

# Lines of code (excluding node_modules, .next, etc)
echo "**Total Lines:** $(find src -name '*.tsx' -o -name '*.ts' -o -name '*.css' | xargs wc -l | tail -1 | awk '{print $1}')"

# File counts
echo "**TypeScript Files:** $(find src -name '*.ts' -o -name '*.tsx' | wc -l | xargs)"
echo "**Components:** $(find src/components -name '*.tsx' | wc -l | xargs)"
echo "**Data Files:** $(find src/data -name '*.ts' | wc -l | xargs)"

# Recent activity
echo ""
echo "## Recent Commits (Last 5)"
git log -5 --pretty=format:"- %h - %s (%ar)" --abbrev-commit

echo ""
echo ""
echo "## File Changes (Last Commit)"
git diff --stat HEAD~1 HEAD

echo ""
echo "---"
echo "Run this script to update stats in CLAUDE.md"
