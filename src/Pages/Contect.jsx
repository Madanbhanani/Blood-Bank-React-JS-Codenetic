
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { NavbarExp,Footer } from "./Componets/Componets"; 

// import "./Contact.css";

const Contact = () => {
    return (
        <>
        <NavbarExp />
        <br /><br />
        <section id="contact" className="contact-section">
            <div className="container">
                <h2 className="section-title">Contact Us</h2>
                <p className="section-description">
                    We're here to help! Reach out to us for blood donations, 
                     inquiries, or support.
                </p>
                <div className="contact-form-container">
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label> <br />
                            <input type="text" id="name" 
                            placeholder="Enter your name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label><br />
                            <input type="email" id="email" 
                            placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label> <br />
                            <textarea id="message" rows="5" 
                            placeholder="Write your message" required></textarea>
                        </div>
                        <button type="submit" className="submit-btn">
                            Send Message
                        </button>
                    </form>
                    <div className="contact-info">
                        <div className="info-item">
                            <FontAwesomeIcon icon={faPhone} 
                            className="info-icon" />
                            <p>+1 234 567 890</p>
                        </div>
                        <div className="info-item">
                            <FontAwesomeIcon icon={faEnvelope} 
                            className="info-icon" />
                            <p>support@bloodbank.com</p>
                        </div>
                        <div className="info-item">
                        <FontAwesomeIcon icon={faMapMarkerAlt} 
                        className="info-icon" />
                            <p>123 Blood Bank Street, Cityville</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
        </>
    );
};

export default Contact;
