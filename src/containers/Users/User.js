import React from 'react';
import {useSelector} from "react-redux";

const User = () => {

    const user = useSelector(state => state.User);


    const showData = () => {
        if(user.isLoggedIn) {
            return <h1>{user.userMail}</h1>
        }
        if(!user.isLoggedIn) {
            return <p>Vous n'etes pas connecté</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            {showData()}
        </div>
    )
}

export default User;