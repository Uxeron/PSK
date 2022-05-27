import React from "react";

type UserCardProps = {
    id: string,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    image: string,
    address: {
        country: string,
        city: string,
        streetName: string
    }
}

export const UserCard = (props: UserCardProps) => {
    const { name, surname, email, phoneNumber, address } = props;

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-700">{name} {surname}</div>
                <p className="text-gray-700 text-base">
                    <p>Email: {email}</p>
                    <p>Phone Number: {phoneNumber}</p>
                    <p>Location: {address.country}, {address.city}, {address.streetName}</p>
                </p>
            </div>
        </div>
    )
} 