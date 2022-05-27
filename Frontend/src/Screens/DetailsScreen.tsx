import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../Components/Spinner";
import { DetailsScreenItemProps, ItemCategory, ItemCondition } from "../Data/model";
import { itemCategoryMap, itemConditionMap, mapperFullToEdit, mockAdress } from "../Data/utils";
import ItemService from "../Services/ItemService";
import { t } from "../text";
import "react-datepicker/dist/react-datepicker.css";

export const initialDetailScreenItem: DetailsScreenItemProps = {
    address: {
        addressId: 'string',
        country: 'string',
        city: 'string',
        streetName: 'string',
    },
    category: ItemCategory.Drill,
    condition: ItemCondition.Good,
    description: "string",
    images: null,
    isToGiveAway: true,
    isGivenAway: false,
    itemId: "string",
    name: "string",
    from: "string",
    to: "string",
    updateDate: "string",
    uploadDate: "2022-04-28T00:57:28.4573801",
    user: {
        userId: 'string',
        name: 'string',
        surname: 'string',
        email: 'string',
        phoneNumber: 'string',
        image: [{ imageId: 'string', imageData: 'string', thumbnailImageData: 'string', name: 'string', prefix: 'string' }],
        address: mockAdress
    },
}

export const DetailsScreen = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<DetailsScreenItemProps>(initialDetailScreenItem)
    const { getAccessTokenSilently, isLoading, user } = useAuth0();
    const [date, setDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(true);

    if (isLoading) {
        return <Spinner />
    }

    const handleEdit = () => {
        const initalize = async () => {
            try {
                await getAccessTokenSilently().then((token: string) => { ItemService.put({ accessToken: token, itemId: itemId ?? '', data: mapperFullToEdit({ ...data, from: new Date().toISOString(), to: date.toISOString() ?? new Date().toISOString() }), navigate }) })
            } catch (e) {
                console.log(e);
            }
        };
        initalize();
    }
    console.log(itemId?.toUpperCase())
    useEffect(() => {
        const initalize = async () => {
            try {
                await getAccessTokenSilently().then((token: string) => { ItemService.getById({ accessToken: token, id: itemId ?? '' }).then((val) => { setData(val); setDate(new Date(val.to)) }) })
            } catch (e) {
                console.log(e);
            }
        };
        initalize();
    }, [getAccessTokenSilently]);

    return (
        <>
            <div className="container px-6 pt-12 pb-16 mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
                    {t.detailsScreen.title}
                </h1>

                <p className="text-md font-bold text-orange-800 dark:text-white md:text-lg">
                    {new Date(data.to ?? '').getTime() > new Date().getTime() ? "item is currently taken  " : ""}
                    {data.isGivenAway ? "item is given away" : ""}
                </p>
                <div className="max-w-4xl mx-auto">
                </div>
            </div>
            <div className="mx-16 grid grid-cols-2">
                <div className="lg:ml-auto min-mx-sx z-50 w-full max-w-4xl overflow-visible bg-white rounded-lg drop-shadow-2xl dark:bg-gray-800">
                    <div className="grid grid-cols-2 gap-4 p-4">
                        {data.images && <div>
                            <img src={`${data.images[0].prefix},${data.images[0].imageData}`} />
                        </div>}
                        <div>
                            <Row label={t.uploadScreen.card1.nameLabel} item={data.name} />
                            <Row label={t.uploadScreen.card1.descriptionLabel} item={data.description} />
                            <Row label={t.uploadScreen.card1.categoryLabel} item={itemCategoryMap[data.category]} />
                            <Row label={t.uploadScreen.card1.conditionLabel} item={itemConditionMap[data.condition]} />
                            <Row label={"Address:"} item={data.address?.streetName ?? ''} />
                            <Row label={"User:"} item={data.user?.name ?? ''} />
                            {(data.user?.userId === user?.sub && !data.isGivenAway) && <div className="pb-4 mx-auto ">
                                <button onClick={() => navigate(`/details/${itemId}/edit`)} className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80">
                                    {"Edit"}
                                </button>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="w-full" >
                    <div className="mx-auto lg:ml-auto min-mx-sx z-50 max-w-xl overflow-visible bg-white rounded-lg drop-shadow-2xl dark:bg-gray-800">

                        <div className="p-4 ml-2 mr-auto">
                            <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                                {"Owner actions: "}
                            </h1>
                        </div>
                        {!data.isToGiveAway ? <>
                            <div className=" px-4 pb-4 ml-2 mr-auto">
                                <button onClick={() => handleEdit()} className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80">
                                    {"Mark as occupied"}
                                </button>
                            </div>
                            {showDatePicker &&
                                <div className="flex">
                                    <div className="ml-6">
                                        <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                                            {'Occupied till: '}
                                        </label>
                                    </div>
                                    <div className="ml-2">
                                        <DatePicker selected={date} onChange={(d) => setDate(d ?? date)} />
                                    </div>
                                </div>}
                        </> :
                            <div className=" px-4 pb-4 ml-2 mr-auto">
                                <button onClick={() => { data.isGivenAway = !data.isGivenAway; handleEdit() }} className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80">
                                    {data.isGivenAway ? "Mark as not given away" : "Mark as given away"}
                                </button>
                            </div>}


                        <div className="p-4 ml-2 mr-auto">
                            <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                                {"Contact on:"}
                            </h1>
                        </div>
                        <div className="px-4 pb-4 ml-2 mr-auto">
                            {/* TODO: add actual user contacts */}
                            <button onClick={() => window.open('https://www.facebook.com/marius.somka/', "_blank")} className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80">
                                {"Facebook"}
                            </button>
                        </div>
                        <div className="px-4 pb-4 ml-2 mr-auto">
                            <button onClick={() => window.open('mailto:email@example.com?subject=Interested%20in%20your%20Nexus%20listing!', "_blank")} className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80">
                                {"Email"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const Row = (props: { label: string, item: string }) => {
    const { label, item } = props;
    return (
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="ml-2 mr-auto">
                <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                    {label}
                </label>
            </div>
            <div className="mr-16 ml-auto">
                <label className="font-bold text-gray-700 dark:text-gray-200" htmlFor="name">
                    {item}
                </label>
            </div>
        </div>
    )
}