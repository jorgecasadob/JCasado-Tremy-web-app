import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import axios from "axios";


const FairyProfile = () => {

  const { store, actions } = useContext(Context)

  const [profileData, setProfileData] = useState({

    name: "",
    email: "",
    rating: null
  });

  console.log(store.user);

  return (

    <div className="container">
      <>
        <h2 className="d-flex justify-content-center fw-bold mb-3">
          Fairy Profile
        </h2>
        <div className="fairy-data-card container mt-4">

          <p>Name: <span className="data-text-color">{store.user.name}</span></p>
          <p>Surname: <span className="data-text-color">{store.user.surname}</span></p>
          <p>Date of birth: <span className="data-text-color">{store.user.date_of_birth}</span></p>
          <p>Email: <span className="data-text-color">{store.user.email}</span></p>
          <p>Phone: <span className="data-text-color">{store.user.phone}</span></p>
          <p>Address: <span className="data-text-color">{store.user.address}</span></p>
          <p>Rating: <span className="data-text-color">{store.user.rating}</span></p>

        </div>
      </>

    </div>
  );
};


export default FairyProfile;