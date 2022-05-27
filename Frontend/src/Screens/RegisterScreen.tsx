import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UploadUser, User } from "../Data/model";
import UserService from "../Services/UserService";

export const RegisterScreen = () => {
    const [accessToken, setAccessToken] = useState<string>('');
    const navigate = useNavigate();
    const { user, getAccessTokenSilently } = useAuth0();
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [streetName, setStreetName] = useState<string>('');

    useEffect(() => {
        const initalize = async () => {
            try {
                await getAccessTokenSilently().then((token) => { setAccessToken(token) })
            } catch (e) {
                console.log(e);
            }
        };
        initalize();
    }, [getAccessTokenSilently]);

    const createUser = (): UploadUser => ({
        userId: user?.sub ?? '',
        name,
        surname,
        email,
        phoneNumber,
        image: "string",
        address: {
            country,
            city,
            streetName,
        }
    });

    const handleSubmit = () => {
        UserService.create({ accessToken, user: createUser(), navigate }).then(() => navigate('/browse'))
    }

    return (
        <>
            <div className="lg:ml-auto  mx-auto mb-6 min-mx-sx z-50 w-full max-w-md overflow-visible bg-white rounded-lg drop-shadow-2xl dark:bg-gray-800">
                <div className="w-max mx-auto ">

                    <h1 className="text-2xl mt-6 pt-6 font-bold text-gray-800 dark:text-white">
                        {"Fill in your account info"}
                    </h1>
                </div>
                <div className="flex flex-col p-4 mt-6 max-w-sm mx-auto">
                    <input onBlur={(event) => setName(event.target.value)} placeholder="name" className="border-2 my-2 " />
                    <input onBlur={(event) => setSurname(event.target.value)} placeholder="surname" className="border-2 my-2" />
                    <input onBlur={(event) => setEmail(event.target.value)} placeholder="email" className="border-2 my-2" />
                    <input onBlur={(event) => setPhoneNumber(event.target.value)} placeholder="phoneNumber" className="border-2 my-2" />

                    <input onBlur={(event) => setCountry(event.target.value)} placeholder="country" className="border-2 mb-2 mt-6" />
                    <input onBlur={(event) => setCity(event.target.value)} placeholder="city" className="border-2 my-2" />
                    <input onBlur={(event) => setStreetName(event.target.value)} placeholder="street" className="border-2 my-2" />
                    <button onClick={() => handleSubmit()} className='my-4 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80'>
                        submit
                    </button>
                </div>

            </div>
        </>
    )
}