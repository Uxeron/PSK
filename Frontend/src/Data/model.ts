export type UploadData = {
    name: string | null,
    description: string | null,
    condition: ItemCondition | null,
    category: ItemCategory | null,
    isToGiveAway: boolean | null,
    userId: string | null,
    addressId: string | null,
    tags: string | null,
    image: string | null,
}

export type BrowseData = {
    paging: {
        page: number,
        numOfPages: number,
        totalItems: number,
        itemsPerPage: number,
    },
    items: Array<BrowseItem>,
}

export type BrowseItem = {
    itemId: string,
    name: string,
    description: string,
    image: string,
    condition: ItemCondition,
    category: ItemCategory,
    uploadDate: string,
    city: string
}

export enum ItemCondition {
    Good,
    Normal,
    Bad,
}

export enum ItemCategory {
    Drill,
    Screwdriver,
    Hammer,
}

export enum ItemConditionBrowse {
    All,
    Good,
    Normal,
    Bad,
}

export enum ItemCategoryBrowse {
    All,
    Drill,
    Screwdriver,
    Hammer,
}
