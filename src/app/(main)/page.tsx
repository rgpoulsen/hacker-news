"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconSquareRoundedArrowRightFilled } from "@tabler/icons-react";
import { SkeletonList } from "@/components/SkeletonList";

type StorySummary = {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
};

export default function Home() {
  const [stories, setStories] = useState<StorySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/topstories")
      .then((result) => result.json())
      .then((data: StorySummary[]) => {
        setStories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API fetch error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="">
        {loading ? (
          <div>
            <p className="text-black font-bold text-xl pb-4">
              Loading top 20 stories…
            </p>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <SkeletonList key={idx} />
              ))}
            </div>
          </div>
        ) : (
          <ul className="w-full max-w-xl">
            {stories.map(({ id, title, url, score, by }) => (
              <li
                key={id}
                className="flex justify-between items-start border-b border-gray-300 py-4 transition-colors"
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    <Link
                      href={`/story/${id}`}
                      className="text-orange-500 hover:text-black transition"
                    >
                      {title}
                    </Link>
                  </h2>
                  <p className="text-sm">
                    <span className="font-medium">Score:</span> {score}{" "}
                    &nbsp;|&nbsp;
                    <span className="font-medium">Author:</span> {by}
                  </p>
                  {url && (
                    <p className="text-sm">
                      <span className="font-medium">URL:</span>{" "}
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-black transition"
                      >
                        {new URL(url).hostname}
                      </Link>
                    </p>
                  )}
                </div>

                <Link
                  href={`/story/${id}`}
                  className="text-sm font-medium text-orange-500 hover:text-black transition self-center"
                >
                  <IconSquareRoundedArrowRightFilled className="w-6 h-6" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
