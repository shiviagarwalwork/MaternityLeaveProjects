# Ayurveda Knowledge Portal - Usage Guide

## 🚀 Quick Start

The application is now running at: **http://localhost:3000**

## 📱 Features Overview

### 1. AI Health Advisor (Chat Interface)
**Location:** First tab (default view)

**How to use:**
- Type your health question in the input box
- Ask about symptoms, remedies, or general wellness
- The AI will respond with information from Ayurvedic texts
- Each response includes source citations from manuscripts
- Click "Bookmark" to save helpful responses

**Example queries:**
- "I have indigestion, what should I do?"
- "How can I reduce stress naturally?"
- "What herbs help with joint pain?"
- "I can't sleep well at night"

### 2. Symptom Checker
**Location:** Second tab (Symptoms)

**How to use:**
- Search for symptoms using the search bar
- Click on symptoms to select them (you can select multiple)
- Click "Get Ayurvedic Recommendations"
- View personalized recommendations with source citations
- See agreement levels across different manuscripts

### 3. Interactive Body Map
**Location:** Third tab (Body Map)

**How to use:**
- Click on any body part in the diagram
- View common health concerns for that area
- Click "Get Remedies" to see Ayurvedic solutions
- Different colors indicate different body parts

### 4. Dosha Assessment
**Location:** Fourth tab (Dosha Test)

**How to use:**
- Answer 8 questions about your body and mind
- Each question has 3 options (one for each dosha)
- View your results showing Vata, Pitta, and Kapha percentages
- Get personalized recommendations based on your dominant dosha
- Retake the test anytime

**What are Doshas?**
- **Vata** (Air & Space): Creative, energetic, quick-thinking
- **Pitta** (Fire & Water): Intelligent, focused, driven
- **Kapha** (Earth & Water): Calm, stable, compassionate

### 5. Manuscript Browser
**Location:** Fifth tab (Manuscripts)

**How to use:**
- Browse all available Ayurvedic manuscripts
- Filter by category (Digestion, Mental Health, Pain Management, etc.)
- Use search to find specific topics or keywords
- Click any manuscript to view full details
- Toggle Sanskrit/English view
- Bookmark manuscripts for later reference

**Available manuscripts include:**
- Charaka Samhita
- Sushruta Samhita
- Ashtanga Hridayam
- Bhavaprakasha

### 6. Saved Bookmarks
**Location:** Sixth tab (Saved)

**How to use:**
- View all your saved chats, manuscripts, and recommendations
- Export bookmarks as JSON for backup
- Delete individual bookmarks
- Clear all bookmarks at once

## 🎨 Interface Tips

### Navigation
- Use the left sidebar to switch between features
- On mobile, click the menu icon (☰) to open navigation
- The active tab is highlighted in orange

### Responsive Design
- Works on desktop, tablet, and mobile
- Sidebar collapses on mobile devices
- All features are fully functional on all screen sizes

### Color Coding
- **Orange/Amber**: Primary actions and active states
- **Green**: High agreement/positive indicators
- **Yellow**: Warnings and disclaimers
- **Red**: Important notices

## ⚠️ Important Notes

### Medical Disclaimer
This application provides educational information from classical Ayurvedic texts. It is NOT:
- Medical diagnosis
- Treatment prescription
- A replacement for professional healthcare

**Always consult a qualified healthcare provider for:**
- Medical diagnosis
- Treatment plans
- Starting new supplements or herbs
- Significant health concerns

### Data Storage
- All bookmarks are stored locally in your browser
- Clearing browser data will delete your bookmarks
- Use the export feature to backup your saved items
- No data is sent to external servers

### Mock AI Responses
Currently, the AI responses are simulated based on the manuscript database. In a production version, this would integrate with:
- Real LLM APIs (OpenAI, Claude, etc.)
- Vector databases for semantic search
- Live manuscript repositories

## 🔧 Customization

### Adding Your Own Manuscripts
Edit `src/data/manuscripts.ts` to add more texts from your sources.

### Changing AI Responses
Modify `src/services/aiService.ts` to customize response generation.

### Styling
The app uses Tailwind CSS. Modify classes in component files or `tailwind.config.ts`.

## 📞 Support

For issues or questions:
1. Check the README.md for technical details
2. Review error messages in the browser console
3. Ensure all dependencies are installed (`npm install`)

## 🎯 Best Practices

1. **Take the Dosha Assessment first** to understand your constitution
2. **Bookmark important information** for easy reference
3. **Cross-reference sources** - check multiple manuscripts for the same topic
4. **Start with general questions** then get more specific
5. **Use the Body Map** when you're not sure how to describe symptoms

---

Enjoy exploring Ayurvedic wisdom! 🙏
