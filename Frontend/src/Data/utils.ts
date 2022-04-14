import { ItemCategory, ItemCondition, UploadData } from "./model";

export const initialUploadData: UploadData = {
    name: null,
    description: null,
    image: null,
    condition: null,
    category: null,
    uploadDate: null,
    userId: null,
    addressId: null,
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