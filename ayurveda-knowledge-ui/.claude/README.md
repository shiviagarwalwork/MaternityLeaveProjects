# .claude/ - Context Memory System

This directory contains the context memory system for Claude Code sessions, ensuring each session builds on all previous work.

## 📁 Directory Structure

```
.claude/
├── README.md                    # This file
├── DECISIONS.md                 # Architecture Decision Records (WHY)
├── LEARNINGS.md                 # Bugs fixed, gotchas discovered
├── CONVENTIONS.md               # Code patterns, style guide
├── archive/
│   ├── SESSIONS_ARCHIVE.md     # Consolidated old sessions (1 line each)
│   └── DECISIONS_ARCHIVE.md    # Superseded ADRs
└── scripts/
    ├── generate-context.sh     # Auto-generate git stats
    └── consolidate-context.sh  # Quality control check
```

## 📄 File Purposes

### DECISIONS.md
**WHY decisions were made, not just WHAT**
- Architecture choices with rationale
- Design pattern selections
- Technology choices
- Trade-off analysis

**Format:** ADR (Architecture Decision Record)
- Context: What was the situation?
- Decision: What did we choose?
- Rationale: Why?
- Consequences: What are the impacts?

**Limit:** 200 lines (archive old decisions when exceeded)

### LEARNINGS.md
**Bugs and gotchas with solutions**
- Specific bugs encountered and how they were fixed
- Platform/framework quirks discovered
- Performance learnings
- Anti-patterns to avoid

**Format:**
- BUG-XXX: Numbered bug entries with root cause and solution
- GOTCHA-XXX: Platform quirks and best practices
- PERF-XXX: Performance observations

**Limit:** 300 lines

### CONVENTIONS.md
**Project-specific code patterns**
- Component structure patterns
- Naming conventions
- Styling rules (CSS variables, gradients, etc.)
- TypeScript patterns
- File organization

**Format:** Organized by topic with examples

**Limit:** 400 lines

## 🔄 Session Workflow

### At Start of Session
1. Read `../CLAUDE.md` completely
2. Review `DECISIONS.md` for architecture context
3. Review `LEARNINGS.md` for known issues
4. Review `CONVENTIONS.md` for code style
5. Check "Next Priorities" in CLAUDE.md

### During Session
- Follow patterns in CONVENTIONS.md
- Document new decisions in DECISIONS.md if architecture changes
- Document bugs/fixes in LEARNINGS.md as they occur

### At End of Session
1. Increment session counter in `../CLAUDE.md`
2. Update "Recent Work" section with summary
3. Update DECISIONS.md if ADRs created
4. Update LEARNINGS.md if bugs fixed
5. Update CONVENTIONS.md if new patterns established
6. Update "Next Priorities" and "Known Issues"
7. Run `./scripts/consolidate-context.sh` to check quality
8. Commit context updates
9. Push to repository

## 🛠️ Scripts

### generate-context.sh
Auto-generates project stats from git:
```bash
./scripts/generate-context.sh
```

Output:
- Total commits
- Lines of code
- File counts
- Recent commits
- File changes

Use this to update stats in `../CLAUDE.md`

### consolidate-context.sh
Quality control check:
```bash
./scripts/consolidate-context.sh
```

Checks:
- CLAUDE.md line count (400 limit)
- DECISIONS.md line count (200 limit)
- Session consolidation timing
- Uncommitted context changes

Run at end of every session.

## 📏 Quality Rules

### Line Limits
- `../CLAUDE.md`: 400 lines max
- `DECISIONS.md`: 200 lines max
- `LEARNINGS.md`: 300 lines max
- `CONVENTIONS.md`: 400 lines max

When exceeded, archive old content to `archive/` directory.

### Session Detail
- Keep last **5-7 sessions** in full detail
- Summarize older sessions to **1 line each**
- Move to `archive/SESSIONS_ARCHIVE.md` when CLAUDE.md exceeds limit

### Consolidation Frequency
- Check quality every session
- Consolidate every **~15 sessions**
- Archive superseded decisions when DECISIONS.md full

## 🎯 Benefits

1. **Compounding Knowledge** - Each session has full context from all previous sessions
2. **Decision Traceability** - Know WHY choices were made, not just WHAT
3. **Avoid Repeated Mistakes** - Document bugs/gotchas once
4. **Consistent Code Style** - Clear conventions for all code
5. **Faster Onboarding** - New sessions start with complete context
6. **Historical Record** - Archive maintains project evolution

## 📝 Example Session Update

```bash
# At end of session
git add CLAUDE.md .claude/
git commit -m "docs: session 2 context update - added symptom filtering"
git push
```

## 🔍 Finding Information

- **Need to know WHY a decision was made?** → `DECISIONS.md`
- **Encountered a bug?** → Check `LEARNINGS.md` first
- **How to style a component?** → `CONVENTIONS.md`
- **What was done last session?** → `../CLAUDE.md` Recent Work
- **What to work on next?** → `../CLAUDE.md` Next Priorities

---

**Maintained by:** Claude Code sessions
**Last Updated:** Session 1 (2026-01-03)
