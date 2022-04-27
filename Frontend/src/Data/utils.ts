import { ItemCategory, ItemCategoryBrowse, ItemCondition, ItemConditionBrowse, UploadData } from "./model";

export const initialUploadData: UploadData = {
    name: null,
    description: null,
    condition: null,
    category: null,
    isToGiveAway: null,
    userId: null,
    addressId: null,
    tags: null,
    image: null,
}

export const itemCategoryMap = {
    [ItemCategory.Drill]: "Drill",
    [ItemCategory.Screwdriver]: "Screwdriver",
    [ItemCategory.Hammer]: "Hammer",
}

export const itemCategories = [
    {name: ItemCategory.Drill},
    {name: ItemCategory.Screwdriver},
    {name: ItemCategory.Hammer},
]

export const itemConditionMap = {
    [ItemCondition.Good]: "Good",
    [ItemCondition.Normal]: "Normal",
    [ItemCondition.Bad]: "Bad",
}

export const itemConditions = [
    {name: ItemCondition.Good},
    {name: ItemCondition.Normal},
    {name: ItemCondition.Bad},
]

export const toGiveAway = [
    {name: 'Yes'},
    {name: 'No'}
]

export const mockLocation = [
    {name: 'Jeruzales kavine'},
    {name: 'Traku g. pliusai'},
    {name: 'Didlaukio g. 47'}
]

export const BrowseDataInitialValues = {
    paging: {
        page: 0,
        numOfPages: 0,
        totalItems: 0,
        itemsPerPage: 0,
    },
    items: []
}

export const itemCategoryMapBrowse = {
    [ItemCategoryBrowse.All]: "All",
    [ItemCategoryBrowse.Drill]: "Drill",
    [ItemCategoryBrowse.Screwdriver]: "Screwdriver",
    [ItemCategoryBrowse.Hammer]: "Hammer",
}

export const itemCategoriesBrowse = [
    {name: ItemCategoryBrowse.All},
    {name: ItemCategoryBrowse.Drill},
    {name: ItemCategoryBrowse.Screwdriver},
    {name: ItemCategoryBrowse.Hammer},
]

export const itemConditionMapBrowse = {
    [ItemConditionBrowse.All]: "All",
    [ItemConditionBrowse.Good]: "Good",
    [ItemConditionBrowse.Normal]: "Normal",
    [ItemConditionBrowse.Bad]: "Bad",
}

export const itemConditionBrowse = [
    {name: ItemConditionBrowse.All},
    {name: ItemConditionBrowse.Good},
    {name: ItemConditionBrowse.Normal},
    {name: ItemConditionBrowse.Bad},
]