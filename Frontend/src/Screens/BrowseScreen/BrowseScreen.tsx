import React, { useState, useEffect, Fragment } from 'react';
import { ItemCard } from '../../Components/ItemCard';
import { Pagination } from '../../Components/Pagination';
import { BrowseDataInitialValues, itemCategories, itemCategoriesBrowse, itemCategoryMap, itemCategoryMapBrowse, itemConditionBrowse, itemConditionMapBrowse, itemConditions } from '../../Data/utils';
import ItemService from '../../Services/ItemService';
import { BrowseData, ItemCategory, ItemCondition } from '../../Data/model'
import { ItemCategoryListBoxBrowse } from './ItemCategoryListBoxBrowse';
import { ItemConditionListBoxBrowse } from './ItemConditionListBoxBrowse';

export const BrowseScreen = () => {

    // const [items, setItems] = useState([] as BrowseData[])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [data, setData] = useState<BrowseData>(BrowseDataInitialValues)
    const categoryPlaceholder = "select category :)"
    const [category, setCategory] = useState<{name: ItemCategory;}>(itemCategories[0])
    const [condition, setCondition] = useState<{name: ItemCondition;}>(itemConditions[0])

    //initial upload
    useEffect(() => {
        ItemService.getAll({ page: currentPage }).then((val) => setData(val));
    }, [])

    //on pagination click
    useEffect(() => {
        ItemService.getAll({ page: currentPage }).then((val) => setData(val));
    }, [currentPage])

    const getFiltered = () => ItemService.getAll({ page: currentPage, category: itemCategoryMapBrowse[category.name] }).then((val) => setData(val));
    
    return (
        <>
            <div className="w-[60%] min-w-[1024px] p-4 flex flex-row mb-12 mt-6 mx-auto lg:ml-auto min-mx-sx z-50 overflow-visible bg-white rounded-lg drop-shadow-2xl dark:bg-gray-800">
                <input id="email" type="text" className="px-4 py-2 text-gray-700 bg-white border rounded-md sm:mx-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Search by name or tag..." />
                
                <ItemCategoryListBoxBrowse value={category} setHandler={setCategory}/>
                <ItemConditionListBoxBrowse value={condition} setHandler={setCondition}/>
                
                <button onClick={() => getFiltered()} className="px-4 mx-auto py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    Apply filter
                </button>
            </div>
            <div className="m-auto min-w-[1000px] max-w-7xl grid grid-cols-4 gap-12 mb-16">
                {data.items.map((item) => { return <ItemCard key={item.itemId} id={item.itemId} name={item.name} description={item.description} image={item.image} /> })}
            </div>
            <Pagination amountOfPages={data.paging.numOfPages} currentPage={data.paging.page} setCurrentPage={setCurrentPage} />
        </>

    );
}
