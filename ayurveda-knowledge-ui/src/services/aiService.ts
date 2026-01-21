import { ChatMessage, SourceReference, Recommendation } from '@/types';
import { manuscripts, searchManuscripts } from '@/data/manuscripts';
import symptomMappings, { getSutrasForSymptom } from '@/data/symptomMappings';
import { charakaSutras } from '@/data/charakaSutras';

// Enhanced AI service with Charaka Samhita sutras integration
export class AyurvedaAIService {
  private async simulateDelay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Find matching symptom from our pre-computed data
  private findMatchingSymptom(query: string): typeof symptomMappings[0] | null {
    const lowerQuery = query.toLowerCase();

    // Keywords to symptom ID mapping
    const keywordMap: Record<string, string[]> = {
      'screen-time': ['screen', 'phone', 'digital', 'computer', 'eye strain', 'blue light'],
      'stress': ['stress', 'anxious', 'anxiety', 'worried', 'nervous', 'tension'],
      'burnout': ['burnout', 'exhausted', 'depleted', 'tired all the time', 'chronic fatigue'],
      'sleep': ['sleep', 'insomnia', 'can\'t sleep', 'wake up', 'restless', 'tired'],
      'digestion': ['digest', 'stomach', 'gut', 'bloat', 'gas', 'constipat', 'ibs'],
      'focus': ['focus', 'concentrate', 'attention', 'distracted', 'brain fog', 'mental clarity'],
      'weight': ['weight', 'fat', 'obesity', 'overweight', 'sluggish', 'metabolism'],
      'anger': ['anger', 'angry', 'irritable', 'frustrat', 'rage', 'temper'],
      'procrastination': ['procrastinat', 'lazy', 'unmotivated', 'no energy'],
      'overthinking': ['overthink', 'racing thoughts', 'can\'t stop thinking', 'ruminating', 'worry'],
      'high-bp': ['blood pressure', 'bp', 'hypertension', 'high bp'],
      'thyroid': ['thyroid', 'hypothyroid', 'hyperthyroid'],
      'back-pain': ['back pain', 'lower back', 'spine', 'backache'],
      'neck-pain': ['neck pain', 'stiff neck', 'cervical', 'neck stiff'],
      'headache': ['headache', 'head pain', 'migraine', 'head ache'],
      'hair-fall': ['hair fall', 'hair loss', 'bald', 'thinning hair', 'grey hair', 'gray hair'],
      'acidity': ['acidity', 'acid reflux', 'heartburn', 'gerd', 'sour stomach'],
      'joint-pain': ['joint', 'arthritis', 'knee pain', 'joint pain', 'stiffness'],
      'diabetes': ['diabetes', 'blood sugar', 'glucose', 'diabetic'],
      'cold-cough': ['cold', 'cough', 'flu', 'congestion', 'sinus', 'runny nose'],
      'skin-issues': ['skin', 'acne', 'pimple', 'rash', 'eczema', 'psoriasis', 'itch'],
      'low-immunity': ['immunity', 'immune', 'sick often', 'weak immune', 'low immunity'],
      'pcos': ['pcos', 'pcod', 'polycystic', 'irregular period', 'menstrual']
    };

    // Find matching symptom
    for (const [symptomId, keywords] of Object.entries(keywordMap)) {
      for (const keyword of keywords) {
        if (lowerQuery.includes(keyword)) {
          return symptomMappings.find(s => s.symptomId === symptomId) || null;
        }
      }
    }
    return null;
  }

  // Generate response using symptomMappings data
  private generateFromSymptomData(symptom: typeof symptomMappings[0]): string {
    const sutras = getSutrasForSymptom(symptom.sutraIds);

    let response = `**${symptom.symptomName} (${symptom.ayurvedicName})**\n\n`;
    response += `**Dosha Involvement:** ${symptom.doshaInvolvement.join(', ')}\n\n`;
    response += `**Ayurvedic Understanding:**\n${symptom.response}\n\n`;

    // Quick Remedies
    response += `**Quick Remedies:**\n`;
    symptom.quickRemedies.forEach((remedy, i) => {
      response += `${i + 1}. ${remedy}\n`;
    });
    response += '\n';

    // Dietary Advice
    response += `**Dietary Recommendations:**\n`;
    symptom.dietaryAdvice.forEach((advice, i) => {
      response += `• ${advice}\n`;
    });
    response += '\n';

    // Lifestyle Advice
    response += `**Lifestyle Changes:**\n`;
    symptom.lifestyleAdvice.forEach((advice, i) => {
      response += `• ${advice}\n`;
    });
    response += '\n';

    // Herbs
    if (symptom.herbs.length > 0) {
      response += `**Recommended Herbs:**\n`;
      symptom.herbs.forEach(herb => {
        response += `• **${herb.name}**: ${herb.benefit}\n`;
      });
      response += '\n';
    }

    // Yoga
    if (symptom.yogaAsanas.length > 0) {
      response += `**Yoga Asanas:** ${symptom.yogaAsanas.join(', ')}\n\n`;
    }

    // Charaka Samhita References
    if (sutras.length > 0) {
      response += `**📜 Charaka Samhita References:**\n`;
      sutras.forEach(sutra => {
        response += `\n*"${sutra.english}"*\n`;
        response += `— ${sutra.reference}\n`;
      });
    }

    // Warning
    if (symptom.warning) {
      response += `\n⚠️ **Medical Advisory:** ${symptom.warning}`;
    }

    return response;
  }

  async searchRelevantManuscripts(query: string): Promise<SourceReference[]> {
    await this.simulateDelay(600);

    // First check if we have a matching symptom with sutras
    const matchingSymptom = this.findMatchingSymptom(query);
    if (matchingSymptom) {
      const sutras = getSutrasForSymptom(matchingSymptom.sutraIds);
      if (sutras.length > 0) {
        return sutras.slice(0, 3).map(sutra => ({
          manuscriptId: sutra.id,
          manuscriptTitle: `Charaka Samhita - ${sutra.reference}`,
          sourceUrl: `https://www.sacred-texts.com/hin/cs/`,
          excerpt: sutra.english,
          confidence: 0.92 + Math.random() * 0.08
        }));
      }
    }

    // Fallback to manuscript search
    const results = searchManuscripts(query);
    return results.slice(0, 3).map(m => ({
      manuscriptId: m.id,
      manuscriptTitle: m.title,
      sourceUrl: m.sourceUrl,
      excerpt: m.englishText.substring(0, 200) + '...',
      confidence: 0.85 + Math.random() * 0.15
    }));
  }

  async generateResponse(query: string, sources: SourceReference[]): Promise<string> {
    await this.simulateDelay(1200);
    const lowerQuery = query.toLowerCase();

    // First, try to find a matching symptom in our pre-computed data
    const matchingSymptom = this.findMatchingSymptom(query);
    if (matchingSymptom) {
      return this.generateFromSymptomData(matchingSymptom);
    }

    // HEADACHE - Detailed specific response
    if (lowerQuery.includes('headache') || lowerQuery.includes('head pain') || lowerQuery.includes('migraine')) {
      return `**Understanding Headaches in Ayurveda:**

Headaches (Shiroroga) can result from imbalances in any dosha. Here's a comprehensive approach:

**Immediate Relief Methods:**
• **Sandalwood Paste**: Apply on forehead and temples
• **Peppermint Oil**: Gently massage temples in circular motions
• **Cold Compress**: For Pitta-type (throbbing, burning) headaches
• **Warm Compress**: For Vata-type (tension, pressure) headaches
• **Nasya (Nasal Drops)**: 2-3 drops of warm sesame oil in nostrils

**Herbal Remedies by Type:**
**Vata Headache** (tension, anxiety-related):
• Brahmi + Ashwagandha with warm milk
• Jatamansi tea
• Nutmeg with warm water

**Pitta Headache** (throbbing, heat-related):
• Coriander tea
• Amla juice
• Rose water on forehead
• Coconut water internally

**Kapha Headache** (dull, sinus-related):
• Ginger tea with honey
• Trikatu powder
• Steam inhalation with eucalyptus

**Root Cause Treatment:**
• **Digestive Issues**: Often headaches stem from poor digestion (Ama). Take Triphala at night.
• **Dehydration**: Drink warm water throughout day
• **Poor Sleep**: Establish regular sleep schedule before 10 PM
• **Eye Strain**: Practice Trataka (candle gazing) for 5 min daily

**Lifestyle Modifications:**
• Avoid direct sun exposure during peak hours
• Practice Shitali Pranayama (cooling breath)
• Ear massage with sesame oil before bed
• Avoid fermented foods, alcohol, cheese

**Prevention:**
• Daily Abhyanga (oil massage) to scalp
• Regular meal times
• Adequate water intake (8-10 glasses)
• Yoga asanas: Child's pose, Cat-cow, Forward bends

**When to See a Practitioner:**
If headaches persist for >3 days, are accompanied by fever, or are severe and sudden.`;
    }

    // STRESS/ANXIETY
    if (lowerQuery.includes('stress') || lowerQuery.includes('anxiety') || lowerQuery.includes('worried') || lowerQuery.includes('nervous')) {
      return `**Ayurvedic Approach to Stress & Anxiety:**

Anxiety and stress indicate aggravated Vata dosha affecting the nervous system (Majja Dhatu).

**Immediate Calming Techniques:**
• **4-7-8 Breathing**: Inhale 4 counts, hold 7, exhale 8 (repeat 4 times)
• **Nadi Shodhana**: Alternate nostril breathing for 10 minutes
• **Grounding Exercise**: Walk barefoot on grass/earth for 15 minutes
• **Warm Oil on Head**: Apply sesame oil to scalp and crown

**Powerful Herbal Allies:**
• **Ashwagandha**: 500mg twice daily with warm milk - nature's tranquilizer
• **Brahmi**: Enhances GABA, reduces cortisol - 300mg morning
• **Jatamansi**: Calms mind, improves sleep quality - tea before bed
• **Shankhapushpi**: Reduces mental fatigue - 1 tsp powder with honey
• **Tulsi**: Adaptogenic, stress-protective - 2-3 cups tea daily

**Daily Routine (Dinacharya) for Anxiety:**
**Morning (6-7 AM):**
• Wake before sunrise
• Oil pulling with coconut oil (10 min)
• Abhyanga (self-massage) with warm sesame oil
• Warm shower
• Pranayama practice
• Light breakfast (warm, nourishing)

**Evening (6-7 PM):**
• Gentle yoga or walk
• Avoid stimulating news/content
• Herbal tea (chamomile, tulsi)
• Foot massage with ghee before bed

**Diet for Calm Mind:**
**Include:**
• Ghee, dates, figs, almonds (soaked overnight)
• Warm milk with saffron/cardamom
• Sweet potatoes, rice, mung dal
• Cooling herbs: coriander, fennel, cumin

**Avoid:**
• Caffeine, alcohol, nicotine
• Spicy, sour, fermented foods
• Cold, dry, raw foods
• Processed sugar

**Mind-Body Practices:**
• **Yoga Nidra**: 20-30 min guided relaxation daily
• **Trataka**: Candle gazing meditation
• **Chanting**: "Om" 108 times calms nervous system
• **Journaling**: Write worries before bed

**Marma Point Therapy:**
Gently press these points for 2 minutes each:
• Sthapani (third eye)
• Adhipati (crown of head)
• Hridaya (heart center)

This multi-layered approach addresses root causes, not just symptoms.`;
    }

    // DIGESTIVE ISSUES
    if (lowerQuery.includes('digest') || lowerQuery.includes('stomach') || lowerQuery.includes('acidity') || lowerQuery.includes('bloat') || lowerQuery.includes('gas')) {
      return `**Complete Digestive Health Protocol:**

Digestive issues indicate weakened Agni (digestive fire) - the cornerstone of health in Ayurveda.

**Quick Relief Remedies:**
• **Ginger-Lemon-Honey**: 1 tsp grated ginger + juice of ½ lemon + 1 tsp honey before meals
• **CCF Tea**: Equal parts Cumin, Coriander, Fennel - boil, sip throughout day
• **Ajwain Water**: 1 tsp carom seeds boiled in water, drink warm
• **Buttermilk**: Fresh homemade with roasted cumin, ginger, mint after lunch
• **Hing (Asafoetida)**: Pinch in dal/vegetables - prevents gas

**By Specific Condition:**

**Acidity/Heartburn (Amlapitta):**
• Coconut water - nature's antacid
• Aloe vera juice (2 tbsp) before meals
• Coriander seeds soaked overnight, drink water
• Fennel seeds after meals
• **Avoid**: tomatoes, citrus, coffee, spicy food

**Bloating/Gas:**
• Hingvastak churna - ½ tsp before meals
• Warm water sips during meals (not cold!)
• Cooked vegetables only, avoid raw
• Chew: fennel, ajwain, or cardamom after eating

**Constipation:**
• Triphala - 1-2 tsp with warm water at bedtime
• Ghee in warm milk before bed
• Soaked prunes/figs in morning
• Castor oil (1 tsp) once weekly

**Diarrhea:**
• Pomegranate juice
• Nutmeg powder (pinch) with banana
• Rice water (congee)
• Curd rice with curry leaves

**Agni-Strengthening Foods:**
• **Best Digestive Spices**: Ginger, cumin, coriander, fennel, turmeric, black pepper
• **Easy to Digest**: Kitchari (mung dal + rice), soups, stews
• **Digestive Lassi**: Blend curd + water + rock salt + roasted cumin

**Meal Timing Rules (Critical!):**
• **Breakfast**: 7-8 AM - light (fruit, porridge)
• **Lunch**: 12-1 PM - largest meal (Agni strongest at noon)
• **Dinner**: 6-7 PM - light, early (soup, khichdi)
• Wait 3-4 hours between meals
• No snacking between meals
• Stop eating by 7:30 PM

**Eating Guidelines:**
✓ Eat in calm, peaceful environment
✓ Chew each bite 20-30 times
✓ Fill stomach: ½ food, ¼ liquid, ¼ empty
✓ Sip warm water with meals (not cold!)
✓ Walk 100 steps after eating
✓ Rest on left side for 10 min after lunch

✗ Avoid eating when stressed/upset
✗ No ice-cold drinks with food
✗ Don't overeat (stop at 80% full)
✗ Avoid incompatible foods (milk + fish, fruit + meal)

**Long-term Gut Healing:**
• Daily Abhyanga (oil massage) - stimulates digestion
• Yoga asanas: Pavanamuktasana, Apanasana, twists
• Agni Sara (abdominal pumping)
• Probiotic-rich: homemade curd, fermented rice

**Weekly Digestive Reset:**
Once weekly, eat only Kitchari (mung + rice) for all 3 meals - gives digestive system complete rest.`;
    }

    // JOINT PAIN
    if (lowerQuery.includes('joint') || lowerQuery.includes('arthritis') || lowerQuery.includes('knee') || lowerQuery.includes('back pain') || lowerQuery.includes('stiffness')) {
      return `**Ayurvedic Joint Pain Management:**

Joint issues (Sandhivata) arise from Vata imbalance and Ama (toxin) accumulation.

**External Therapies (Most Effective):**

**Oil Massage (Abhyanga):**
• **Mahanarayan Oil**: Best for joint pain - warm, massage 20 min before bath
• **Nirgundi Oil**: Anti-inflammatory, reduces swelling
• **Dashamool Oil**: For chronic arthritis
• Apply warm, massage in circular motion, followed by hot water compress

**Therapeutic Treatments:**
• **Kati Basti** (for lower back): Create dough dam on lower back, fill with warm oil for 20 min
• **Janu Basti** (for knees): Same technique for knee joints
• **Hot Fomentation**: Heat packs 15-20 min after oil massage
• **Upnaha Swedan**: Herbal poultice application

**Powerful Internal Remedies:**

**For Arthritis:**
• **Guggulu**: 500mg twice daily - reduces inflammation, removes Ama
• **Shallaki (Boswellia)**: 400mg twice daily - natural COX-2 inhibitor
• **Ashwagandha**: 500mg with milk - strengthens bones/joints
• **Yograj Guggulu**: 2 tablets twice daily - comprehensive formula

**For Pain Relief:**
• **Ginger-Turmeric Tea**: 1 inch ginger + 1 tsp turmeric + black pepper
• **Methi (Fenugreek)**: Soak 1 tsp overnight, eat seeds + drink water in morning
• **Ajwain + Garlic**: Both have pain-relieving properties

**For Inflammation:**
• **Turmeric Milk**: 1 tsp turmeric + pinch black pepper in warm milk (golden milk)
• **Castor Oil**: 1 tsp at bedtime (powerful anti-inflammatory)
• **Nirgundi**: Leaves boiled in water, drink tea

**Diet for Joint Health:**

**Include:**
• Warm, cooked foods only
• Ghee daily (1-2 tsp)
• Anti-inflammatory spices: turmeric, ginger, garlic
• Bone broth/vegetable soups
• Cooked vegetables (not raw)
• Mung dal, quinoa
• Warm water throughout day

**Strictly Avoid:**
• Nightshade vegetables (tomatoes, potatoes, eggplant, peppers)
• Cold/frozen foods and drinks
• Fermented foods (yogurt, cheese, pickles)
• Fried, oily foods
• White sugar, refined flour
• Sour fruits (citrus)

**Yoga & Movement (Essential):**
• **Gentle stretching** daily - flexibility prevents stiffness
• **Pawanmuktasana series**: Specific for joint lubrication
• **Surya Namaskar**: Modified, slow version (5-10 rounds)
• **Walking**: 30 min daily on soft surface
• **Swimming**: Excellent low-impact exercise

**Specific Exercises:**
• Knee rotation (clockwise/counter-clockwise)
• Ankle pumps
• Shoulder rotations
• Gentle neck movements

**Lifestyle Modifications:**
• Keep joints warm always (use heating pads)
• Avoid cold, damp weather exposure
• Maintain healthy weight (reduces joint stress)
• Sleep on firm mattress
• Use ergonomic furniture

**Detoxification Protocol:**
**Week 1-2:** Kitchari mono-diet to remove Ama
**Daily:** Triphala at night to cleanse system
**Weekly:** Castor oil once for deep detox

**Prevention:**
• Daily Abhyanga with warm oil
• Regular gentle movement
• Anti-inflammatory diet
• Adequate hydration with warm water

This protocol addresses inflammation, pain, stiffness, and root causes.`;
    }

    // SLEEP ISSUES
    if (lowerQuery.includes('sleep') || lowerQuery.includes('insomnia') || lowerQuery.includes('can\'t sleep') || lowerQuery.includes('tired')) {
      return `**Comprehensive Sleep Protocol (Nidra Chikitsa):**

Insomnia indicates Vata imbalance affecting the nervous system.

**Evening Routine (Start 2 Hours Before Bed):**

**7:00 PM:**
• Light dinner (warm soup, khichdi)
• Add: nutmeg, milk, ghee (all sleep-promoting)

**8:00 PM:**
• Gentle walk (15-20 min)
• Avoid: screens, work, intense conversations
• Dim lights in home (signals melatonin production)

**8:30 PM:**
• **Foot Massage**: Warm sesame/ghee on soles for 10 min
• **Marma Points**: Press Adhipati (crown), Talahridaya (feet center)

**9:00 PM:**
• **Warm Bath**: Add lavender/chamomile
• **Abhyanga**: Full body oil massage if possible

**9:30 PM - Sleep Preparation:**
• **Sleep Tonic**: Choose one:
  - Golden Milk: warm milk + turmeric + cardamom + nutmeg
  - Ashwagandha Milk: 1 tsp ashwagandha powder in warm milk
  - Poppy Seed Milk: 1 tsp ground poppy seeds in milk

**10:00 PM:**
• **In Bed**: Dark room, cool temperature (65-68°F)
• **Breathing**: 4-7-8 breath (10 rounds)
• **Visualization**: Imagine peaceful scene
• Sleep on left side (best for digestion)

**Herbal Sleep Aids:**

**Primary:**
• **Ashwagandha**: 500-1000mg - reduces cortisol, calms mind
• **Jatamansi**: 300mg - promotes deep, restful sleep
• **Brahmi**: 250mg - relaxes nervous system
• **Tagara (Valerian)**: 400mg - natural sedative (use short-term only)

**Supportive:**
• **Chamomile Tea**: 1 cup before bed
• **Shankhapushpi**: Reduces mental chatter
• **Sarpagandha**: For high blood pressure + insomnia (under guidance)

**Dietary Guidelines:**

**Sleep-Promoting Foods:**
• Warm milk with dates
• Almonds (soaked overnight, peeled)
• Banana with cardamom
• Ghee (1 tsp in warm milk)
• Nutmeg, saffron, cardamom

**Avoid After 3 PM:**
• Caffeine (tea, coffee, chocolate)
• Heavy meals
• Spicy foods
• Alcohol (disrupts sleep cycles)
• Refined sugar

**Bedroom Optimization:**
• **Temperature**: Cool (65-68°F)
• **Darkness**: Blackout curtains, no light
• **Sounds**: White noise/silence
• **Bed**: Reserve for sleep only (not work/TV)
• **Air**: Fresh, well-ventilated

**Daytime Habits:**
• **Wake**: Same time daily (even weekends!)
• **Sunlight**: 10-15 min morning exposure
• **Exercise**: Morning/afternoon (not evening)
• **Naps**: Avoid or limit to 20 min before 3 PM
• **Meals**: Regular timing, light dinner

**Yoga for Sleep:**
**Evening Sequence (30 min):**
• Balasana (Child's pose) - 5 min
• Viparita Karani (Legs up wall) - 10 min
• Supta Baddha Konasana - 5 min
• Shavasana - 10 min

**Pranayama:**
• **Chandra Bhedana**: Left nostril breathing (cooling, calming)
• **Brahmari**: Bee breath (5 times)
• **Anulom Vilom**: Alternate nostril (10 min)

**Meditation Practice:**
• **Yoga Nidra**: 20-30 min guided body scan
• **Mantra**: Chant "Om" or "So Hum" 108 times
• **Body Scan**: Progressive muscle relaxation

**For Different Types of Insomnia:**

**Can't Fall Asleep (Vata):**
• Heavy, grounding foods for dinner
• Warm oil massage to feet/head
• Weighted blanket

**Wake Up Frequently (Pitta):**
• Cooling: coconut oil massage
• Rose water on eyes
• Cool bedroom

**Wake Too Early (Kapha):**
• Light dinner
• Reduce daytime sleep
• Morning exercise

**Advanced Techniques:**
• **Shirodhara**: Warm oil poured on forehead (professional treatment)
• **Nasya**: Oil drops in nose before bed
• **Marmabhyanga**: Specific marma point stimulation

Consistency is key - maintain routine for 21 days minimum to reset sleep cycle.`;
    }

    // SKIN ISSUES
    if (lowerQuery.includes('skin') || lowerQuery.includes('acne') || lowerQuery.includes('rash') || lowerQuery.includes('itch') || lowerQuery.includes('eczema')) {
      return `**Ayurvedic Skin Health Protocol:**

Skin reflects internal health - most issues stem from blood impurities (Rakta Dushti) and dosha imbalances.

**Internal Purification (Most Important):**

**Blood Cleansing Herbs:**
• **Neem**: 2 tablets twice daily - powerful blood purifier
• **Manjistha**: 500mg daily - detoxifies blood, clears complexion
• **Turmeric**: 500mg with black pepper - anti-inflammatory
• **Guduchi**: Boosts immunity, clears toxins
• **Triphala**: 1 tsp at night - eliminates toxins

**Liver Support:**
• **Kutki**: Supports liver detoxification
• **Bhumi Amla**: Protects liver
• **Aloe Vera Juice**: 2 oz daily on empty stomach

**External Treatments:**

**For Acne/Pimples:**
• **Neem Paste**: Fresh neem leaves ground with turmeric - apply 15 min
• **Sandalwood-Turmeric**: Equal parts with rose water - cooling mask
• **Tea Tree Oil**: Spot treatment (dilute with coconut oil)
• **Fuller's Earth (Multani Mitti)**: With rose water - draws out impurities

**For Eczema/Dry Skin:**
• **Coconut Oil**: Warm, massage gently
• **Neem-Turmeric Paste**: Anti-inflammatory
• **Aloe Vera Gel**: Direct from plant
• **Oatmeal Bath**: Soothing, anti-itch

**For Dark Spots/Pigmentation:**
• **Manjistha Paste**: With honey
• **Lemon-Turmeric**: (for non-sensitive skin)
• **Saffron-Milk**: Apply overnight
• **Licorice Powder**: With rose water

**For Rashes/Itching:**
• **Neem Oil**: Diluted with coconut oil
• **Coriander Juice**: Cooling effect
• **Coconut Oil + Camphor**: Anti-itch
• **Sandalwood Paste**: Cooling, soothing

**Diet for Glowing Skin:**

**Include:**
• **Fresh Fruits**: Pomegranate, papaya, watermelon, berries
• **Vegetables**: Cucumber, carrots, beetroot, leafy greens (cooked)
• **Healthy Fats**: Ghee, coconut oil, almonds, walnuts
• **Hydration**: 8-10 glasses warm water, coconut water
• **Spices**: Turmeric, coriander, fennel, cumin

**Strictly Avoid:**
• Processed/junk food
• Dairy (if acne-prone) - especially cheese, ice cream
• Fried, oily, spicy foods
• Refined sugar, white flour
• Fermented foods (pickles, vinegar)
• Alcohol, caffeine excess

**Daily Skin Care Routine:**

**Morning:**
• Wash with chickpea flour (besan) + turmeric + milk
• Apply rose water toner
• Light moisturizer (aloe vera gel or light oil)
• Sunscreen (physical/mineral based)

**Evening:**
• Remove makeup with coconut/sesame oil
• Cleanse with ubtan (besan + turmeric + honey)
• Rose water toner
• Night serum: kumkumadi oil or almond oil

**Weekly:**
• **Exfoliation**: Oatmeal + honey scrub (2x/week)
• **Face Mask**: Neem-turmeric or sandalwood (2x/week)
• **Steam**: With neem leaves (1x/week) for deep cleansing

**Internal Drinks for Skin:**
• **Detox Water**: Cucumber + mint + lemon
• **Turmeric Latte**: Golden milk daily
• **Amla Juice**: 30ml in morning - high Vitamin C
• **Aloe Vera Juice**: Purifies blood

**Lifestyle for Healthy Skin:**
• **Sleep**: 7-8 hours (skin regenerates at night)
• **Exercise**: Increases blood circulation, sweating detoxifies
• **Stress Management**: Stress causes breakouts
• **Sun Protection**: Avoid 10 AM-4 PM sun
• **No Picking**: Never squeeze pimples (causes scars)

**Specific Treatments by Dosha:**

**Vata Skin** (dry, rough, thin):
• Heavy oils: Sesame, almond
• Rich moisturizers
• Avoid drying products
• Focus: Hydration + nourishment

**Pitta Skin** (sensitive, inflamed, acne-prone):
• Cooling: Coconut oil, aloe, rose
• Avoid hot, spicy food
• Sun protection critical
• Focus: Cooling + calming

**Kapha Skin** (oily, thick, enlarged pores):
• Light oils: Jojoba, grapeseed
• Clay masks
• Avoid dairy, fried foods
• Focus: Cleansing + balancing

**Professional Treatments:**
• **Panchakarma**: Deep detoxification
• **Vamana/Virechana**: Cleansing therapies
• **Rakta Mokshana**: Blood-letting (in severe cases)

Remember: Skin healing takes 3-6 months. Be patient and consistent!`;
    }

    // IMMUNITY
    if (lowerQuery.includes('immun') || lowerQuery.includes('cold') || lowerQuery.includes('flu') || lowerQuery.includes('cough') || lowerQuery.includes('fever')) {
      return `**Complete Immunity Boosting Protocol (Vyadhiksh amatva):**

In Ayurveda, immunity is Ojas - the vital essence that protects from disease.

**Daily Immunity Builders:**

**Morning Routine:**
• **Warm Water**: 2 glasses with lemon upon waking
• **Tongue Scraping**: Removes toxins
• **Oil Pulling**: 1 tbsp coconut oil for 10 min
• **Nasya**: 2 drops sesame oil in each nostril
• **Turmeric Milk**: 1 tsp turmeric + black pepper + ghee in warm milk

**Core Immunity Herbs:**

**Tier 1 (Most Powerful):**
• **Ashwagandha**: 500-1000mg - #1 immune modulator
• **Guduchi (Giloy)**: 500mg - enhances white blood cells
• **Amla**: 1000mg - highest Vitamin C source
• **Tulsi**: 3 cups tea daily - anti-viral, anti-bacterial
• **Chyawanprash**: 1-2 tsp daily - comprehensive rasayana formula

**Tier 2 (Supporting):**
• **Turmeric**: 500-1000mg with black pepper
• **Ginger**: Fresh tea 2-3x daily
• **Licorice**: Soothes throat, anti-viral (short-term use)
• **Pippali (Long Pepper)**: Clears respiratory tract

**Immediate Immune Support (If Getting Sick):**

**At First Signs (Scratchy Throat, Tiredness):**
• **Turmeric-Ginger Shot**: 1 tbsp each + honey + lemon
• **Tulsi-Ginger Tea**: Every 2-3 hours
• **Ghee in Nostrils**: Prevents pathogen entry
• **Steam Inhalation**: With eucalyptus/ajwain
• **Gargle**: Warm salt water every few hours

**For Cough:**
• **Tulsi-Honey**: Equal parts, 1 tsp every 3 hours
• **Sitopaladi Churna**: ½ tsp with honey 3x daily
• **Ginger-Pepper-Honey**: Expectorant blend
• **Turmeric Milk**: Before bed

**For Sore Throat:**
• **Licorice Tea**: Soothing, anti-viral
• **Turmeric-Salt Gargle**: Warm water
• **Cinnamon-Honey**: 1 tsp mixture
• **Steam**: With ajwain seeds

**For Fever:**
• **Tulsi-Coriander-Ginger Tea**: Cooling + healing
• **Ginger-Honey**: Induces sweating
• **Plenty of Rest**: Body heals when resting
• **Warm Water Sponging**: If fever is high

**Immunity-Boosting Diet:**

**Super Foods:**
• **Ghee**: 1-2 tsp daily (enhances Ojas)
• **Honey**: 1 tsp daily (not in hot liquids)
• **Dates**: 2-3 daily (nourishing)
• **Almonds**: 5-7 soaked overnight (builds strength)
• **Sesame Seeds**: Rich in zinc
• **Pumpkin Seeds**: Immune-supporting minerals

**Spices (Use Daily):**
• Turmeric, ginger, black pepper, cinnamon, cardamom, cloves
• Make masala chai with these spices

**Foods to Avoid (Immune-Suppressing):**
• Processed sugar (major immune suppressant)
• Refined flour, white rice
• Deep-fried foods
• Cold/frozen foods
• Excessive dairy (creates mucus)
• Leftover/stale food

**Lifestyle for Strong Immunity:**

**Sleep:**
• 7-8 hours nightly
• Before 10 PM (when body detoxifies)
• Dark, quiet room

**Exercise:**
• Moderate daily (not excessive)
• Yoga, pranayama, walking
• Sweating releases toxins
• Don't overexert when sick

**Stress Management:**
• Meditation: 15-20 min daily
• Pranayama: Kapalabhati, Anulom Vilom
• Avoid excessive worry/anxiety
• Chronic stress depletes immunity

**Hygiene:**
• Wash hands regularly
• Clean nostrils with saline/oil
• Avoid touching face
• Fresh air in living space

**Pranayama for Respiratory Immunity:**
• **Kapalabhati**: 100 rounds - clears sinuses
• **Bhastrika**: Builds heat, lung capacity
• **Anulom Vilom**: Balances, strengthens
• **Brahmari**: Vibration clears passages

**Seasonal Immunity Protection:**

**Monsoon/Rainy Season:**
• Boost Agni with ginger, black pepper
• Avoid heavy, oily foods
• Keep body warm and dry

**Winter:**
• Chyawanprash daily
• Warming spices, soups
• Oil massage
• Avoid cold drinks

**Summer:**
• Cooling herbs: coriander, fennel
• Plenty of water
• Light, fresh foods

**Children's Immunity:**
• Chyawanprash: ½-1 tsp daily (age 4+)
• Ghee in meals
• Honey (age 1+)
• Abhyanga with oil
• Early bedtime

**For Chronic Low Immunity:**
Consider Panchakarma detoxification to remove deep-seated toxins (Ama) that suppress immune function.

**Prevention is Best Medicine:**
Daily routine (Dinacharya), seasonal routine (Ritucharya), and appropriate diet (Ahara) are foundations of immunity in Ayurveda.`;
    }

    // HAIR ISSUES
    if (lowerQuery.includes('hair') || lowerQuery.includes('bald') || lowerQuery.includes('grey') || lowerQuery.includes('dandruff')) {
      return `**Complete Hair Care Protocol (Kesha Chikitsa):**

Hair health indicates overall vitality and Pitta balance.

**External Hair Treatments:**

**Hair Oils (Massage 2-3x Weekly):**
• **Bhringraj Oil**: #1 for hair growth, prevents graying
• **Brahmi-Amla Oil**: Strengthens roots, adds shine
• **Coconut Oil + Curry Leaves**: Boil together, cool, apply
• **Neem Oil**: For dandruff, scalp infections
• **Castor Oil**: Thickens hair, eyebrows, lashes

**How to Oil:**
• Warm oil slightly
• Massage into scalp for 10-15 min (circular motions)
• Work through to tips
• Leave 1-2 hours (or overnight)
• Wash with mild herbal shampoo

**Hair Masks (Weekly):**

**For Growth:**
• Fenugreek paste (methi soaked overnight, ground)
• Onion juice + castor oil
• Aloe vera gel + curry leaves paste

**For Thickness:**
• Amla powder + shikakai + reetha (natural cleanser)
• Egg white + yogurt + honey
• Hibiscus paste

**For Dandruff:**
• Neem powder + yogurt
• Lemon juice + coconut oil
• Fenugreek paste + tea tree oil

**For Premature Graying:**
• Curry leaves + coconut oil (boiled)
• Amla + Brahmi paste
• Henna (natural hair dye)

**Internal Nourishment (Critical):**

**Herbs for Hair:**
• **Bhringraj**: 500mg daily - king of hair herbs
• **Amla**: 1000mg - prevents graying, strengthens
• **Brahmi**: 300mg - promotes growth
• **Ashwagandha**: Reduces stress-related hair loss
• **Shatavari**: Balances hormones (esp. women)

**Diet for Healthy Hair:**

**Must Include:**
• **Iron-Rich**: Beetroot, pomegranate, dates, raisins
• **Protein**: Mung dal, almonds, sesame seeds
• **Healthy Fats**: Ghee, coconut, walnuts
• **Vitamins**: Green leafy vegetables (cooked)
• **Minerals**: Sesame seeds (black), pumpkin seeds

**Super Foods:**
• **Coconut**: Fresh, water, oil
• **Amla**: Fresh, juice, powder
• **Curry Leaves**: In cooking, chew 4-5 leaves daily
• **Black Sesame**: 1 tbsp daily
• **Dates**: 2-3 daily with milk

**Foods to Avoid:**
• Excess salt, sugar
• Fried, oily foods
• Processed/junk food
• Excessive caffeine
• Alcohol, smoking (major hair damagers)

**Lifestyle for Hair Health:**

**Do's:**
✓ Oil massage 2-3x weekly
✓ Gentle shampoo (herbal/chemical-free)
✓ Air dry (minimize heat styling)
✓ Silk/satin pillowcase (reduces breakage)
✓ Wide-tooth comb (detangle gently)
✓ Trim regularly (every 6-8 weeks)
✓ Protect from sun/pollution
✓ Adequate sleep (hair grows at night)

**Don'ts:**
✗ Hot showers on hair (use lukewarm)
✗ Tight hairstyles (causes traction loss)
✗ Chemical treatments (dyes, perms, straightening)
✗ Excessive shampooing (2-3x weekly is enough)
✗ Brushing wet hair (causes breakage)
✗ Harsh towel drying (pat, don't rub)

**Natural Hair Cleansers:**
• **Shikakai-Reetha-Amla**: Traditional hair wash powder
• **Chickpea Flour**: Cleanses, conditions
• **Yogurt**: Natural conditioner
• **Aloe Vera**: Soothes scalp

**Specific Treatments:**

**Hair Fall:**
• **Root Cause**: Usually Pitta imbalance or stress
• **Treatment**:
  - Bhringraj oil massage
  - Amla + Ashwagandha internally
  - Brahmi for stress
  - Triphala to detoxify

**Premature Graying:**
• **Root Cause**: Excess Pitta or genetic
• **Treatment**:
  - Curry leaves daily
  - Bhringraj + Brahmi + Amla
  - Coconut oil massage
  - Avoid heat/sun exposure

**Dandruff:**
• **Root Cause**: Kapha-Vata imbalance or fungus
• **Treatment**:
  - Neem oil massage
  - Tea tree oil (diluted)
  - Fenugreek paste mask
  - Reduce dairy, sugar

**Thin/Fine Hair:**
• **Root Cause**: Vata imbalance or poor nutrition
• **Treatment**:
  - Protein-rich diet
  - Castor oil massage
  - Fenugreek, egg masks
  - Biotin-rich foods

**Scalp Massage Technique:**
1. Warm oil (test temperature)
2. Apply to scalp
3. Use fingertips (not nails) in circular motions
4. Start from front, move to sides, then back
5. 10-15 minutes minimum
6. Gentle pressure - should feel relaxing

**Yoga for Hair Health:**
Inversions increase blood flow to scalp:
• Sirsasana (Headstand)
• Sarvangasana (Shoulder stand)
• Uttanasana (Forward bend)
• Adho Mukha Svanasana (Downward dog)

**Pranayama:**
• Kapalabhati: Oxygenates scalp
• Anulom Vilom: Balances doshas

**Hair Rinses (After Shampooing):**
• **Amla Rinse**: Boil amla in water, cool, rinse
• **Curry Leaf Rinse**: Boil leaves, use as final rinse
• **Hibiscus Rinse**: Conditioning, shine-boosting
• **Apple Cider Vinegar**: 1 tbsp in water (removes buildup)

**Stress Management:**
Hair loss often stress-related - manage through:
• Meditation
• Adequate sleep
• Yoga
• Ashwagandha supplementation

Results take 3-6 months. Be patient and consistent!`;
    }

    // DEFAULT RESPONSE - Guide to available topics
    const availableTopics = symptomMappings.map(s => s.symptomName).join(', ');

    return `**Ayurvedic Health Guidance:**

I can provide detailed, manuscript-backed guidance on the following conditions:

**Common Concerns I Can Help With:**
• Screen time & digital eye strain
• Stress & anxiety
• Burnout & exhaustion
• Sleep issues & insomnia
• Digestion problems
• Focus & concentration
• Weight management
• Anger & irritability
• Procrastination
• Overthinking & racing thoughts
• Blood pressure concerns
• Thyroid imbalance
• Back pain & neck pain
• Headaches & migraines
• Hair fall & thinning
• Acidity & heartburn
• Joint pain & arthritis
• Blood sugar concerns
• Cold, cough & immunity
• Skin issues & acne
• PCOS/PCOD

**How to Get the Best Response:**
Ask about a specific condition like:
• "I'm experiencing stress and anxiety"
• "Help me with sleep issues"
• "I have digestion problems"
• "My hair is falling"

Each response includes:
✦ Ayurvedic understanding of the condition
✦ Quick remedies you can start today
✦ Dietary recommendations
✦ Lifestyle changes
✦ Recommended herbs
✦ Yoga asanas
✦ Actual Charaka Samhita sutra references

**Foundation of Ayurvedic Health:**
• Take our **Dosha Quiz** to know your constitution
• Use **Quick Fix** for instant symptom solutions
• Check your **Personalized Plan** for daily routines

What specific health concern would you like guidance on?`;
  }

  async getChatResponse(message: string): Promise<ChatMessage> {
    const sources = await this.searchRelevantManuscripts(message);
    const responseContent = await this.generateResponse(message, sources);

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: responseContent,
      sources: sources,
      timestamp: new Date()
    };
  }

  async getRecommendations(query: string): Promise<Recommendation[]> {
    await this.simulateDelay(800);
    const lowerQuery = query.toLowerCase();
    const relevantManuscripts = searchManuscripts(query).slice(0, 3);
    const recommendations: Recommendation[] = [];

    // HEADACHE recommendations
    if (lowerQuery.includes('headache') || lowerQuery.includes('head') || lowerQuery.includes('migraine')) {
      recommendations.push(
        {
          id: 'h1',
          type: 'treatment',
          title: 'Sandalwood Paste Application',
          description: 'Apply cooling sandalwood paste on forehead and temples. Mix sandalwood powder with rose water to make a paste. Provides immediate relief from heat-type headaches.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.93
          })),
          agreementLevel: 'high'
        },
        {
          id: 'h2',
          type: 'herb',
          title: 'Brahmi + Jatamansi',
          description: 'For tension headaches, combine Brahmi (300mg) and Jatamansi (200mg). Calms nervous system and reduces stress-related headaches.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.90
          })),
          agreementLevel: 'high'
        },
        {
          id: 'h3',
          type: 'lifestyle',
          title: 'Nasya (Nasal Oil Therapy)',
          description: '2-3 drops of warm sesame oil in each nostril. This ancient technique lubricates sinuses and relieves sinus-related headaches.',
          sources: relevantManuscripts.slice(0, 1).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.89
          })),
          agreementLevel: 'medium'
        }
      );
    }

    // DIGESTIVE recommendations
    else if (lowerQuery.includes('digest') || lowerQuery.includes('stomach') || lowerQuery.includes('acidity') || lowerQuery.includes('bloat')) {
      recommendations.push(
        {
          id: 'd1',
          type: 'herb',
          title: 'Trikatu (Three Peppers)',
          description: 'Blend of ginger, black pepper, and long pepper. Take ½ tsp with honey before meals to kindle digestive fire (Agni).',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.95
          })),
          agreementLevel: 'high'
        },
        {
          id: 'd2',
          type: 'diet',
          title: 'CCF Tea (Cumin-Coriander-Fennel)',
          description: 'Equal parts cumin, coriander, and fennel seeds boiled in water. Sip throughout the day for digestive balance and relief from bloating.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.92
          })),
          agreementLevel: 'high'
        },
        {
          id: 'd3',
          type: 'lifestyle',
          title: 'Meal Timing Protocol',
          description: 'Largest meal at noon when digestive fire is strongest. Early light dinner (6-7 PM). Wait 3-4 hours between meals. This aligns with natural rhythms.',
          sources: relevantManuscripts.slice(0, 1).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.91
          })),
          agreementLevel: 'high'
        }
      );
    }

    // STRESS/ANXIETY recommendations
    else if (lowerQuery.includes('stress') || lowerQuery.includes('anxiety') || lowerQuery.includes('mental') || lowerQuery.includes('worried')) {
      recommendations.push(
        {
          id: 's1',
          type: 'herb',
          title: 'Ashwagandha (Withania somnifera)',
          description: 'Nature\'s most powerful adaptogen. Take 500-1000mg with warm milk before bed. Reduces cortisol by 28% and significantly lowers anxiety.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.96
          })),
          agreementLevel: 'high'
        },
        {
          id: 's2',
          type: 'treatment',
          title: 'Nadi Shodhana (Alternate Nostril Breathing)',
          description: '10 minutes daily of alternate nostril breathing balances nervous system, reduces stress hormones, and calms mind immediately.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.94
          })),
          agreementLevel: 'high'
        },
        {
          id: 's3',
          type: 'lifestyle',
          title: 'Abhyanga (Oil Massage)',
          description: 'Daily self-massage with warm sesame oil. Grounds Vata dosha, calms nervous system, and provides nurturing touch that reduces anxiety.',
          sources: relevantManuscripts.slice(0, 1).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.90
          })),
          agreementLevel: 'high'
        }
      );
    }

    // SLEEP recommendations
    else if (lowerQuery.includes('sleep') || lowerQuery.includes('insomnia') || lowerQuery.includes('tired')) {
      recommendations.push(
        {
          id: 'sl1',
          type: 'herb',
          title: 'Ashwagandha + Nutmeg Sleep Tonic',
          description: 'Mix 1 tsp ashwagandha powder + ¼ tsp nutmeg in warm milk. Drink 30 min before bed. Promotes deep, restful sleep.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.94
          })),
          agreementLevel: 'high'
        },
        {
          id: 'sl2',
          type: 'treatment',
          title: 'Foot Massage with Ghee',
          description: 'Massage feet with warm ghee or sesame oil for 10 min before bed. Activates marma points that induce sleep and calm nervous system.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.92
          })),
          agreementLevel: 'high'
        },
        {
          id: 'sl3',
          type: 'lifestyle',
          title: 'Sleep Before 10 PM',
          description: 'Ayurvedic sleep window is 10 PM-2 AM when body detoxifies and repairs. Missing this window disrupts natural rhythms.',
          sources: relevantManuscripts.slice(0, 1).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.90
          })),
          agreementLevel: 'high'
        }
      );
    }

    // JOINT PAIN recommendations
    else if (lowerQuery.includes('joint') || lowerQuery.includes('pain') || lowerQuery.includes('arthritis') || lowerQuery.includes('knee') || lowerQuery.includes('back')) {
      recommendations.push(
        {
          id: 'j1',
          type: 'treatment',
          title: 'Mahanarayan Oil Massage',
          description: 'Warm Mahanarayan oil and massage affected joints for 20 min. Follow with hot water compress. Most effective Ayurvedic treatment for joint pain.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.95
          })),
          agreementLevel: 'high'
        },
        {
          id: 'j2',
          type: 'herb',
          title: 'Guggulu + Shallaki',
          description: 'Guggulu (500mg) with Shallaki/Boswellia (400mg) twice daily. Reduces inflammation, removes Ama (toxins), strengthens joints.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.93
          })),
          agreementLevel: 'high'
        },
        {
          id: 'j3',
          type: 'diet',
          title: 'Avoid Nightshade Vegetables',
          description: 'Eliminate tomatoes, potatoes, eggplant, peppers. These aggravate joint inflammation in Ayurveda. Focus on anti-inflammatory spices like turmeric, ginger.',
          sources: relevantManuscripts.slice(0, 1).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.88
          })),
          agreementLevel: 'medium'
        }
      );
    }

    // IMMUNITY recommendations
    else if (lowerQuery.includes('immun') || lowerQuery.includes('cold') || lowerQuery.includes('cough') || lowerQuery.includes('flu')) {
      recommendations.push(
        {
          id: 'i1',
          type: 'herb',
          title: 'Guduchi (Giloy) + Tulsi',
          description: 'Guduchi 500mg daily + 3 cups Tulsi tea. Powerful combination that enhances white blood cells and provides anti-viral protection.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.94
          })),
          agreementLevel: 'high'
        },
        {
          id: 'i2',
          type: 'diet',
          title: 'Chyawanprash Daily',
          description: '1-2 tsp daily of this ancient rasayana formula. Contains 40+ herbs including Amla. Builds Ojas (immunity) and protects from seasonal illnesses.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.93
          })),
          agreementLevel: 'high'
        },
        {
          id: 'i3',
          type: 'treatment',
          title: 'Golden Milk + Nasya',
          description: 'Turmeric milk before bed + nasal oil drops in morning. Protects respiratory system and builds systemic immunity.',
          sources: relevantManuscripts.slice(0, 1).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.91
          })),
          agreementLevel: 'high'
        }
      );
    }

    // SKIN recommendations
    else if (lowerQuery.includes('skin') || lowerQuery.includes('acne') || lowerQuery.includes('rash') || lowerQuery.includes('itch')) {
      recommendations.push(
        {
          id: 'sk1',
          type: 'herb',
          title: 'Neem + Manjistha Blood Purification',
          description: 'Neem 2 tablets + Manjistha 500mg daily. Purifies blood, eliminates toxins causing skin issues. Results in 2-4 weeks.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.93
          })),
          agreementLevel: 'high'
        },
        {
          id: 'sk2',
          type: 'treatment',
          title: 'Neem-Turmeric Face Mask',
          description: 'Mix neem powder + turmeric + rose water. Apply 15 min, 2-3x weekly. Antibacterial, anti-inflammatory, clears acne and rashes.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.92
          })),
          agreementLevel: 'high'
        },
        {
          id: 'sk3',
          type: 'diet',
          title: 'Eliminate Dairy & Sugar',
          description: 'Remove dairy (especially cheese, ice cream) and refined sugar for 30 days. Major triggers for acne and skin inflammation.',
          sources: relevantManuscripts.slice(0, 1).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.89
          })),
          agreementLevel: 'medium'
        }
      );
    }

    // HAIR recommendations
    else if (lowerQuery.includes('hair')) {
      recommendations.push(
        {
          id: 'hr1',
          type: 'treatment',
          title: 'Bhringraj Oil Massage',
          description: 'Warm Bhringraj oil, massage into scalp 2-3x weekly. Leave 2 hours or overnight. The king of herbs for hair growth and preventing graying.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.94
          })),
          agreementLevel: 'high'
        },
        {
          id: 'hr2',
          type: 'herb',
          title: 'Amla + Bhringraj Supplement',
          description: 'Amla 1000mg + Bhringraj 500mg daily. Prevents premature graying, strengthens hair follicles, promotes thick growth.',
          sources: relevantManuscripts.slice(0, 2).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.92
          })),
          agreementLevel: 'high'
        },
        {
          id: 'hr3',
          type: 'diet',
          title: 'Curry Leaves + Black Sesame',
          description: 'Chew 4-5 fresh curry leaves daily. Add 1 tbsp black sesame seeds to diet. Both prevent graying and nourish hair from within.',
          sources: relevantManuscripts.slice(0, 1).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.90
          })),
          agreementLevel: 'high'
        }
      );
    }

    // Default if no specific match
    if (recommendations.length === 0) {
      recommendations.push(
        {
          id: 'g1',
          type: 'lifestyle',
          title: 'Dinacharya (Daily Routine)',
          description: 'Establish consistent wake/sleep times, regular meal schedule, and daily self-care practices. Foundation of Ayurvedic health.',
          sources: relevantManuscripts.slice(0, 1).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.88
          })),
          agreementLevel: 'high'
        },
        {
          id: 'g2',
          type: 'herb',
          title: 'Triphala for Detoxification',
          description: '1 tsp Triphala powder with warm water at bedtime. Gently cleanses system, supports all doshas, promotes overall wellness.',
          sources: relevantManuscripts.slice(0, 1).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.90
          })),
          agreementLevel: 'high'
        },
        {
          id: 'g3',
          type: 'treatment',
          title: 'Pranayama Practice',
          description: '15 minutes daily breathing exercises. Anulom Vilom (alternate nostril) balances doshas and enhances overall vitality.',
          sources: relevantManuscripts.slice(0, 1).map(m => ({
            manuscriptId: m.id,
            manuscriptTitle: m.title,
            sourceUrl: m.sourceUrl,
            excerpt: m.englishText.substring(0, 150),
            confidence: 0.89
          })),
          agreementLevel: 'high'
        }
      );
    }

    return recommendations;
  }
}

export const aiService = new AyurvedaAIService();
