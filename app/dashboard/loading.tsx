import SkeletonCard from "@/components/ui/SkeletonCard";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {/* Hero skeleton */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2 h-48 skeleton rounded-2xl" />
      {/* Activity skeleton */}
      <div className="h-48 skeleton rounded-2xl" />
      {/* Course skeletons */}
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
