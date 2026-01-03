export default function SkeletonCard() {
    return (
        <div className="card bg-base-100 border border-base-300 shadow-sm">
            <figure className="aspect-video overflow-hidden bg-base-200">
                <div className="skeleton h-full w-full"></div>
            </figure>
            <div className="card-body">
                <div className="skeleton h-6 w-3/4 mb-2"></div>
                <div className="skeleton h-4 w-full mb-1"></div>
                <div className="skeleton h-4 w-2/3 mb-3"></div>
                <div className="grid grid-cols-2 gap-1 mb-3">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="card-actions justify-end">
                    <div className="skeleton h-8 w-24"></div>
                </div>
            </div>
        </div>
    );
}
