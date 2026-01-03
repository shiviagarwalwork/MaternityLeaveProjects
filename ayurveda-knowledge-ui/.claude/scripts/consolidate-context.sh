#!/bin/bash
# consolidate-context.sh
# Quality control check for context files

echo "🔍 Context Files Quality Check"
echo "=============================="
echo ""

# Check CLAUDE.md line count
CLAUDE_LINES=$(wc -l < CLAUDE.md)
echo "📄 CLAUDE.md: $CLAUDE_LINES / 400 lines"
if [ $CLAUDE_LINES -gt 400 ]; then
  echo "   ⚠️  EXCEEDS LIMIT - Archive old sessions to .claude/archive/SESSIONS_ARCHIVE.md"
else
  echo "   ✅ Within limit"
fi
echo ""

# Check DECISIONS.md line count
DECISIONS_LINES=$(wc -l < .claude/DECISIONS.md)
echo "📄 DECISIONS.md: $DECISIONS_LINES / 200 lines"
if [ $DECISIONS_LINES -gt 200 ]; then
  echo "   ⚠️  EXCEEDS LIMIT - Archive superseded decisions to .claude/archive/DECISIONS_ARCHIVE.md"
else
  echo "   ✅ Within limit"
fi
echo ""

# Check session counter
SESSION_NUM=$(grep "^**Session Counter:**" CLAUDE.md | grep -o '[0-9]\+')
echo "📊 Current Session: #$SESSION_NUM"
if [ $((SESSION_NUM % 15)) -eq 0 ]; then
  echo "   ⚠️  Time to consolidate! Run consolidation at session multiples of 15"
else
  echo "   ✅ No consolidation needed yet"
fi
echo ""

# Check for uncommitted context changes
if git diff --quiet CLAUDE.md .claude/; then
  echo "✅ All context files committed"
else
  echo "⚠️  Uncommitted context changes detected:"
  git diff --name-only CLAUDE.md .claude/
fi
echo ""

echo "=============================="
echo "💡 Consolidation Guidelines:"
echo "  - Keep last 5-7 sessions in detail"
echo "  - Summarize older sessions to 1 line each"
echo "  - Archive superseded ADRs"
echo "  - Run after every session close"
