import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";
import { ItemCategory} from "../../Data/model";
import { itemCategoryMapBrowse, itemCategoriesBrowse } from "../../Data/utils";

type Props = {
    setHandler: React.Dispatch<React.SetStateAction<{
        name: ItemCategory;
    }>>;
    value: {
        name: ItemCategory;
    };
    inBrowse?: boolean;
}

export const ItemCategoryListBoxDetails = (props : Props) => {
    const {setHandler, value, inBrowse} = props;
    console.log(itemCategoryMapBrowse[value.name]);

    return(
        <Listbox value={value} onChange={(val) => { setHandler(val); }}>
                    <div className="relative mt-1">
                    <Listbox.Button className={ ` ml-0 w-[160px] relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm`}>
                            <span className="block truncate">{itemCategoryMapBrowse[value.name]}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon
                                    className="w-5 h-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute w-full z-50 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {itemCategoriesBrowse.map((itemCategory, idx) => (
                                    <Listbox.Option
                                        key={idx}
                                        className={({ active }) =>
                                            `cursor-default select-none relative z-50 py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                                            }`
                                        }
                                        value={itemCategory}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {itemCategoryMapBrowse[itemCategory.name]}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
    )
}