/**
 * Gemini API utility for auto-translating page content (Vi → En)
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Translate a single string from Vietnamese to English using Gemini.
 */
export async function translateText(text: string): Promise<string> {
  if (!text || !GEMINI_API_KEY) return text;
  // Skip if already English-ish (short, no diacritics)
  if (!text.match(/[àáảãạăắặằẳẵâấầẩẫậèéẹẻẽêếềệểễìíịỉĩòóọỏõôốồộổỗơớờợởỡùúụủũưứừựửữỳýỵỷỹđ]/i)) {
    return text;
  }

  const res = await fetch(GEMINI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Translate the following Vietnamese text to natural, professional English for an education website. Return ONLY the translated text, no explanation:\n\n${text}`
        }]
      }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 1024 }
    })
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? text;
}

/**
 * Deep-traverse a props object and translate all string values.
 * Arrays of strings and nested objects are handled recursively.
 */
async function translateValue(val: any): Promise<any> {
  if (typeof val === 'string') {
    return await translateText(val);
  }
  if (Array.isArray(val)) {
    return await Promise.all(val.map(translateValue));
  }
  if (val && typeof val === 'object') {
    const result: any = {};
    for (const key of Object.keys(val)) {
      result[key] = await translateValue(val[key]);
    }
    return result;
  }
  return val;
}

/**
 * Translate all props in a sections array.
 * Returns a new sections array with translated props.
 */
export async function translateSections(sections: any[]): Promise<any[]> {
  const translated = await Promise.all(
    sections.map(async (section) => ({
      ...section,
      props: await translateValue(section.props)
    }))
  );
  return translated;
}
