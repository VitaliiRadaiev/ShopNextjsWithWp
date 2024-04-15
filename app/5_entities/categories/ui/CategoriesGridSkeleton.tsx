import { shimmer } from '@/app/6_shared/utils/shimmer';

export function CategoriesGridSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`}>
            <div className="bg-gray-100 rounded h-36"></div>
            <div className="bg-gray-100 rounded h-36"></div>
            <div className="bg-gray-100 rounded h-36"></div>
            <div className="bg-gray-100 rounded h-36"></div>
            <div className="bg-gray-100 rounded h-36"></div>
        </div>
    );
}