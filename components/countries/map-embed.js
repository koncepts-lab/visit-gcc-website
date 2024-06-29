"use client";
import React from 'react';

const MapEmbed = () => {
    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d459243.1336836067!2d50.25792102023515!3d25.940576948641848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e48524e6a47a211%3A0x2e9450e2dbda1046!2sBahrain!5e0!3m2!1sen!2sin!4v1719317297692!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    );
};

export default MapEmbed;
