import React from 'react';
import {useSelector} from "react-redux";

const User = () => {

    const user = useSelector(state => state.User);


    const showData = () => {
        console.log(user);
        if(user.isLoggedIn) {
            return (
                <>
                    <h1>Mon Compte</h1>
                    <p>{user.user.userInfo.userMail}</p>
                    <p>{user.user.userInfo.userPassword}</p>
                </>
            )
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