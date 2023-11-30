import { Skeleton } from "./ui/skeleton";

export function ReportCardSkeleton() {
  return (
    <div className="z-20 flex h-32 w-64 flex-col items-start justify-normal gap-1 rounded-lg bg-card p-2 text-card-foreground shadow hover:shadow-lg">
      <div className="flex w-full items-center gap-3">
        <Skeleton className="h-8 w-8" />
        <div className="w-full truncate pr-2 font-semibold text-primary">
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
      <div className="ml-auto">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="ml-auto">
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="ml-auto">
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>
    </div>
  );
}
