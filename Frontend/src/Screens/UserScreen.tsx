import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from '../Services/UserService';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from '../Components/Spinner';
import { UserCard } from '../Components/UserCard';
import { UserDataInitialValues } from "../Data/utils";
import { UserData } from "../Data/model";
import { ItemCard } from "../Components/ItemCard";

export const UserScreen = () => {

    const [data, setData] = useState<UserData>(UserDataInitialValues)
    const { getAccessTokenSilently, isLoading } = useAuth0();
    const [accessToken, setAccessToken] = useState<string>('');

    useEffect(() => {
        const initalize = async () => {
            try {
                await getAccessTokenSilently().then((token) => { setAccessToken(token); UserService.getById({ accessToken: token }).then((val) => setData(val)) })
            } catch (e) {
                console.log(e);
            }
        };
        initalize();
    }, [getAccessTokenSilently]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="flex justify-center mt-8 mb-8"> 
                <UserCard id={data.userId} name={data.name} surname={data.surname} email={data.email} image={data.image} phoneNumber={data.phoneNumber} address={{
                    country: "Lithuania",
                    city: "Vilnius",
                    streetName: "Verkiu g. 15"
                }} />
            </div>
            <div className="m-auto min-w-[1000px] max-w-7xl grid grid-cols-4 gap-12 mb-16">
                <ItemCard id={""} name="Drill" description="Good" image={""} />
                <ItemCard id={""} name="Drill" description="Good" image={""} />
                <ItemCard id={""} name="Drill" description="Good" image={""} />
            </div>
            {/* Item card mapper */}
            {/*<div className="m-auto min-w-[1000px] max-w-7xl grid grid-cols-4 gap-12 mb-16">
                {data.items.map((data.listedItems) => { return <ItemCard key={data.listedItems.itemId} id={data.listedItems.itemId} name={data.listedItems.name} description={data.listedItems.description} image={data.listedItems.image} /> })}
            </div> */}

        </>
    )
}


