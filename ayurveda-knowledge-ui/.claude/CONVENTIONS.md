# Code Conventions & Style Guide

This file documents project-specific patterns, naming conventions, and code style rules.

---

## 🎨 Component Patterns

### Client Components
**Rule:** All components use `'use client'` directive (client-side only architecture)

```tsx
'use client';

import { useState } from 'react';
import { Icon } from 'lucide-react';

export default function ComponentName() {
  // Component logic
}
```

**Rationale:** No server-side features needed currently. Simpler architecture.

---

### State Management Pattern
**Rule:** Use React useState + localStorage for persistence

```tsx
// Read from localStorage with fallback
const [data, setData] = useState<Type>(() => {
  const stored = localStorage.getItem('key');
  return stored ? JSON.parse(stored) : defaultValue;
});

// Write to localStorage
useEffect(() => {
  localStorage.setItem('key', JSON.stringify(data));
}, [data]);

// Or immediate write
const saveData = (newData: Type) => {
  localStorage.setItem('key', JSON.stringify(newData));
  setData(newData);
};
```

**LocalStorage Keys:**
- `userSymptoms` - Array of symptom names from DoshaAssessment
- `bookmarks` - Array of bookmarked items
- Future: `doshaResults`, `userPreferences`

---

### Tab Navigation Pattern
**Rule:** Main page.tsx manages active tab state, components are swapped via conditional rendering

```tsx
type Tab = 'home' | 'quick' | 'chat' | 'symptoms' | 'body' | 'dosha' | 'plan' | 'browser' | 'bookmarks';

const [activeTab, setActiveTab] = useState<Tab>('home');

{activeTab === 'quick' && <QuickStart />}
{activeTab === 'dosha' && <DoshaAssessment />}
```

**Rationale:** Simple, no routing needed, preserves scroll position on tab change.

---

## 🎨 Styling Conventions

### CSS Custom Properties (Required)
**Rule:** Always use CSS variables, never hardcoded colors

```tsx
// ✅ Correct
className="text-[var(--foreground)] bg-[var(--card-bg)]"

// ❌ Wrong
className="text-gray-800 bg-white"
```

**Available Variables:**
```css
/* Primary Colors */
--foreground: #2C1810          /* Dark brown text */
--background: #F5E6D3          /* Parchment */
--card-bg: #FAF0E6            /* Light parchment */
--card-bg-light: #FFF8E7      /* Lighter parchment */

/* Accent Colors */
--accent-primary: #9EBF88     /* Lime/olive */
--accent-secondary: #D4A574   /* Gold */
--accent-tertiary: #B87333    /* Copper */
--olive: #6B8E23              /* Dark olive */
--olive-light: rgba(158, 191, 136, 0.2)
--gold: #DAA520               /* Rich gold */
--bright-gold: #FFD700        /* Bright gold */

/* Semantic Colors */
--border-color: rgba(139, 90, 43, 0.2)
--text-muted: #8B7355
--success: #6B8E23
--warning: #FF8C00            /* Avoid using - use olive instead */
--error: #DC143C              /* Avoid using */

/* Special */
--deep-brown: #3E2723
--copper: #B87333
--purple: #9B59B6
```

---

### Gradient Pattern
**Rule:** Use `bg-gradient-to-br` (bottom-right) for subtle depth

```tsx
// Standard info box
className="bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)] bg-opacity-30"

// Accent highlight
className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)]"

// Button
className="bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--gold)]"
```

---

### Border Pattern
**Rule:** Use `border-2` with accent colors for emphasis

```tsx
// Primary emphasis
border-2 border-[var(--accent-primary)]

// Secondary emphasis
border-2 border-[var(--accent-secondary)]

// Subtle border
border border-[var(--border-color)]
```

---

### Spacing Pattern
**Rule:** Consistent padding/margin scale

```tsx
// Card containers
className="p-6"          // 1.5rem = 24px

// Sections within cards
className="p-4"          // 1rem = 16px

// Small elements
className="p-3"          // 0.75rem = 12px

// Gap between elements
className="gap-3"        // Grid/flex gaps
className="space-y-4"    // Vertical spacing
```

---

## 📝 TypeScript Conventions

### Type Definitions Location
**Rule:** Complex types in `src/types/index.ts`, inline types for component-specific

```tsx
// src/types/index.ts - Shared types
export interface DoshaResult {
  vata: number;
  pitta: number;
  kapha: number;
  dominant: 'vata' | 'pitta' | 'kapha';
}

// Component file - Simple local types
type Tab = 'home' | 'quick' | 'chat';
```

---

### Props Pattern
**Rule:** Define inline for simple components, separate interface for complex

```tsx
// Simple
export default function SimpleComponent({ title, count }: { title: string; count: number }) {
  // ...
}

// Complex
interface ComplexComponentProps {
  user: User;
  onSubmit: (data: FormData) => void;
  className?: string;
}

export default function ComplexComponent({ user, onSubmit, className }: ComplexComponentProps) {
  // ...
}
```

---

## 📁 File Organization

### Component Structure
```tsx
'use client';

// 1. External imports
import { useState } from 'react';
import { Icon } from 'lucide-react';

// 2. Internal imports
import { Type } from '@/types';
import { service } from '@/services/service';

// 3. Type definitions
interface Props {
  // ...
}

// 4. Component
export default function ComponentName({ props }: Props) {
  // 4a. State
  const [state, setState] = useState();

  // 4b. Helper functions
  const handleAction = () => {};

  // 4c. Conditional rendering logic
  if (condition) return <EarlyReturn />;

  // 4d. Main render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

---

### Data Files Pattern
**Rule:** Export as constants, use clear naming

```tsx
// src/data/symptoms.ts
export const symptoms: Symptom[] = [
  { id: 'headache', name: 'Headache', category: 'Physical', doshas: ['pitta'] },
  // ...
];

export const doshaQuestions: Question[] = [
  { id: 'q1', question: '...', options: [...] },
  // ...
];
```

---

## 🎭 Icon Usage

### Lucide React Icons
**Rule:** Import specific icons, use consistent sizing

```tsx
import { Zap, Clock, Target, AlertCircle } from 'lucide-react';

// Standard size (20px)
<Icon className="w-5 h-5" />

// Small (16px)
<Icon className="w-4 h-4" />

// Large (24px)
<Icon className="w-6 h-6" />

// With color
<Icon className="w-5 h-5 text-[var(--accent-primary)]" />
```

---

### Custom SVG Components
**Rule:** Encapsulate in components with size prop

```tsx
// OmSymbol.tsx
interface OmSymbolProps {
  className?: string;
  size?: number;
}

export default function OmSymbol({ className = '', size = 40 }: OmSymbolProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      {/* SVG content */}
    </svg>
  );
}

// Usage
<OmSymbol size={60} className="text-[var(--accent-primary)]" />
```

---

## 📱 Responsive Design

### Mobile-First Classes
**Rule:** Base classes for mobile, `md:` prefix for desktop

```tsx
// Grid: 1 col mobile, 2 cols tablet, 3 cols desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Text: smaller on mobile
className="text-sm md:text-lg"

// Flex direction
className="flex flex-col md:flex-row"

// Hide on mobile
className="hidden md:block"
```

---

## 🎨 Animation Conventions

### Hover Effects
**Rule:** Use `transition-all` with subtle transforms

```tsx
// Scale on hover
className="transition-all hover:scale-105"

// Opacity change
className="hover:opacity-90 transition-opacity"

// Border color change
className="border-2 border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all"

// Translate
className="group-hover:translate-x-2 transition-transform"
```

---

## 🔤 String Handling in JSX

### Apostrophes and Special Characters
**Rule:** Use double quotes for strings with apostrophes, HTML entities for symbols

```tsx
// ✅ Correct
title: "I'm Stressed AF"
title: "Can't Sleep"
<p>Consistency &gt; perfection</p>
<p>&copy; 2024 Company</p>

// ❌ Wrong
title: 'I\'m Stressed AF'  // Less readable
title: 'Can't Sleep'       // Syntax error
<p>Consistency > perfection</p>  // Parse error
```

**Common Entities:**
- `&gt;` for `>`
- `&lt;` for `<`
- `&amp;` for `&`
- `&copy;` for ©
- `&trade;` for ™

---

## 🧪 Testing Checklist (Manual)

Before committing:
- [ ] Test on mobile viewport (Chrome DevTools)
- [ ] Test all tab navigation
- [ ] Clear localStorage and test fresh user flow
- [ ] Check color contrast (all text readable)
- [ ] Verify no console errors
- [ ] Test with different dosha quiz results
- [ ] Clear `.next` and rebuild to verify no cache issues

---

**Total Lines:** 295 / 400 limit
