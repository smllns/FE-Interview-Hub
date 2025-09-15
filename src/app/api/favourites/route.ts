import { NextResponse } from 'next/server';
import { NotionPage, Question } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { ids }: { ids: string[] } = await req.json();

    if (!ids || ids.length === 0) {
      return NextResponse.json([]);
    }

    const questions: Question[] = [];

    for (const id of ids) {
      const res = await fetch(`https://api.notion.com/v1/pages/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
        },
      });

      if (!res.ok) {
        console.warn(`Failed to fetch page ${id}`);
        continue;
      }

      const page: NotionPage = await res.json();
      const props = page.properties;

      questions.push({
        id: page.id,
        question:
          props.Question?.title?.map((t) => t.plain_text).join('') || '',
        answer:
          props.Answer?.rich_text?.map((r) => r.plain_text).join('') || '',
        topic: props.Topic?.rich_text?.map((r) => r.plain_text).join('') || '',
        difficulty: props.Difficulty?.select?.name || '',
        section: props.Section?.select?.name || '',
        lang: props.Lang?.select?.name || '',
        example:
          props.Example?.rich_text?.map((r) => r.plain_text).join('') || null,
      });
    }

    return NextResponse.json(questions);
  } catch (err: unknown) {
    console.error('Notion favourites fetch error:', err);

    if (err instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to fetch favourites', details: err.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch favourites', details: String(err) },
      { status: 500 }
    );
  }
}
