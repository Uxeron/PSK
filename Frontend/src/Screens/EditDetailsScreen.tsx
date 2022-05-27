import { useAuth0 } from "@auth0/auth0-react";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../Components/Spinner";
import { DetailsScreenItemProps, ItemCategory } from "../Data/model";
import { itemCategoryMap, itemConditionMap, mapperFullToEdit } from "../Data/utils";
import ItemService from "../Services/ItemService";
import { t } from "../text";
import { initialDetailScreenItem, Row } from "./DetailsScreen";


export const EditDetailsScreen = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { getAccessTokenSilently, isLoading, user } = useAuth0();
    const [data, setData] = useState<DetailsScreenItemProps>(initialDetailScreenItem)
    const [initialData, setInitialData] = useState<DetailsScreenItemProps>(initialDetailScreenItem)
    const [tempData, setTempData] = useState<DetailsScreenItemProps>(initialDetailScreenItem)

    const [name, setName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const [isOpen, setIsOpen] = useState(false)

    function modalPrimaryAction() {
        setIsOpen(false)
        window.location.reload();
    }

    function modalSecondaryAction() {
        setIsOpen(false)
        const submit = async () => {
            try {
                await getAccessTokenSilently().then((token: string) => {
                    ItemService.put({ accessToken: token, itemId: itemId ?? '', data: mapperFullToEdit({ ...data, name, description }), navigate }).then(() => setLoading(false))
                })
            } catch (e) {
                console.log(e);
            }
        };
        submit();
        navigate(`/details/${itemId}/edit`)
    }


    function openModal() {
        setLoading(false)
        setIsOpen(true)
    }


    useEffect(() => {
        const initalize = async () => {
            try {
                await getAccessTokenSilently().then((token: string) => { ItemService.getById({ accessToken: token, id: itemId ?? '' }).then((val) => { setInitialData(val); setData(val) }) })
            } catch (e) {
                console.log(e);
            }
        };
        initalize();
    }, [getAccessTokenSilently]);


    if (isLoading || loading) {
        return <Spinner />
    }

    const handleSubmit = () => {
        setLoading(true);
        const checkForChanges = async () => {
            try {
                await getAccessTokenSilently().then((token: string) => {
                    ItemService.getById({ accessToken: token, id: itemId ?? '' }).then((res) => {
                        setTempData(res);
                        (res.name === data.name && res.description === data.description) ? ItemService.put({ accessToken: token, itemId: itemId ?? '', data: mapperFullToEdit({ ...data, name, description }), navigate }).then(() => setLoading(false)) :
                            openModal()
                    })
                })
            } catch (e) {
                console.log(e);
            }
        };
        checkForChanges();
    }

    return (<>
        <div className="container px-6 pt-12 pb-16 mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
                {t.detailsScreen.editTitle}
            </h1>
            <div className="max-w-4xl mx-auto">
            </div>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {'Whoops! Someone already changed the item you were editing and he have a conflict :('}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Current data we have:
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Name: {tempData.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Description: {tempData.description}
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        What version you have worked on:
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Name: {initialData.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Description: {initialData.description}
                                    </p>
                                </div>

                                <div className={'flex flex-row w-max mx-auto'}>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                                            onClick={modalPrimaryAction}
                                        >
                                            Refresh data
                                        </button>
                                    </div>

                                    <div className="ml-6 mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                                            onClick={modalSecondaryAction}
                                        >
                                            Overwrite with your changes!
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
        <div className="lg:ml-auto  mx-auto mb-6 min-mx-sx z-50 w-full max-w-4xl overflow-visible bg-white rounded-lg drop-shadow-2xl dark:bg-gray-800">
            <div className="grid grid-cols-2 gap-4 p-4">
                {data.images && <div>
                    <img src={`${data.images[0].prefix},${data.images[0].imageData}`} />
                </div>}
                <div className={'mt-6'}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="ml-2 mr-auto">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                                {t.uploadScreen.card1.nameLabel}
                            </label>
                        </div>
                        <div className="mr-16 ml-auto">
                            <input onBlur={(event) => setName(event.target.value)} className="font-bold text-gray-700 dark:text-gray-200" placeholder={data.name ?? tempData.name} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="ml-2 mr-auto">
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                                {t.uploadScreen.card1.descriptionLabel}
                            </label>
                        </div>
                        <div className="mr-16 ml-auto">
                            <input onBlur={(event) => setDescription(event.target.value)} className="font-bold text-gray-700 dark:text-gray-200" placeholder={data.description ?? tempData.description} />
                        </div>
                    </div>
                    <Row label={t.uploadScreen.card1.categoryLabel} item={itemCategoryMap[data.category]} />
                    <Row label={t.uploadScreen.card1.conditionLabel} item={itemConditionMap[data.condition]} />

                </div>
            </div>
            <div className='w-max mx-auto'>
                <button onClick={() => handleSubmit()} className='px-4 mb-12 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80'>
                    Submit your edition
                </button>

            </div>
        </div>
        {/* <div className="flex flex-col w-48 mx-auto mt-4">
            <input onBlur={(event) => setName(event.target.value)} placeholder={data.name} className="border-2 my-2" />
            <input onBlur={(event) => setDescription(event.target.value)} placeholder={data.description} className="border-2 my-2" />
            <button onClick={() => handleSubmit()} className='px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80'>
                submit
            </button>
        </div> */}
    </>
    )
}

export const RowInput = (props: { label: string, item: string }) => {
    const { label, item } = props;
    return (
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="ml-2 mr-auto">
                <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                    {label}
                </label>
            </div>
            <div className="mr-16 ml-auto">
                <input className="font-bold text-gray-700 dark:text-gray-200" placeholder={item} />
            </div>
        </div>
    )
}