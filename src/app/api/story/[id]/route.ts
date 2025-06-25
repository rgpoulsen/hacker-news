import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const storyRes = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${params.id}.json`
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
