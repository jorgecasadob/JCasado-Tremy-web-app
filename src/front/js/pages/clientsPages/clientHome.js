import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import Promotions from "../../component/promotions";
import ClientAppointmentCard from "../../component/clientAppointmentCard";
import facialPromo1 from "../../../img/facialPromo1.png";
import img1Facial from "../../../img/1.png";
import img2HairCut from "../../../img/2.png";
import img3Makeup from "../../../img/3.png";
import img4Eyes from "../../../img/4.png";
import img5Nails from "../../../img/5.png";
import img6Wax from "../../../img/6.png";


const ClientHome = () => {

    const { store } = useContext(Context);

    const isAuthenticated = !!store.token;

    if (!isAuthenticated) {

        navigate("/");

        return null;

    }

    const [selectedService, setSelectedService] = useState(null);

    const navigate = useNavigate();

    const serviceImages = {
        "manicure-&-pedicure": img5Nails,
        "lashes-&-eyebrows": img4Eyes,
        "hairdressing": img2HairCut,
        "facials": img1Facial,
        "makeup": img3Makeup,
        "waxing": img6Wax
    };

    const handleServiceSelection = (service) => {

        setSelectedService(service);

        navigate("/productsMenuView");
    };

    return (

        <>
            <div className="clientHome">
                <Container fluid className="main-container">

                    <div className="d-flex justify-content-center">
                        <div className="row container mt-4">
                            <div className="d-flex justify-content-end col-6">
                                <div className="mt-5">
                                    <h1 className="facialCarePromo1 text-info">Facial Care Treatment</h1>
                                    <h4 className="facialCarePromo1 mt-2">15% Off</h4><br />
                                    <Button variant="info" className="text-white">Buy Now</Button>
                                </div>
                            </div>

                            <div className="promo-image-clinetView d-flex justify-content-center col-6">
                                <img className="rounded mt-2 mb-2" src={facialPromo1} height={290} width={260} alt="Facial Care" />
                            </div>
                        </div>
                    </div>

                    <Row className="mt-4">
                        <h4 className="mx-3 mb-3"><strong>Services</strong></h4>
                        {store.services.map((service, index) => (
                            <Col md={4} onClick={() => navigate(`/products/${service.id}`)} key={index} className="mb-4 d-flex justify-content-center">
                                <div className={`card w-75 ${selectedService === service ? 'selected' : ''}`} role="button" style={{ borderColor: 'rgb(242, 226, 247)' }}>
                                    <div className="clientServicesCardBtn card-body d-flex gap-3 align-items-center">
                                        <img src={serviceImages[service.name.replaceAll(" ", "-").toLowerCase()]} alt={`Service ${service.id}`} />
                                        <h5>{service.name}</h5>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <h4 className="mx-3 mt-4 mb-3"><strong>Next Appointment</strong></h4>

                    < ClientAppointmentCard />

                    <Promotions />

                </Container>
            </div>
        </>
    );
};


export default ClientHome;
