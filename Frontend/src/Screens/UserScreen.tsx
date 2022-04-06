import React from "react"; 
import { useParams } from "react-router-dom";

export const UserScreen = () => {
    const { userId } = useParams();

    return (
        <>
            UserScreen - {userId}
        </>
    )
}
