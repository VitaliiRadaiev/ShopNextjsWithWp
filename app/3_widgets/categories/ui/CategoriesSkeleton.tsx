import { CategoriesGridSkeleton } from "@/app/5_entities/categories";

export function CategoriesSkeleton() {
    return (
        <div className='container'>
            <div className='bg-gray-100 rounded w-[230px] h-[44px] lg:h-[54px] max-w-full'></div>
            <div className="mt-4">
                <CategoriesGridSkeleton />
            </div>
        </div>
    );
}