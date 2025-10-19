const OpenAI = require('openai');

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey:
    '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',
  defaultHeaders: {
    'HTTP-Referer': 'https://geetaverse.com',
    'X-Title': 'GeetaVerse',
  },
});

async function test() {
  try {
    console.log('🔍 Testing OpenRouter API...');

    // Try with a known working model
    const completion = await openai.chat.completions.create({
      model: 'tngtech/deepseek-r1t2-chimera:free"', // Changed from claude-sonnet-4.5
      messages: [
        {
          role: 'user',
          content: 'Say "Hello from OpenRouter!"',
        },
      ],
      max_tokens: 50,
    });

    console.log('✅ Success!');
    console.log('Response:', completion.choices[0]?.message?.content);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.status) console.error('Status:', error.status);
    if (error.error)
      console.error('Details:', JSON.stringify(error.error, null, 2));
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

test();
