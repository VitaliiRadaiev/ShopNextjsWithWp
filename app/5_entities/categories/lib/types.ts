export type CategoryType = {
    databaseId: number;
    name: string;
    slug: string;
    image?: {
        sourceUrl: string;
        altText: string;
    }
}

type FilterGroupType = {
    id: string;
    categoryId: string;
    title: string;
    items: FilterItemType[];
}

type FilterItemType = {
    id: string;
    filterBlockId: string;
    title: string
}

export type AttributeType = {
    id: string;
    label: string;
    name: string;
    terms: {
        nodes: AttributeValueType[]
    }
}

export type AttributeValueType = {
    name: string;
    slug: string;
    id: string;
    databaseId: number;
}

export type TagType = {
    slug: string;
    name: string;
    databaseId: number;
}