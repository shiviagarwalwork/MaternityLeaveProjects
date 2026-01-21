# RAG (Retrieval-Augmented Generation) Documentation

## What is RAG?

RAG is a technique that makes AI responses more accurate and cost-effective by:
1. **Retrieving** relevant information from a knowledge base
2. **Augmenting** the AI prompt with that specific information
3. **Generating** a response based on the retrieved context

Think of it like this: Instead of asking someone to memorize an entire encyclopedia, you give them the specific pages they need to answer a question.

---

## Why RAG vs. Direct API Calls?

### Without RAG (Expensive)
```
User asks: "How to treat headaches?"

→ Send ENTIRE Charaka Samhita (1000+ pages) to Claude
→ Claude reads everything, finds relevant parts, responds
→ Cost: $0.50 - $2.00 per query (massive token count)
→ Slow: 30-60 seconds response time
```

### With RAG (Cheap)
```
User asks: "How to treat headaches?"

→ Search vector database for "headache" related chunks
→ Retrieve only 3-5 relevant paragraphs (500-1000 tokens)
→ Send ONLY those paragraphs to Claude
→ Cost: $0.001 - $0.01 per query
→ Fast: 2-5 seconds response time
```

### Pre-computed (FREE)
```
User asks: "How to treat headaches?"

→ Look up pre-generated response from JSON file
→ Cost: $0.00
→ Instant response
```

---

## How RAG Works - Step by Step

### Step 1: Document Preparation (One-time)

```
Original Document (Charaka Samhita PDF)
         ↓
    Extract Text
         ↓
    Split into Chunks (500-1000 tokens each)
         ↓
    [Chunk 1] [Chunk 2] [Chunk 3] ... [Chunk N]
```

**Example Chunks:**
- Chunk 1: "Shiroroga (Head Diseases) - Chapter 26..."
- Chunk 2: "Pittaja Shirahshula occurs due to excess heat..."
- Chunk 3: "Treatment includes application of cooling oils..."

### Step 2: Create Embeddings (One-time)

Embeddings are numerical representations of text that capture meaning.

```
[Chunk 1: "Shiroroga..."] → [0.023, -0.156, 0.892, ...]  (1536 numbers)
[Chunk 2: "Pittaja..."]   → [0.045, -0.234, 0.567, ...]  (1536 numbers)
[Chunk 3: "Treatment..."] → [0.012, -0.189, 0.234, ...]  (1536 numbers)
```

Similar concepts have similar numbers, so "headache" and "shirahshula" will have similar embeddings.

### Step 3: Store in Vector Database

```
┌─────────────────────────────────────────────────┐
│           Vector Database (e.g., Pinecone)       │
│                                                  │
│  ID: 1  │ Text: "Shiroroga..."  │ Vector: [...]  │
│  ID: 2  │ Text: "Pittaja..."    │ Vector: [...]  │
│  ID: 3  │ Text: "Treatment..."  │ Vector: [...]  │
│  ...    │ ...                   │ ...            │
└─────────────────────────────────────────────────┘
```

### Step 4: Query Time (Per User Request)

```
User Query: "I have a headache, what should I do?"
                    ↓
         Create embedding for query
                    ↓
         [0.034, -0.178, 0.845, ...]
                    ↓
         Search vector DB for similar vectors
                    ↓
         Top 3 matches:
         - Chunk 47: "Shirahshula (headache) treatment..."
         - Chunk 52: "For Pittaja headache, apply cooling..."
         - Chunk 89: "Brahmi oil massage for head pain..."
                    ↓
         Send to Claude with context:
         "Based on these Charaka Samhita excerpts:
          [Chunk 47] [Chunk 52] [Chunk 89]
          Answer: How to treat headache?"
                    ↓
         Claude generates response with citations
```

---

## Our Approach: Hybrid (Pre-computed + RAG)

For AyuVed, we use a **hybrid approach**:

### Tier 1: Pre-computed Responses (FREE)
For the 23 common symptoms, we:
1. Manually find relevant Charaka Samhita passages
2. Generate responses ONCE using Claude
3. Store as static JSON
4. Serve instantly with zero API cost

**Best for:** Common symptoms (stress, headache, digestion, etc.)

### Tier 2: RAG for Custom Queries (CHEAP)
For unusual or specific questions:
1. Use vector search to find relevant passages
2. Send only those passages to Claude
3. Generate personalized response

**Best for:** Specific questions like "I have Vata constitution with joint pain in winter"

### Tier 3: Full AI Consultation (MODERATE)
For complex consultations:
1. Use Claude with full context
2. Multi-turn conversation
3. Personalized treatment plans

**Best for:** Premium users, detailed consultations

---

## Cost Comparison

| Approach | Cost per Query | Best For |
|----------|---------------|----------|
| Pre-computed JSON | $0.00 | Common symptoms (23 quick fixes) |
| RAG with small context | $0.001-0.01 | Specific questions |
| Full Claude API | $0.10-0.50 | Complex consultations |

**Monthly cost estimate (10,000 users, 5 queries each):**
- Without optimization: $2,500 - $25,000
- With RAG: $50 - $500
- With pre-computed: $0 for common queries

---

## Vector Database Options

### Free/Cheap Options:
1. **ChromaDB** (Local, free) - Good for testing
2. **Supabase pgvector** (Free tier available) - Good for production
3. **Pinecone** (Free tier: 1 index) - Industry standard

### For AyuVed:
We recommend **Supabase pgvector** because:
- Free tier sufficient for MVP
- Already a PostgreSQL database (familiar)
- Easy to integrate with existing backend
- Scales well

---

## Files Structure for Pre-computed Approach

```
src/data/
├── charakaSutras.ts       # Raw sutra extracts from PDF
├── symptomMappings.ts     # Maps symptoms to relevant sutras
└── manuscriptResponses.ts # Pre-generated AI responses

Example:
{
  "headache": {
    "sutras": [
      {
        "reference": "Charaka Samhita, Chikitsa Sthana, Ch. 26, Verse 15",
        "sanskrit": "शिरोरोगाणां...",
        "english": "Among head diseases...",
        "context": "Classification of headaches"
      }
    ],
    "ayurvedicName": "Shirahshula",
    "causes": ["Vata aggravation", "Pitta excess", "Kapha accumulation"],
    "remedies": [...],
    "response": "According to Charaka Samhita..."
  }
}
```

---

## Implementation Steps

### Phase 1: Pre-computed (Current)
1. ✅ Extract relevant passages from Charaka Samhita PDF
2. ✅ Map to 23 symptoms in Quick Fix
3. ✅ Generate manuscript-backed responses
4. ✅ Store as static JSON
5. ✅ Update Quick Fix to show sutra references

### Phase 2: RAG System (Future)
1. Set up Supabase with pgvector
2. Process entire PDF into chunks
3. Create embeddings for all chunks
4. Build search API endpoint
5. Integrate with mobile app

### Phase 3: AI Consultation (Future)
1. Build conversation memory
2. Add user health profile context
3. Premium feature with usage limits

---

## Security Considerations

1. **API Keys**: Never expose in frontend code
2. **Rate Limiting**: Prevent abuse of AI endpoints
3. **Content Filtering**: Ensure responses include medical disclaimers
4. **Data Privacy**: Don't store personal health data unnecessarily

---

## Summary

**What we're doing now:**
- Reading Charaka Samhita PDF
- Extracting relevant sutras for each symptom
- Pre-computing responses (one-time Claude cost)
- Storing as static JSON (zero ongoing cost)

**Result:**
- Users get authentic, manuscript-backed advice
- Zero API cost for common queries
- App/website stays lightweight
- Can scale to millions of users at minimal cost

---

*Document created: January 2026*
*Project: AyuVed - Ancient Wisdom, Modern Wellness*
