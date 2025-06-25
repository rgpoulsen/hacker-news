import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;

  const storyRes = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  if (!storyRes.ok) return NextResponse.error();
  const story = await storyRes.json();

  const userRes = await fetch(
    `https://hacker-news.firebaseio.com/v0/user/${story.by}.json`
  );
  if (!userRes.ok) return NextResponse.error();
  const user = await userRes.json();

  return NextResponse.json({ story, user });
}
