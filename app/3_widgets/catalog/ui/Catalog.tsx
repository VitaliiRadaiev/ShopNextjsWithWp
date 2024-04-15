import { FilterBox } from '@/app/5_entities/catalog';
import { fetchCategoryBySlug } from '@/app/5_entities/categories';
import { H2 } from '@/app/6_shared/ui/Titles';
import { Filter } from './Filter';
import { FetchProductsQueriesType, ProductsApi, fetchProducts } from '@/app/5_entities/products';
import { SortByType } from '@/app/5_entities/products';
import { ProductsSort } from './ProductsSort';
import { Products } from './Products';
import Pagination from './Pagination';
import { FetchProductsRestQueriesType } from '@/app/5_entities/products/lib/ProductsApi';

interface CatalogProps {
    catalogSlug: string;
    searchParams: Record<string, string>
}

export async function Catalog({ catalogSlug, searchParams }: CatalogProps) {
    const categoryData = await fetchCategoryBySlug(catalogSlug);

    const queryOptions: FetchProductsRestQueriesType = {
        count: 15,
        categoryId: categoryData.productCategory.databaseId,
        tags: searchParams.tags && JSON.parse(searchParams.tags as string),
        minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
        maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
        inStock: Boolean(searchParams.inStock),
        filters: searchParams.filters && JSON.parse(searchParams.filters as string),
        sortBy: searchParams?.sortBy as SortByType || 'rank',
        page: searchParams?.page
    }
    const productsData = await ProductsApi.getProducts(queryOptions);
    
    return (
        <div className="container">
            <H2>{categoryData.productCategory.name}</H2>
            <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10 mt-4">
                <div>
                    <FilterBox>
                        <Filter
                            attributes={categoryData.attributes}
                            priceRange={{
                                lowestPrice: categoryData.priceRange.from,
                                highestPrice: categoryData.priceRange.to
                            }}
                            tags={categoryData.tags}
                        />
                    </FilterBox>
                </div>
                <div>
                    <ProductsSort />
                    <div className='mt-4'>
                        <Products products={productsData.products}/>
                    </div>
                    <div className="mt-4">
                        <Pagination totalPages={+productsData.totalPages}/>
                    </div>
                </div>
            </div>
        </div>
    );
}