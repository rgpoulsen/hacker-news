"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IconLink, IconTrophyFilled } from "@tabler/icons-react";
import { SkeletonCard } from "@/components/SkeletonCard";

type StoryDetail = {
  story: {
    id: number;
    title: string;
    text?: string;
    url?: string;
    score: number;
    by: string;
  };
  user: {
    id: string;
    karma: number;
    created: number;
  };
};

export default function StoryPageClient() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<StoryDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/story/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Story not found");
        return r.json();
      })
      .then((json: StoryDetail) => setData(json))
      .catch(() => router.push("/404"))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return <SkeletonCard />;
  }
  if (!data) return null;

  const { story, user } = data;
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <div className="flex items-center flex-row">
        <h1 className="text-3xl font-bold">{story.title}</h1>
        <Link
          href="/"
          className="bg-orange-500 text-white py-2 px-4 rounded-xl hover:bg-black transition ml-auto"
        >
          Back to list
        </Link>
      </div>
      {story.text && (
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: story.text }}
        />
      )}
      {story.url && (
        <div className="flex items-center">
          <IconLink className="inline-block mr-2 text-orange-500" />
          <p>
            <span className="font-medium">Link:</span>{" "}
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-black transition"
            >
              {story.url}
            </a>
          </p>
        </div>
      )}
      <div className="flex items-center">
        <IconTrophyFilled className="inline-block mr-2 text-yellow-500" />
        <p>
          Score: <span className="font-bold">{story.score}</span>
        </p>
      </div>
      <section className="bg-white border border-gray-200 p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Author: {story.by}</h2>
        <p>
          <span className="font-medium">Karma:</span> {user.karma}
        </p>
        <p>
          <span className="font-medium">Joined:</span>{" "}
          {new Date(user.created * 1000).toLocaleDateString()}
        </p>
      </section>
    </div>
  );
}
