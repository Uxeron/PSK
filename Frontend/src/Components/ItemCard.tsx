import React from "react";

type ItemCardProps = {
    id: string,
    name: string,
    description: string,
    image: string,
    isGivenAway?: boolean,
}

export const ItemCard = (props: ItemCardProps) => {
    const { id, name, description, image, isGivenAway = false } = props;

    return (
        <>
            <a className={`min-w-[200px] block ${isGivenAway ? `contrast-50` : ``}`} href={`/details/${id}`}>
                <img
                    className={`object-contain w-full h-80`}
                    src={image}
                />
                <h5 className="mt-4 text-xl font-bold text-gray-900">{name}</h5>
                {isGivenAway ? <p className="max-w-sm mt-1 text-orange-700">is given away</p> : undefined}
                <p className="max-w-sm mt-2 text-gray-700">
                    {description}
                </p>
            </a>
        </>
    )
}