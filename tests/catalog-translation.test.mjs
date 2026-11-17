import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/translate-catalog.js';

test('translation authenticates the CMS admin and rejects failed or incomplete translations', async () => {
  const originalFetch = globalThis.fetch;
  const originals = Object.fromEntries(['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY', 'GEMINI_API_KEY'].map(key => [key, process.env[key]]));
  process.env.VITE_SUPABASE_URL = 'https://auth.example.test';
  process.env.VITE_SUPABASE_ANON_KEY = 'test-public';
  process.env.GEMINI_API_KEY = 'test-provider-key';
  let admin = true, validSession = true, providerStatus = 200, finishReason = 'STOP', calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    if (url.includes('/auth/v1/user')) return Response.json({ id: admin ? '427ebaf1-73b3-42c9-a96f-313efa3aaea0' : 'another-user' }, { status: validSession ? 200 : 401 });
    assert.equal(options.headers['x-goog-api-key'], 'test-provider-key');
    const request = JSON.parse(options.body);
    const fields = JSON.parse(request.contents[0].parts[0].text);
    return Response.json({ candidates: [{ finishReason, content: { parts: [{ text: JSON.stringify(Object.fromEntries(Object.keys(fields).map(key => [key, 'English translation']))) }] } }] }, { status: providerStatus });
  };
  const invoke = async (overrides = {}) => {
    const response = { statusCode: 200, headers: {}, setHeader(key, value) { this.headers[key] = value; }, status(value) { this.statusCode = value; return this; }, json(body) { this.body = body; return this; } };
    await handler({ method: 'POST', headers: { authorization: 'Bearer test-session' }, body: { fields: { summary: 'Môn học mùa hè' } }, ...overrides }, response);
    return response;
  };
  try {
    assert.equal((await invoke({ method: 'GET' })).statusCode, 405);
    assert.equal((await invoke({ headers: {} })).statusCode, 401);
    assert.equal(calls, 0);
    validSession = false; assert.equal((await invoke()).statusCode, 401);
    validSession = true; admin = false;
    const before = calls; assert.equal((await invoke()).statusCode, 403); assert.equal(calls, before + 1);
    admin = true; delete process.env.GEMINI_API_KEY;
    assert.equal((await invoke()).statusCode, 503);
    process.env.GEMINI_API_KEY = 'test-provider-key';
    assert.equal((await invoke({ body: '{' })).statusCode, 400);
    assert.equal((await invoke({ body: { fields: { summary: 42 } } })).statusCode, 400);
    assert.equal((await invoke({ body: 'x'.repeat(30001) })).statusCode, 413);
    const result = await invoke();
    assert.equal(result.statusCode, 200);
    assert.deepEqual(result.body, { fields: { summary: 'English translation' } });
    assert.equal(result.headers['Cache-Control'], 'no-store');
    finishReason = 'MAX_TOKENS'; assert.equal((await invoke()).statusCode, 502);
    finishReason = 'STOP'; providerStatus = 429; assert.equal((await invoke()).statusCode, 502);
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(originals)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
  }
});
