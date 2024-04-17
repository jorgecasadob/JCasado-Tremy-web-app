import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";

import FairyOptionsCard from "../../component/fairyOptionsCard"
import FairyAppointmentCard from "../../component/fairyAppointmentCard";
import img1Facial from "../../../img/1.png";
import img2HairCut from "../../../img/2.png";
import img3Makeup from "../../../img/3.png";
import img4Eyes from "../../../img/4.png";
import img5Nails from "../../../img/5.png";
import img6Wax from "../../../img/6.png";
import avatar2 from "../../../img/ororoMunroe.png";


const FairyHome = () => {

    const { store } = useContext(Context);

    const navigate = useNavigate();

    const isAuthenticated = !!store.token;

    if (!isAuthenticated) {

        navigate("/");

        return null;

    }

    const [selectedService, setSelectedService] = useState(null);

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

        navigate("/fairyMenuView");
    };

    useEffect(() => {

        if (!store.token) {

            navigate("/");
        }

    }, [store.token, navigate])

    return (

        <>
            <div className="FairyHome">
                <Container fluid className="main-container">
                    <div className="container d-flex justify-content-center">
                        <div>
                            <h2 className="fairyHomegretting">Ok fairy, let's spread some beauty today!</h2><br />
                            <div className="d-flex justify-content-center">
                                <Link to="/client/request" className="findClientButton btn text-light mb-2">Find a new client now</Link>
                            </div>
                        </div>
                    </div>

                    <h4 className="mx-3 mt-4 mb-3"><strong>Next Appointments</strong></h4>

                    < FairyAppointmentCard />

                    <Row className="mt-4">
                        <h4 className="mx-3 mb-3 mt-4"><strong>Services</strong></h4>
                        {store.services.map((service, index) => (
                            <Col md={4} onClick={() => navigate(`/fairy/fairy-products/${service.id}`)} key={index} className="mb-4  d-flex justify-content-center ">
                                <div className={`card w-75 ${selectedService === service ? 'selected' : ''}`} role="button" style={{ borderColor: 'rgb(194, 237, 249)' }}>
                                    <div className="fairyServicesCardBtn card-body d-flex gap-3 align-items-center">
                                        <img src={serviceImages[service.name.replaceAll(" ", "-").toLowerCase()]} alt={`Service ${service.id}`} />
                                        <h5>{service.name}</h5>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <h4 className="mx-3 mb-3 mt-4"><strong>Options</strong></h4>
                    <FairyOptionsCard />

                </Container>
            </div>
        </>
    );
};


export default FairyHome;