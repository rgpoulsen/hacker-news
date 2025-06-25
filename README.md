This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

# 1 Clone & install

git clone https://github.com/rgpoulsen/hacker-news.git
cd hacker-news
npm install

# 2 Start the dev server (Turbopack)

npm run dev # http://localhost:3000

# 3 Build for production

npm run build
npm start

## Architecture and trade-offs

• Framework: Next.js 15 (App Router)
Out-of-the-box routing, server & client components, easy API routes.

• Native `fetch` inside API routes and components
OK for small data set. No built-in caching (could add React Query later).

• API layers in `/api/topstories` & `/api/story/[id]`
Acts as a proxy so UI never calls HN directly. Lets me cache data.

• Tailwind v4 + shadcn/ui components for styling
Rapid UI, dark-mode-ready, no custom CSS cascade headaches.

• Navigation speed by using server component + `loading.tsx` fallback
Keeps initial HTML SEO-friendly. Small delay masked by skeleton.

• Used vanilla React state management
Simplicity. Handling global store is not needed for the scope of this task.

## Ideas for improvement

• Data caching with React Query or SWR to avoid refetching on navigation.

• Infinite scroll / pagination after the first 20 stories.

• Unit & integration tests using e.g. Vitest + React Testing Library.

• Error boundaries and user-friendly fallbacks.

## Note along the way

The job was to find the top 20 stories using the API. However I found that there is a difference between fetching e.g. 20 stories and 100 stories. Stories with a high score such as +400, wouldn't appear in the top 20 stories, despite it had a higher score than some of the stories from the 20 stories fetch. This is very like due to their "hotness" algorithm, being something like score + time-decay. If the task was specified into finding the top 20 stories with the highest score, I would have instead fetched all stories the API allows (up to 500), sort them by score before rendering, slice to 20 and return them to the user. This would however create a longer wait time for the user and "spam" the hacker news free endpoint, so a cached database would have to be implemented to achieve a good and ethical result.
