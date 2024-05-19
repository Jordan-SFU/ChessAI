import React from 'react';
import './About.css';

const About = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="about-overlay">
            <div className="about-content">
                <h2>About Death By Chess</h2>
                <h3> This is a game created by Jordan Mckenzie, <br/> Nick Chan, Bjorn Flamminman and Riley Su.</h3>
                <button onClick={onClose}>Back</button>
                <h1></h1>

            </div>
        </div>
    );
};

export default About;
