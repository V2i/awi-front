import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {patchUser} from "../../actions/UserActions";

const User = () => {

    const user = useSelector(state => state.User);

    const initialUser = {
        userName: "",
        userPassword: "",
    };

    const [userState, setState] = useState(initialUser);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(patchUser)
    };

    const handleChange = (event) => {
        if(event.target) {
            const { name, value } = event.target;
            setState({ ...userState, [name]: value });
        } 
    };

    const showData = () => {
        console.log(user);
        if(user.isLoggedIn) {
            return (
                <>
                    <h1>Mon Compte</h1>
                    {/* <p>{user.user.userInfo.userMail}</p> */}
                    {/* <p>{user.user.userInfo.userPassword}</p> */}
                    <form onSubmit={handleSubmit}>
                        <label>
                            Adresse mail :
                            <input type="text" name="userName" value={userState.userName} onChange={handleChange}></input>
                        </label>
                        <label>
                            Mot de passe :
                            <input type="password" name="userPassword" value={userState.userPassword} onChange={handleChange}></input>
                        </label>
                        <input type="submit" text="Envoyer" value="Envoyer" />
                    </form>
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