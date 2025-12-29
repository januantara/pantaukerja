
import { Skeleton } from "~/components/ui/skeleton";

export const InterviewBoardSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-10" />
                </div>
            </div>
        ))}
    </div>
);
