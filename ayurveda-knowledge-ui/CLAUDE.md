# Claude Code Context Memory
**Project:** Ayurveda Knowledge Portal
**Session Counter:** 1
**Last Updated:** 2026-01-03
**Next Consolidation:** Session 15

---

## 🚀 START SESSION CHECKLIST
- [ ] Read this CLAUDE.md file completely
- [ ] Review `.claude/DECISIONS.md` for architecture context
- [ ] Review `.claude/LEARNINGS.md` for known issues
- [ ] Review `.claude/CONVENTIONS.md` for code style
- [ ] Check "Next Priorities" section below
- [ ] Run `npm run dev` to verify environment

## 🏁 END SESSION CHECKLIST
- [ ] Increment session counter
- [ ] Update "Recent Work" with session summary
- [ ] Update `.claude/DECISIONS.md` if architecture decisions made
- [ ] Update `.claude/LEARNINGS.md` if bugs fixed or gotchas found
- [ ] Update `.claude/CONVENTIONS.md` if new patterns established
- [ ] Update "Next Priorities" section
- [ ] Update "Known Issues" if any discovered
- [ ] Commit context updates with message: "docs: session N context update"
- [ ] Push to repository

---

## 📋 PROJECT OVERVIEW

### Purpose
**Bridging ancient Charaka Samhita wisdom with modern digital-age mental health challenges.**

Making 5,000-year-old Ayurvedic knowledge relevant for screen addiction, sensory overload, mental health crises, and disconnection from natural rhythms. Not generic wellness advice, but deep authentic sutras directly addressing modern suffering.

**Core Question:** "Is your current way of living producing sukha (happiness) or duḥkha (suffering)?"

**See `.claude/VISION.md` for complete strategic direction.**

### Tech Stack
- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Custom Properties
- **State:** React useState hooks + localStorage
- **Deployment:** Vercel
- **Live URL:** https://ayurveda-knowledge-ui.vercel.app

### Key Features
1. **Quick Fix Guide** - 6 instant solution paths for common issues (stress, sleep, digestion, etc.)
2. **Dosha Assessment** - Quiz to determine Vata/Pitta/Kapha constitution
3. **Symptom Collection** - Enhanced dosha quiz with symptom tracking
4. **Personalized Daily Plan** - Custom schedule based on dosha + symptoms
5. **Blog/Knowledge Browser** - Educational content from ancient texts
6. **Body Diagram** - Interactive health visualization
7. **AI Chat Interface** - Personalized advice (placeholder)
8. **Bookmarks** - Save favorite content

### Architecture
```
src/
├── app/              # Next.js App Router pages
├── components/       # React components (all client-side)
├── data/            # Static data (manuscripts, blogs, symptoms)
├── services/        # Business logic (AI, bookmarks)
└── types/           # TypeScript definitions

Key files:
- src/app/page.tsx - Main layout with tab navigation
- src/components/QuickStart.tsx - Quick fix feature
- src/components/DoshaAssessment.tsx - Quiz + symptom collection
- src/components/PersonalizedPlan.tsx - Daily schedule generator
```

### Design System
- **Color Palette:** Earth tones (olive, gold, copper, deep brown)
- **Theme:** Parchment/ancient manuscript aesthetic
- **Icons:** Lucide React + custom SVG (Om symbol, Chakra)
- **Responsive:** Mobile-first with sidebar navigation

---

## 📝 RECENT WORK (Last 5-7 Sessions)

### Session 1 (2026-01-03) - Initial Setup + Quick Fix Feature
**Work Completed:**
- Fixed orange color inconsistencies → replaced with olive/green theme across PersonalizedPlan, page.tsx, SymptomChecker
- Fixed harsh red/green colors in DoshaAssessment → replaced with bordered boxes and subtle colors
- Fixed text visibility issues → increased contrast with solid backgrounds
- Added symptom collection to DoshaAssessment (intermediate screen after quiz questions)
- Created QuickStart component with 6 instant solution paths for users with short attention spans
- Created DEPLOYMENT.md with Render deployment instructions
- Fixed multiple JSX syntax errors (apostrophes, greater-than symbols)
- Deployed to Vercel successfully

**Files Modified:**
- src/components/PersonalizedPlan.tsx (color fixes)
- src/app/page.tsx (disclaimer colors, QuickStart integration)
- src/components/SymptomChecker.tsx (disclaimer colors)
- src/components/DoshaAssessment.tsx (colors + symptom collection)
- src/components/QuickStart.tsx (new file - syntax fixes)
- DEPLOYMENT.md (new file)

**Bugs Fixed:**
- Apostrophe syntax errors in string literals (changed to double quotes)
- Greater-than symbol JSX error (changed to `&gt;`)
- Orange warning colors causing poor UX
- Invisible "when balanced" text in dosha results
- Next.js cache issues (resolved with `rm -rf .next`)

---

## 🎯 NEXT PRIORITIES

### High Priority - Core Concepts Integration
1. **Expand manuscripts database** - Add 8 core Charaka Samhita concepts:
   - Prajñāparādha (crimes against wisdom)
   - Asātmyendriyārtha saṃyoga (unwholesome sensory contact)
   - Manas/mental qualities (sattva/rajas/tamas)
   - Ojas (vital essence) building and depletion
   - Dinacarya (daily routine) detailed
   - Sadvṛtta (right conduct / digital ethics)
   - Ṛtucaryā (seasonal living)
   - Indriya management (sensory hygiene)

2. **Connect QuickStart paths to sutras** - Link each quick fix to relevant Charaka Samhita teaching
3. **Digital-age assessment** - Add quiz identifying atiyoga/ayoga/mithyāyoga patterns
4. **Prajñāparādha tracker** - Help users recognize "I know this hurts me but I do it anyway" patterns

### Medium Priority - Practical Application
1. **Screen time guidelines** - Based on sensory overload framework
2. **Ojas-building tracker** - Monitor vitality-building vs. depleting activities
3. **Sattva-increasing practices** - Recommendations to reduce mental agitation
4. **Integrate symptoms into PersonalizedPlan** - Use collected symptoms for customization
5. **Seasonal variations** - Add ṛtucaryā to daily plans

### Low Priority - Enhancement
1. **AI Chat with sutra integration** - Connect digital problems to specific Charaka Samhita verses
2. **Mobile responsiveness audit** - Test all components
3. **Custom domain** - ayurveda-for-digital-life.vercel.app or similar
4. **SEO with strategic keywords** - "digital detox ayurveda", "screen addiction ancient wisdom", etc.

---

## ⚠️ KNOWN ISSUES

### Critical
None

### Important
1. **Symptom data not yet used in PersonalizedPlan** - Currently stored in localStorage but not consumed
2. **Dev server cache issues** - Sometimes requires `rm -rf .next` to see changes

### Minor
1. **Multiple background dev servers** - Several zombie processes from previous sessions (6a5eca, 146eeb, cfdf5d, d3d422, 6ad563)
2. **Git authorship warnings** - Need to configure git user globally
3. **Cannot push to GitHub** - HTTPS authentication issue (not blocking Vercel deployment)

### Documentation Needed
1. API integration guide for AI chat
2. Contributing guidelines
3. Component library documentation

---

## 📊 PROJECT STATS

**Lines of Code:** ~14,208 insertions (45 files)
**Components:** 16 React components
**Pages:** 1 main page with 9 tab views
**Data Files:** 3 (manuscripts, blogs, symptoms)
**Deployment Status:** ✅ Live on Vercel
**Build Time:** ~40 seconds
**Build Status:** ✅ Passing

---

## 🔗 QUICK LINKS

- **Live Site:** https://ayurveda-knowledge-ui.vercel.app
- **Localhost:** http://localhost:3000
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Repository:** https://github.com/atalovesyou/claude-skills-pack
- **Project Path:** `/Users/shiviagarwal/Desktop/ClaudeCode/claude-skills-pack/ayurveda-knowledge-ui`

---

## 📚 REFERENCE

### Important Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run linting
vercel --prod --yes  # Deploy to production
rm -rf .next         # Clear build cache
```

### Color Variables (from globals.css)
```css
--accent-primary: #9EBF88    /* Lime/olive green */
--accent-secondary: #D4A574  /* Gold */
--accent-tertiary: #B87333   /* Copper */
--olive: #6B8E23             /* Dark olive */
--gold: #DAA520              /* Rich gold */
```

---

**Total Lines:** 187 / 400 limit
