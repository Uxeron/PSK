export type UploadData = {
    name: string | null,
    description: string | null,
    condition: ItemCondition | null,
    category: ItemCategory | null,
    isToGiveAway: boolean | null,
    userId: string | null,
    image: string | null,
}

export type DetailsScreenItemProps = {
    address: {
        addressId: string,
        country: string,
        city: string,
        streetName: string,
    } | null,
    category: ItemCategory,
    condition: ItemCondition,
    description: string,
    images: [{ imageId: string, imageData: string, thumbnailImageData: string, name: string, prefix: string }] | null,
    isToGiveAway: boolean,
    isGivenAway: boolean,
    itemId: string,
    name: string,
    to: string,
    from: string,
    updateDate: string,
    uploadDate: "2022-04-28T00:57:28.4573801"
    user: {
        userId: string,
        name: string,
        surname: string,
        email: string,
        phoneNumber: string,
        image: [{ imageId: string, imageData: string, thumbnailImageData: string, name: string, prefix: string }],
        address: Adress
    } | null,
}

export type EditData = {
    itemId: string
    name: string,
    description: string,
    condition: ItemCondition,
    category: ItemCategory,
    isToGiveAway: boolean,
    isGivenAway: boolean,
    from: string,
    to: string,
    uploadDate: string,
    userId: string,
    addressId: string,
    image: string,
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
    city: string,
    isGivenAway: boolean,
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

export type User = {
    userId: string,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    image: string,
    address: Adress,
}


export type ExpandedUser = {
    userId: string,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    image: string,
    address: Adress,
    listedItems: BrowseItem[]
}

export type UploadUser = {
    userId: string,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    image: string,
    address: UploadAdress,
}

export type Adress = {
    addressId: string,
    country: string,
    city: string,
    streetName: string,
}

export type UploadAdress = Omit<Adress, "addressId">;

export type EditFullItemData = {
    name: string,
    description: string,
    condition: ItemCondition,
    category: ItemCategory,
    isToGiveAway: boolean,
}

export type EditOccupationData = {
    from: string,
    to: string,
    isGivenAway: boolean,
}