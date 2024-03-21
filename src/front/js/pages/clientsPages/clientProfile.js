import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import axios from "axios";


const ClientProfile = () => {

    const { store, actions } = useContext(Context)

    const [profileData, setProfileData] = useState({

        name: "",
        email: "",
        rating: null
    });

    return (

        <div className="container">
            <>
                <h2 className="d-flex justify-content-center fw-bold mb-3">
                    Client Profile
                </h2>
                <div className="data-card client-data-card container d-flex justify-content-between">

                        <p>Name: {store.user.name}</p>
                        <p>Surname: {store.user.surname}</p>
                        <p>Date of birth: {store.user.date_of_birth}</p>
                        <p>Email: {store.user.email}</p>
                        <p>Phone: {store.user.phone}</p>
                        <p>Address: {store.user.address}</p>
                        <p>Rating: {store.user.rating}</p>

                </div>
            </>
        </div>
    );
};


export default ClientProfile;