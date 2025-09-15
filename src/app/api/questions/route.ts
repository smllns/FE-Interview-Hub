import { NextResponse } from 'next/server';
import { NotionQueryResponse, NotionPage, Question } from '@/lib/types';

export async function GET() {
  try {
    const questions: Question[] = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const res = await fetch(
        `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page_size: 100,
            start_cursor: startCursor,
          }),
        }
      );

      const data: NotionQueryResponse = await res.json();

      const mapped = data.results.map((page: NotionPage): Question => {
        const props = page.properties;
        return {
          id: page.id,
          question:
            props.Question?.title?.map((t) => t.plain_text).join('') || '',
          answer:
            props.Answer?.rich_text?.map((r) => r.plain_text).join('') || '',
          topic:
            props.Topic?.rich_text?.map((r) => r.plain_text).join('') || '',
          difficulty: props.Difficulty?.select?.name || '',
          section: props.Section?.select?.name || '',
          lang: props.Lang?.select?.name || '',
          example:
            props.Example?.rich_text?.map((r) => r.plain_text).join('') || null,
        };
      });

      questions.push(...mapped);

      hasMore = data.has_more;
      startCursor = data.next_cursor;
    }

    return NextResponse.json(questions);
  } catch (err: unknown) {
    console.error('Notion fetch error:', err);

    if (err instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to fetch questions', details: err.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch questions', details: String(err) },
      { status: 500 }
    );
  }
}
