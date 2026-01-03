# Architecture Decision Records (ADRs)

This file documents WHY key technical decisions were made, not just WHAT was implemented.

---

## ADR-001: Color Palette - Earth Tones Over Modern Bright Colors
**Date:** 2026-01-03
**Status:** Accepted

### Context
Initial implementation used orange/warning colors for disclaimers and info sections. Also used bright red/green for balanced/imbalanced states in dosha results.

### Decision
Replaced all orange with olive/green gradients. Replaced red/green text with bordered boxes using lime (accent-primary) and gold (accent-secondary) borders.

### Rationale
- Orange looked "weird" and out of place (user feedback)
- Red text was "very sharp" and hard to read (user feedback)
- Ancient manuscript theme requires muted, earthy tones
- Better accessibility with higher contrast bordered boxes vs colored text
- Consistent with overall parchment/traditional aesthetic

### Consequences
- More cohesive visual design
- Better readability
- Improved user satisfaction
- Need to maintain color consistency in all future components

### Implementation
```css
/* Before */
bg-gradient-to-r from-[var(--warning)] to-[var(--accent-secondary)]
text-[var(--success)] / text-[var(--error)]

/* After */
bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)]
border-[var(--accent-primary)] / border-[var(--accent-secondary)]
```

---

## ADR-002: Symptom Collection in Dosha Assessment
**Date:** 2026-01-03
**Status:** Accepted

### Context
Original dosha quiz only asked constitutional questions. Didn't account for current health issues like migraines, stomach problems, etc.

### Decision
Added intermediate symptom selection screen after dosha quiz questions, before showing results. Store symptoms in localStorage.

### Rationale
- "Should be much more personalized instead of just depending on dosha" (user request)
- Dosha shows baseline constitution, symptoms show current imbalances
- Combination provides more accurate recommendations
- localStorage allows PersonalizedPlan to access symptom data
- Non-blocking UX - symptoms are optional

### Consequences
- More comprehensive health assessment
- Better personalization potential
- Need to integrate symptoms into PersonalizedPlan recommendations
- localStorage dependency (cleared when user clears browser data)

### Implementation
```typescript
// Store symptoms
localStorage.setItem('userSymptoms', JSON.stringify(selectedSymptoms));

// Retrieve in other components
const symptoms = JSON.parse(localStorage.getItem('userSymptoms') || '[]');
```

---

## ADR-003: QuickStart Component for Short Attention Spans
**Date:** 2026-01-03
**Status:** Accepted

### Context
User requested "features for people with less attention span" - not everyone wants to read long educational content or take full dosha quiz.

### Decision
Created QuickStart component with 6 pre-built "paths" for common issues:
1. I'm Stressed AF
2. Always Tired
3. Digestion is Trash
4. Can't Sleep
5. Weight Won't Budge
6. Headaches/Migraines

Each path has 4 actionable steps with emoji icons and "why this works" explanations.

### Rationale
- Modern users want instant solutions (1-2 min time commitment)
- Decision fatigue - sometimes people just want to be told what to do
- Lower barrier to entry than full dosha assessment
- Still educates on Ayurvedic principles (explains doshas in each path)
- Complements rather than replaces deeper features

### Consequences
- More accessible to casual users
- Increased engagement potential
- Need to ensure medical disclaimers are visible
- Should track which paths are most popular

### Design Choices
- 2-column grid layout (mobile: 1 column)
- Emoji for instant recognition
- Direct, casual language ("I'm Stressed AF" vs "Stress Management")
- Time estimate shown upfront (builds trust)

---

## ADR-004: Client-Side Only Architecture (No Backend)
**Date:** 2026-01-03
**Status:** Accepted (Implicit)

### Context
Entire app uses `'use client'` directive. No API routes or server components beyond Next.js defaults.

### Decision
Pure client-side architecture with:
- localStorage for persistence
- Static data files in `/src/data`
- Vercel for static hosting
- Placeholder AI service (no real backend calls)

### Rationale
- Faster initial development
- No database costs
- Simpler deployment (static site)
- No authentication needed
- Educational content is static
- User data privacy (everything stays in browser)

### Consequences
- **Pros:**
  - Zero backend maintenance
  - Free hosting tier
  - Fast page loads
  - No user accounts needed

- **Cons:**
  - AI chat feature requires future backend integration
  - Data cleared when user clears browser
  - Can't sync across devices
  - Limited analytics capabilities
  - No server-side validation

### Future Considerations
When adding real AI chat:
- Option 1: Serverless functions (Vercel Edge Functions)
- Option 2: External API (OpenAI, Anthropic)
- Option 3: Keep client-side with API key (not recommended for production)

---

## ADR-005: JSX String Escaping - Double Quotes for Apostrophes
**Date:** 2026-01-03
**Status:** Accepted

### Context
JSX parsing errors when using single quotes with apostrophes:
```tsx
title: 'I'm Stressed AF'  // ❌ Parse error
title: 'Can't Sleep'      // ❌ Parse error
```

### Decision
Use double quotes for all strings containing apostrophes. Escape greater-than symbols with HTML entities.

### Rationale
- JavaScript/JSX parser treats `'I'm...'` as `'I' + m...` (syntax error)
- Double quotes allow apostrophes without escaping
- `&gt;` for `>` prevents JSX thinking it's closing tag
- More readable than escape sequences (`\'`)

### Consequences
- Coding convention: Use double quotes when string contains apostrophe
- Use HTML entities for `<`, `>`, `&` in text content
- Next.js Turbopack cache sometimes requires `rm -rf .next` to see fixes

### Examples
```tsx
// ✅ Correct
title: "I'm Stressed AF"
title: "Can't Sleep"
<p>Consistency &gt; perfection</p>

// ❌ Incorrect
title: 'I\'m Stressed AF'  // Works but less readable
title: 'Can't Sleep'       // Syntax error
<p>Consistency > perfection</p>  // Parse error
```

---

**Total Lines:** 178 / 200 limit
