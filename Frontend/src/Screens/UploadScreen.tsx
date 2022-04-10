import React, { Fragment, useEffect, useState } from 'react';
import { NavBar } from '../Components/NavBar';
import { useFilePicker } from 'use-file-picker';
import { initialUploadData, itemCategories, itemCategoryMap, itemConditionMap, itemConditions, mockLocation, toGiveAway } from '../Data/utils';
import ItemService from '../Services/ItemService';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../Components/Spinner';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

export const UploadScreen = () => {
    const navigate = useNavigate();
    const [uploadData, setUploadData] = useState(initialUploadData);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [onLoad, setOnLoad] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(itemCategories[0])
    const [selectedCondition, setSelectedCondition] = useState(itemConditions[0])
    const [giveAwayState, setGiveAwayState] = useState(toGiveAway[0])
    const [location, setLocation] = useState(mockLocation[0])
    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        readAs: "DataURL",
        accept: "image/*",
        multiple: true,
        limitFilesConfig: { max: 5 },
        maxFileSize: 50,
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOnLoad(true);
        ItemService.upload(uploadData).then(() => { navigate('/') }
        );
    }

    const applyValuesToState = () => {
        setUploadData({
            name: name,
            description: description,
            condition: selectedCondition.name,
            category: selectedCategory.name,
            uploadDate: new Date(),
            userId: 'test userId',
            addressId: location.name,
            image: filesContent.map(file => file.content).toString(),
        })
    }

    const handleChange = () => { applyValuesToState(); console.log(uploadData) }

    useEffect(() => applyValuesToState(), [filesContent, name, description, selectedCategory, selectedCondition, location])

    if (loading || onLoad) {
        return <Spinner />
    }

    if (errors.length) {
        return <div>Error...</div>
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <NavBar />
                <div className="container px-6 pt-12 pb-16 mx-auto text-center">
                    <div className="max-w-lg mx-auto">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">Upload item</h1>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 h-max z-50">
                    <div>
                        <div className="self-center mr-4 ml-6 lg:ml-auto min-mx-sx h-max z-50 max-w-lg overflow-hidden bg-white rounded-lg drop-shadow-2xl dark:bg-gray-800">
                            <div className="p-4">
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Name</label>
                                <input value={name} onChange={event => { setName(event?.target.value); handleChange() }} id="emailAddress" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />

                                <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Description</label>
                                <textarea value={description} onChange={event => { setDescription(event?.target.value); handleChange() }} className="block w-full h-20 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />

                                <div className="w-72 mt-4 top-16">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Category: </label>
                                    <Listbox value={selectedCategory} onChange={(value) => { setSelectedCategory(value); handleChange() }}>
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                                <span className="block truncate">{itemCategoryMap[selectedCategory.name]}</span>
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
                                                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {itemCategories.map((itemCategory, idx) => (
                                                        <Listbox.Option
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
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
                                                                        {itemCategoryMap[itemCategory.name]}
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
                                </div>

                                <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Tags</label>
                                <input value={name} id="emailAddress" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />

                                <div className="w-72 mt-4 top-16">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Condition </label>
                                    <Listbox value={selectedCondition} onChange={(value) => { setSelectedCondition(value); handleChange() }}>
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                                <span className="block truncate">{itemConditionMap[selectedCondition.name]}</span>
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
                                                <Listbox.Options className=" w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {itemConditions.map((itemCondition, idx) => (
                                                        <Listbox.Option
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                                                                }`
                                                            }
                                                            value={itemCondition}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                    >
                                                                        {itemConditionMap[itemCondition.name]}
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
                                </div>

                                <div className="w-72 top-16 ">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="name">To give away: </label>
                                    <Listbox value={giveAwayState} onChange={setGiveAwayState}>
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                                <span className="block truncate">{giveAwayState.name}</span>
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
                                                <Listbox.Options className="w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {toGiveAway.map((giveAway, idx) => (
                                                        <Listbox.Option
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                                                                }`
                                                            }
                                                            value={giveAway}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                    >
                                                                        {giveAway.name}
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
                                </div>

                                <div className="w-72 top-16 ">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Pick up location: </label>
                                    <Listbox value={location} onChange={(value) => { setLocation(value); handleChange() }}>
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                                <span className="block truncate">{location.name}</span>
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
                                                <Listbox.Options className="w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {mockLocation.map((location, idx) => (
                                                        <Listbox.Option
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                                                                }`
                                                            }
                                                            value={location}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                    >
                                                                        {location.name}
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
                                </div>

                            </div>

                        </div>
                    </div>
                    <div>
                        <div className="self-center h-max ml-4 mr-6 lg:mr-auto lg:mr-auto min-mx-sx max-w-lg overflow-hidden bg-white rounded-lg drop-shadow-2xl dark:bg-gray-800">
                            <div className="p-8">
                                <label className="">Images:</label>
                                <div onClick={() => openFileSelector()} className="h-48 w-full flex justify-center items-center cursor-pointer self-center border-4 border-dashed bg-white rounded-lg dark:bg-gray-800">
                                    {filesContent.length === 0 ? <h2 className="top-1/2 text-1xl font-bold text-gray-400 dark:text-white md:text-2xl">
                                        Drop files to upload or <span className="text-blue-400 dark:text-blue-400">browse</span>
                                    </h2> :
                                        <img className="max-h-full max-w-full" src={filesContent[0].content} />}
                                </div>

                                <div className="container h-48 grid grid-cols-4 gap-2 items-center self-center">
                                    {filesContent.slice(1, filesContent.length).map((file, index) => (
                                        <div key={index}>
                                            <img alt={file.name} src={file.content} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-24">
                    <button type="submit" className="px-16 py-3 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        <h2 className="text-1xl font-bold text-white dark:text-white md:text-2xl">
                            Upload an item
                        </h2>
                    </button>
                </div>
            </div>
        </form>
    );
}
