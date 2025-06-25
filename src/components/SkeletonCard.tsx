import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 max-w-[250px] w-auto" />
        <Skeleton className="h-4 max-w-[200px] w-auto" />
      </div>
    </div>
  );
}
