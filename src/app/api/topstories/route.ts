import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  if (!res.ok) return NextResponse.error();

  const ids: number[] = await res.json();
  const top20 = ids.slice(0, 20);

  const stories = await Promise.all(
    top20.map(async (id) => {
      const r = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return r.json();
    })
  );

  stories.sort((a, b) => b.score - a.score);

  const summary = stories.map((s) => ({
    id: s.id,
    title: s.title,
    url: s.url,
    score: s.score,
    by: s.by,
  }));

  return NextResponse.json(summary);
}
