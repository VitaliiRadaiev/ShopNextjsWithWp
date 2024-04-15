export { ListSearchSuggestions } from "../../4_features/main-search/ui/ListSearchSuggestions";
export { GridListProducts, GridListProductsSkeleton } from "./ui/GridListProducts"; 
export type { 
    GetProductsResponseType, 
    ProductSingleType,
    SortByType,
    ProductTagVariantsType,
    FetchProductsQueriesType
} from "./lib/types";
export { 
    fetchProducts, 
    fetchProductBySlug, 
    fetchProductsByTagsAndCategory,
    fetchRelatedProductsByProductSlug,
    searchProducts
} from "./lib/fetches";
export { ProductsApi } from "./lib/ProductsApi";
export { Gallery } from "./ui/Gallery";
export { Status } from "./ui/Status";
import { ProductCardRest } from "./ui/ProductCardRest";