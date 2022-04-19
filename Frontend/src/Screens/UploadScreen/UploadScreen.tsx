import React, { useEffect, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import { initialUploadData, itemCategories, itemConditions, mockLocation, toGiveAway } from '../../Data/utils';
import ItemService from '../../Services/ItemService';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../Components/Spinner';
import { toast } from 'react-toastify';
import { ItemCategoryListBox } from './InputFields/ItemCategoryListBox';
import { ItemConditionListBox } from './InputFields/ItemConditionListBox';
import { TrueFalseSelection } from './InputFields/TrueFalseSelection';
import { LocationListBox } from './InputFields/LocationListBox';
import { t } from '../../text';

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
        ItemService.upload(uploadData);
        toast('Your item is being processed at the moment.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: "info",
        });
        navigate('/');
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
                <div className="container px-6 pt-12 pb-16 mx-auto text-center">
                    <div className="max-w-lg mx-auto">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
                            {t.uploadScreen.title}
                        </h1>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 h-[572px] z-50">
                    <div>
                        <div className="self-center mr-4 ml-6 lg:ml-auto min-mx-sx z-50 max-w-lg overflow-visible bg-white rounded-lg drop-shadow-2xl dark:bg-gray-800">
                            <div className="p-4">
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                                    {t.uploadScreen.card1.nameLabel}
                                </label>
                                <input value={name} onChange={event => { setName(event?.target.value); handleChange() }} id="emailAddress" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />

                                <div className="mt-4 top-16">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                                        {t.uploadScreen.card1.descriptionLabel}
                                    </label>
                                    <textarea value={description} onChange={event => { setDescription(event?.target.value); handleChange() }} className="block w-full h-20 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" />
                                </div>

                                <div className="w-72 mt-4 top-16">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                                        {t.uploadScreen.card1.categoryLabel}
                                    </label>
                                    <ItemCategoryListBox setHandler={setSelectedCategory} value={selectedCategory} handleChange={handleChange} />
                                </div>

                                <div className="mt-4 top-16">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                                        {t.uploadScreen.card1.tagsLabel}
                                    </label>
                                    <input value={name} id="emailAddress" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                </div>

                                <div className="w-72 mt-4 top-16">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                                        {t.uploadScreen.card1.conditionLabel}
                                    </label>
                                    <ItemConditionListBox setHandler={setSelectedCondition} value={selectedCondition} handleChange={handleChange} />
                                </div>

                                <div className="w-72 mt-4 top-16 ">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                                        {t.uploadScreen.card1.toGiveAwayLabel}
                                    </label>
                                    <TrueFalseSelection setHandler={setGiveAwayState} value={giveAwayState} handleChange={handleChange} />
                                </div>

                                <div className="w-72 mt-4 top-16 ">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                                        {t.uploadScreen.card1.locationLabel}
                                    </label>
                                    <LocationListBox setHandler={setLocation} value={location} handleChange={handleChange} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div className="self-center h-max ml-4 mr-6 lg:mr-auto lg:mr-auto min-mx-sx max-w-lg overflow-hidden bg-white rounded-lg drop-shadow-2xl dark:bg-gray-800">
                            <div className="p-8">
                                <label className="">
                                    {t.uploadScreen.card2.label}
                                </label>
                                <div onClick={() => openFileSelector()} className="h-48 w-full flex justify-center items-center cursor-pointer self-center border-4 border-dashed bg-white rounded-lg dark:bg-gray-800">
                                    {filesContent.length === 0 ? <h2 className="top-1/2 text-1xl font-bold text-gray-400 dark:text-white md:text-2xl">
                                        {t.uploadScreen.card2.input[0]} <span className="text-blue-400 dark:text-blue-400">{t.uploadScreen.card2.input[1]}</span>
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
                <div className="flex justify-center mt-36">
                    <button type="submit" className="px-16 py-3 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        <h2 className="text-1xl font-bold text-white dark:text-white md:text-2xl">
                            {t.uploadScreen.submitButton}
                        </h2>
                    </button>
                </div>
            </div>
        </form>
    );
}
