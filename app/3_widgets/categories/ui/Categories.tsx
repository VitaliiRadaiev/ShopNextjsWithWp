import { CategoriesGrid, fetchCategories } from '@/app/5_entities/categories';
import { H2 } from '@/app/6_shared/ui/Titles';
import clsx from 'clsx';

export async function Categories() {
    const categories = await fetchCategories();
    return (
        <div className='container'>
            <H2>Категории</H2>
            <div className="mt-4">
                <CategoriesGrid categories={categories}/>
            </div>
        </div>
    );
}