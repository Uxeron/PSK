import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { User } from "../Data/model";
import UserService from "../Services/UserService";

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export const RegisterScreen = () => {
    const [accessToken, setAccessToken] = useState<string>('');
    const navigate = useNavigate();
    const { user, getAccessTokenSilently } = useAuth0();
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

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

    const createUser = (): User => ({
        userId: user?.sub ?? '',
        name,
        surname,
        email,
        phoneNumber,
        image: "string",
        address: {
            addressId: uuid(),
            country: "string",
            city: "string",
            streetName: "string"
        }
    });

    const handleSubmit = () => {
        UserService.create({ accessToken, user: createUser(), navigate }).then(() => navigate('/browse'))
    }

    return (
        <div className="flex flex-col w-48 mx-auto mt-4">
            <input onBlur={(event) => setName(event.target.value)} placeholder="name" className="border-2 my-2" />
            <input onBlur={(event) => setSurname(event.target.value)} placeholder="surname" className="border-2 my-2" />
            <input onBlur={(event) => setEmail(event.target.value)} placeholder="email" className="border-2 my-2" />
            <input onBlur={(event) => setPhoneNumber(event.target.value)} placeholder="phoneNumber" className="border-2 my-2" />
            <button onClick={() => handleSubmit()} className='px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80'>
                submit
            </button>
        </div>
    )
}