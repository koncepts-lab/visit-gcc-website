import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export default function EnquiryForm({ isOpen, onClose }) {
    const [countryCodes, setCountryCodes] = useState([]);
    const [selectedDialCode, setSelectedDialCode] = useState('');
    const [loadingCodes, setLoadingCodes] = useState(true);
    const [errorCodes, setErrorCodes] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [destination, setDestination] = useState('');
    const [country, setCountry] = useState('');
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchCountryCodes = async () => {
            setLoadingCodes(true);
            setErrorCodes(null);
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,cca2');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const formattedCodes = data
                    .filter(country => country.idd && country.idd.root)
                    .map(country => ({
                        name: country.name.common,
                        dial_code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ''),
                        code: country.cca2,
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name));
                setCountryCodes(formattedCodes);
                setLoadingCodes(false);
            } catch (err) {
                setErrorCodes('Failed to fetch country codes. Please try again.');
                console.error('Error fetching country codes:', err);
                setLoadingCodes(false);
            }
        };

        fetchCountryCodes();
    }, []);

    const handleCountryCodeChange = (event) => {
        setSelectedDialCode(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmissionLoading(true);
        setSubmissionError(null);
        setSubmissionSuccess(false);

        // Validation
        if (!lastName.trim()) {
            enqueueSnackbar('Please enter your last name.', { variant: 'error' });
            setSubmissionLoading(false);
            return;
        }
        if (!firstName.trim()) {
            enqueueSnackbar('Please enter your first and middle name.', { variant: 'error' });
            setSubmissionLoading(false);
            return;
        }
        if (!email.trim()) {
            enqueueSnackbar('Please enter your email address.', { variant: 'error' });
            setSubmissionLoading(false);
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            enqueueSnackbar('Please enter a valid email address.', { variant: 'error' });
            setSubmissionLoading(false);
            return;
        }
        if (!selectedDialCode) {
            enqueueSnackbar('Please select a country code.', { variant: 'error' });
            setSubmissionLoading(false);
            return;
        }
        if (!phoneNumber.trim()) {
            enqueueSnackbar('Please enter your contact number.', { variant: 'error' });
            setSubmissionLoading(false);
            return;
        }
        if (!destination.trim()) {
            enqueueSnackbar('Please enter your destination.', { variant: 'error' });
            setSubmissionLoading(false);
            return;
        }
        if (!country.trim()) {
            enqueueSnackbar('Please enter the country.', { variant: 'error' });
            setSubmissionLoading(false);
            return;
        }

        const authToken = localStorage.getItem("auth_token_login") || localStorage.getItem("auth_token_register");

        if (!authToken) {
            enqueueSnackbar("Authentication token not found.", { variant: 'error' });
            setSubmissionLoading(false);
            return;
        }

        try {
            const fullPhoneNumber = `${selectedDialCode}${phoneNumber}`;

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}enquiry-forms`,
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: fullPhoneNumber,
                    destination: destination,
                    country: country,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201) {
                setSubmissionSuccess(true);
                enqueueSnackbar('Enquiry submitted successfully!', { variant: 'success' });
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhoneNumber('');
                setDestination('');
                setCountry('');
                setSelectedDialCode('');
                // Optionally close the modal after successful submission
                // onClose();
            } else {
                enqueueSnackbar(`Failed to submit enquiry. Status: ${response.status}`, { variant: 'error' });
                console.error('Enquiry submission failed:', response);
            }
        } catch (error) {
            enqueueSnackbar('An error occurred while submitting the enquiry.', { variant: 'error' });
            console.error('Error submitting enquiry:', error);
        } finally {
            setSubmissionLoading(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <button className={style.closeButton} onClick={onClose}>
                    X
                </button>
                <h2 className='fw-bold'>Traveller Form</h2>
                {loadingCodes && <p>Loading country codes...</p>}
                {errorCodes && <p className="error">{errorCodes}</p>}
                {!loadingCodes && !errorCodes && (
                    <form onSubmit={handleSubmit}>
                        <div className="">
                        <div className={`${style['Enquiry-div']}`}
                        >
                        <input
                                    className={`${style['promo_input']} col-xl-6 col-12`}
                                    placeholder="Last name (in English)*"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <br className="d-xl-none d-lg-block" />
                                <input
                                    className={`${style['promo_input']} col-xl-6`}
                                    placeholder="First and Middle name (in English)*"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <br />
                            </div>
                            <div className={`${style['Enquiry-div']}`}>
                                <div className='col-xl-6 col-12'>
                                    <label>Email Address</label>
                                    <input
                                        className={`${style['promo_input']} col-12 `}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <br className="d-xl-none d-lg-block" />
                                <div className='col-xl-6 col-12'>
                                    <label>Contact Number</label>
                                    <div className='d-flex'>
                                        <select
                                            className={`${style['promo_select']} col-3 `}
                                            onChange={handleCountryCodeChange}
                                            value={selectedDialCode}
                                        >
                                            <option value="">Select Code</option>
                                            {countryCodes.map((country) => (
                                                <option key={country.code} value={country.dial_code}>
                                                    {country.dial_code} &nbsp; &nbsp;( {country.name})
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            className={`${style['promo_input']} col-9`}
                                            type="number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        <div className={`${style['Enquiry-div']}`}>
                                <div className='col-xl-6 col-12'>
                                    <label>Destination</label>
                                    <input
                                        className={`${style['promo_input']} col-12 `}
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                    />
                                </div>
                                <br className="d-xl-none d-lg-block" />
                                <div className='col-xl-6 col-12'>
                                    <label>Country</label>
                                    <input
                                        className={`${style['promo_input']} col-12 `}
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12 pt-3">
                                <button type="submit" className={style['submitButton']} disabled={submissionLoading}>
                                    {submissionLoading ? 'Submitting...' : 'Submit Enquiry'}
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}