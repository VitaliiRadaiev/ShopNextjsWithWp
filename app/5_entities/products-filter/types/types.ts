export type FilterGroupType = {
    id: string;
    categoryId: string;
    title: string;
    items: FilterItemType[];
}

export type FilterItemType = {
    id: string;
    filterBlockId: string;
    title: string
}