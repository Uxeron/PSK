import React from "react"; 
import { useParams } from "react-router-dom";

export const DetailsScreen = () => {
    const { itemId } = useParams();

    return (
        <>
            DetailsScreen - {itemId}
        </>
    )
}
