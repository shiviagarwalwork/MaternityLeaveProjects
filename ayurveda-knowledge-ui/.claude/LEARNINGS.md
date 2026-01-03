# Bugs Fixed & Gotchas Discovered

This file documents specific bugs encountered and lessons learned during development.

---

## 🐛 Bug Fixes

### BUG-001: Apostrophe Syntax Errors in JSX
**Date:** 2026-01-03
**Component:** QuickStart.tsx
**Severity:** Critical (blocks compilation)

**Issue:**
```tsx
title: 'Can't Sleep'
// Error: Expected ',', got 't'
```

**Root Cause:**
JSX parser interprets single-quoted string with apostrophe as:
`'Can' + t Sleep'` - treating apostrophe as string terminator.

**Solution:**
```tsx
// Use double quotes for strings with apostrophes
title: "Can't Sleep"
title: "I'm Stressed AF"
title: "Weight Won't Budge"
```

**Lesson:** Always use double quotes when string contains apostrophes in JSX. More readable than escape sequences.

---

### BUG-002: Greater-Than Symbol Parse Error
**Date:** 2026-01-03
**Component:** QuickStart.tsx (line 139)
**Severity:** Critical (blocks compilation)

**Issue:**
```tsx
<p>Consistency > perfection</p>
// Error: Unexpected token. Did you mean `{'>'}` or `&gt;`?
```

**Root Cause:**
JSX parser thinks `>` is closing a tag instead of text content.

**Solution:**
```tsx
// Use HTML entity
<p>Consistency &gt; perfection</p>

// Or use expression
<p>Consistency {'>'} perfection</p>
```

**Lesson:** Always escape `<`, `>`, `&` in JSX text with HTML entities or expressions.

---

### BUG-003: Next.js Build Cache Serving Stale Code
**Date:** 2026-01-03
**Environment:** Development (npm run dev)
**Severity:** Major (misleading errors)

**Issue:**
After fixing syntax errors in source files, dev server continued showing old error messages from before the fix.

**Root Cause:**
Next.js Turbopack caches compiled modules in `.next/` directory. Sometimes fails to detect file changes.

**Solution:**
```bash
# Kill dev server
# Clear build cache
rm -rf .next
# Restart dev server
npm run dev
```

**Lesson:** When seeing stale errors after confirmed fixes, always clear `.next/` directory. This is especially common with:
- JSX syntax errors
- TypeScript type changes
- CSS module updates

**Prevention:**
Add to package.json scripts:
```json
"dev:clean": "rm -rf .next && next dev"
```

---

### BUG-004: Orange Color Contrast Issues
**Date:** 2026-01-03
**Components:** PersonalizedPlan.tsx, page.tsx, SymptomChecker.tsx
**Severity:** Minor (UX issue)

**Issue:**
User reported orange backgrounds and disclaimer colors looked "weird" and out of place.

**Root Cause:**
Used `var(--warning)` color (orange) for info sections and disclaimers. Didn't match earth-tone theme.

**Solution:**
Replaced all orange with olive/green gradients:
```tsx
// Before
bg-gradient-to-r from-[var(--warning)] to-[var(--accent-secondary)]

// After
bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)]
```

**Lesson:** Color consistency is crucial for thematic coherence. Test color combinations against overall design language early.

---

### BUG-005: Invisible "When Balanced" Text
**Date:** 2026-01-03
**Component:** DoshaAssessment.tsx
**Severity:** Major (content not visible)

**Issue:**
User reported "when balanced is still not visible at all" in dosha results.

**Root Cause:**
Used colored text on colored background with insufficient contrast:
```tsx
<p className="text-[var(--success)]">When balanced: ...</p>
```

**Solution:**
Changed from colored text to bordered boxes with solid backgrounds:
```tsx
<div className="bg-[var(--card-bg)] p-4 rounded-lg border-2 border-[var(--accent-primary)]">
  <p className="text-[var(--foreground)] font-medium">
    <span className="text-[var(--accent-primary)] mr-2">✓</span>
    {description.balance}
  </p>
</div>
```

**Lesson:**
- Never rely on colored text alone for visibility
- Use borders, backgrounds, and icons for visual hierarchy
- Test on different screens/brightness levels
- High contrast text (`text-[var(--foreground)]`) on solid backgrounds

---

## 💡 Gotchas & Best Practices

### GOTCHA-001: Multiple Background Dev Servers
**Date:** 2026-01-03
**Impact:** Resource usage, port conflicts

**Issue:**
Multiple `npm run dev` processes running in background from previous debugging sessions:
- Shell IDs: 6a5eca, 146eeb, cfdf5d, d3d422, 6ad563

**Best Practice:**
Always kill previous dev server before starting new one:
```bash
# Check running processes
lsof -ti:3000

# Kill process on port 3000
kill -9 $(lsof -ti:3000)

# Or use shell ID
KillShell <shell_id>
```

---

### GOTCHA-002: localStorage Cleared on Browser Reset
**Date:** 2026-01-03
**Impact:** User data loss

**Issue:**
Symptom data and dosha results stored in localStorage. Cleared when user:
- Clears browser data
- Uses incognito mode
- Switches devices

**Best Practice:**
- Add "Export Results" button to download as JSON
- Add disclaimer about data persistence
- Consider adding "Share Results" feature (URL params)
- Future: Add optional account/cloud sync

---

### GOTCHA-003: Vercel Preview URLs Require Auth
**Date:** 2026-01-03
**Impact:** Confusion about public accessibility

**Issue:**
Deployment preview URLs (like `ayurveda-knowledge-nr1hu9cqn-...`) require Vercel login.
Only production URLs (`*.vercel.app`) are publicly accessible.

**Best Practice:**
Always use `vercel alias ls` to find public production URLs:
- `ayurveda-knowledge-ui.vercel.app` ✅ Public
- `ayurveda-knowledge-nr1hu9cqn-...` ❌ Private preview

---

### GOTCHA-004: Git Push Requires Authentication Setup
**Date:** 2026-01-03
**Impact:** Cannot push to GitHub directly

**Issue:**
```
fatal: could not read Username for 'https://github.com': Device not configured
```

**Root Cause:**
HTTPS remote URL requires credential helper or SSH keys.

**Best Practice:**
For this project, Vercel deployment works independently from git push. Push isn't blocking.

If needed:
```bash
# Switch to SSH
git remote set-url origin git@github.com:atalovesyou/claude-skills-pack.git

# Or configure credential helper
git config --global credential.helper osxkeychain
```

---

## 🎯 Performance Learnings

### PERF-001: Turbopack Build Speed
**Observation:** Initial compile ~1.5s, subsequent compiles ~100-200ms
**Recommendation:** Use Turbopack for dev (already default in Next.js 16)

### PERF-002: Vercel Deployment Speed
**Observation:** Full build + deploy ~40 seconds
**Recommendation:** Good baseline. Monitor as app grows.

---

**Total Lines:** 199 / 300 limit
