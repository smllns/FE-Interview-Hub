import { NextResponse } from 'next/server';
import { NotionPage, Question } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { ids }: { ids: string[] } = await req.json();

    if (!ids || ids.length === 0) {
      return NextResponse.json([]);
    }

    // Parallel fetching for ids
    const promises = ids.map((id) =>
      fetch(`https://api.notion.com/v1/pages/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
        },
      }).then(async (res) => {
        if (!res.ok) {
          console.warn(`Failed to fetch page ${id}`);
          return null;
        }
        const page: NotionPage = await res.json();
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
      })
    );

    const results = await Promise.all(promises);
    const questions: Question[] = results.filter(
      (q): q is Question => q !== null
    );

    return NextResponse.json(questions);
  } catch (err: unknown) {
    console.error('Notion favourites fetch error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch favourites', details: String(err) },
      { status: 500 }
    );
  }
}
