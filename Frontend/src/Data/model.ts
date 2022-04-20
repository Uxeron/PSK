export type UploadData = {
    name: string | null,
    description: string | null,
    image: string | null,
    condition: ItemCondition | null,
    category: ItemCategory | null,
    uploadDate: Date | null,
    userId: string | null,
    addressId: string | null,
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
