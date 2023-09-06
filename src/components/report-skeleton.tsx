import { Skeleton } from "./ui/skeleton";

export function ReportSkeleton() {
  return (
    <div className="grid grid-cols-3 px-8 py-1 lg:px-16">
      <div className="flex items-center">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="ml-2 h-6 w-[200px]" />
      </div>
      <div className="mx-auto flex items-center">
        <Skeleton className="ml-8 h-8 w-[80px] rounded" />
        <Skeleton className="ml-8 h-8 w-[80px] rounded" />
        <Skeleton className="ml-8 h-8 w-[80px] rounded" />
      </div>
      <div className="ml-auto flex items-center space-x-2.5 overflow-hidden">
        <Skeleton className="h-8 w-8 rounded " />
        <div className="h-1 w-1 animate-pulse rounded-full bg-muted"></div>
        <Skeleton className="h-8 w-8 rounded " />
      </div>
    </div>
  );
}
