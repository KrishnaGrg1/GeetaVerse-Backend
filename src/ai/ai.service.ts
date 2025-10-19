import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI | null = null;
  private model: string;
  private siteUrl: string;
  private siteName: string;

  constructor(private configService: ConfigService) {
    // Initialize OpenRouter if key is provided
    const apiKey = this.configService.get('app.openai.apiKey');
    this.model =
      this.configService.get('app.openai.model') ||
      'tngtech/deepseek-r1t2-chimera:free';
    this.siteUrl =
      this.configService.get('app.openai.siteUrl') || 'https://geetaverse.com';
    this.siteName =
      this.configService.get('app.openai.siteName') || 'GeetaVerse';

    if (apiKey) {
      try {
        this.openai = new OpenAI({
          baseURL: 'https://openrouter.ai/api/v1',
          apiKey: apiKey,
        });
        this.logger.log(
          `✅ OpenRouter AI service initialized with model: ${this.model}`,
        );
      } catch (error) {
        this.logger.warn(
          '⚠️ OpenRouter not initialized - AI features disabled',
        );
      }
    } else {
      this.logger.warn('⚠️ No API key provided - AI features disabled');
    }
  }

  async getVerseInsight(verseRef: string, verseText: string): Promise<string> {
    if (!this.openai) {
      return `AI insights are currently unavailable. Please configure OPENROUTER_API_KEY in your environment.`;
    }

    try {
      const prompt = `You are a scholar of the Bhagavad Gita. Provide a concise, practical insight about this verse:

Verse Reference: ${verseRef}
Verse Text: ${verseText}

Provide a 2-3 paragraph insight that:
1. Explains the key teaching
2. Relates it to modern life
3. Offers practical application

Keep it accessible and inspiring.`;

      const completion = await this.openai.chat.completions.create(
        {
          model: this.model,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: {
            'HTTP-Referer': this.siteUrl,
            'X-Title': this.siteName,
          },
        },
      );

      const insight =
        completion.choices[0]?.message?.content || 'No insight generated';
      this.logger.log(`Generated insight for ${verseRef}`);

      return insight;
    } catch (error) {
      this.logger.error(`Failed to generate insight: ${error.message}`);
      return `Unable to generate AI insight at this time. Please try again later.`;
    }
  }

  async generateSummary(
    chapterNumber: number,
    chapterName: string,
    chapterSummary: string,
  ): Promise<string> {
    if (!this.openai) {
      return `AI summaries are currently unavailable. Please configure OPENROUTER_API_KEY in your environment.`;
    }

    try {
      const prompt = `You are a scholar of the Bhagavad Gita. Create a modern, accessible summary of this chapter:

Chapter ${chapterNumber}: ${chapterName}

Traditional Summary: ${chapterSummary}

Create a fresh summary that:
1. Captures the essence in modern language
2. Highlights key themes
3. Shows relevance to contemporary life
4. Is 3-4 paragraphs

Make it engaging and practical.`;

      const completion = await this.openai.chat.completions.create(
        {
          model: this.model,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 800,
          temperature: 0.7,
        },
        {
          headers: {
            'HTTP-Referer': this.siteUrl,
            'X-Title': this.siteName,
          },
        },
      );

      const summary =
        completion.choices[0]?.message?.content || 'No summary generated';
      this.logger.log(`Generated summary for Chapter ${chapterNumber}`);

      return summary;
    } catch (error) {
      this.logger.error(`Failed to generate summary: ${error.message}`);
      return `Unable to generate AI summary at this time. Please try again later.`;
    }
  }

  /**
   * Get a personalized daily reflection
   */
  async getDailyReflection(verseText: string): Promise<string> {
    if (!this.openai) {
      return `Daily reflections are currently unavailable. Please configure OPENROUTER_API_KEY in your environment.`;
    }

    try {
      const prompt = `You are a spiritual guide. Based on this verse from the Bhagavad Gita, provide a brief daily reflection:

"${verseText}"

Write a short, inspiring reflection (2-3 sentences) that:
- Captures the essence of the teaching
- Offers practical wisdom for today
- Is uplifting and actionable

Keep it concise and powerful.`;

      const completion = await this.openai.chat.completions.create(
        {
          model: this.model,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 200,
          temperature: 0.8,
        },
        {
          headers: {
            'HTTP-Referer': this.siteUrl,
            'X-Title': this.siteName,
          },
        },
      );

      const reflection =
        completion.choices[0]?.message?.content ||
        'Reflect on your path today.';

      return reflection;
    } catch (error) {
      this.logger.error(`Failed to generate reflection: ${error.message}`);
      return `Take a moment to reflect on the teachings today.`;
    }
  }

  /**
   * Answer questions about the Bhagavad Gita
   */
  async askQuestion(question: string, context?: string): Promise<string> {
    if (!this.openai) {
      return `AI Q&A is currently unavailable. Please configure OPENROUTER_API_KEY in your environment.`;
    }

    try {
      const prompt = context
        ? `You are a knowledgeable teacher of the Bhagavad Gita. Answer this question based on the provided context:

Context: ${context}

Question: ${question}

Provide a clear, helpful answer that is:
- Accurate to the teachings
- Easy to understand
- Practical and relevant
- 2-3 paragraphs`
        : `You are a knowledgeable teacher of the Bhagavad Gita. Answer this question:

Question: ${question}

Provide a clear, helpful answer based on the teachings of the Bhagavad Gita.`;

      const completion = await this.openai.chat.completions.create(
        {
          model: this.model,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 600,
          temperature: 0.7,
        },
        {
          headers: {
            'HTTP-Referer': this.siteUrl,
            'X-Title': this.siteName,
          },
        },
      );

      const answer =
        completion.choices[0]?.message?.content ||
        'I cannot answer that question at this time.';
      this.logger.log(`Answered question: ${question.substring(0, 50)}...`);

      return answer;
    } catch (error) {
      this.logger.error(`Failed to answer question: ${error.message}`);
      return `Unable to answer your question at this time. Please try again later.`;
    }
  }
}
