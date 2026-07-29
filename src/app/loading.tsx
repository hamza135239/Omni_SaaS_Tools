export default function Loading() {
  return (
    <div className="container-content py-10 animate-fade-in">
      {/* Hero Skeleton */}
      <div className="h-[400px] w-full skeleton rounded-2xl mb-10" />
      
      {/* Category Pills Skeleton */}
      <div className="flex gap-3 mb-8">
        <div className="h-8 w-20 skeleton rounded-full" />
        <div className="h-8 w-24 skeleton rounded-full" />
        <div className="h-8 w-28 skeleton rounded-full" />
        <div className="h-8 w-20 skeleton rounded-full" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card p-5 space-y-4">
            <div className="h-44 w-full skeleton rounded-xl" />
            <div className="h-6 w-3/4 skeleton rounded" />
            <div className="h-4 w-full skeleton rounded" />
            <div className="h-4 w-2/3 skeleton rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
