import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from '../Services/UserService';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from '../Components/Spinner';
import { UserCard } from '../Components/UserCard';
import { ExpandedUserDataInitialValues } from "../Data/utils";
import { ExpandedUser, User } from "../Data/model";
import { ItemCard } from "../Components/ItemCard";

export const UserScreen = () => {

    const [data, setData] = useState<ExpandedUser>(ExpandedUserDataInitialValues)
    const { getAccessTokenSilently, isLoading } = useAuth0();
    const { userId } = useParams();
    const [accessToken, setAccessToken] = useState<string>('');

    useEffect(() => {
        const initalize = async () => {
            try {
                await getAccessTokenSilently().then((token) => { setAccessToken(token); UserService.getById({ accessToken: token, id: userId ?? '' }).then((val) => setData(val.data)) })
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
                    country: data.address.country,
                    city: data.address.city,
                    streetName: data.address.streetName,
                }} />
            </div>
            {/* Item card mapper */}
            <div className="m-auto min-w-[1000px] max-w-7xl grid grid-cols-4 gap-12 mb-16">
                {data.listedItems.map((item) => { return <ItemCard key={item.itemId} id={item.itemId} name={item.name} description={item.description} image={item.image} isGivenAway={item.isGivenAway} /> })}
            </div>

        </>
    )
}
