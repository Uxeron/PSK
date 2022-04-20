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
