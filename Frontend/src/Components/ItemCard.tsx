import React from "react";

type ItemCardProps = {
    id: string,
    name: string,
    description: string,
    image: string
}

export const ItemCard = (props: ItemCardProps) => {
    const { id, name, description, image } = props;

    return (
        <a className="min-w-[200px] block" href={`/details/${id}`}>
            <img
                className="object-cover w-full h-80"
                src={image}
                alt=""
            />

            <h5 className="mt-4 text-xl font-bold text-gray-900">{name}</h5>

            <p className="max-w-sm mt-2 text-gray-700">
                {description}
            </p>
        </a>
    )
}