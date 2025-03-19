import React, { useState } from 'react';
import styled from 'styled-components';
import Popup from './Popup'; // Assuming Popup is a separate component

export default function SuggestionsForm({ user }) {
    
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation checks
        if (!message) {
            setError('message field is required.');
            return;
        }

        setIsSubmitting(true);
        setSuccess(false);

        const concatenatedString = `${user.email}->${message}`;
        const url = `${process.env.REACT_APP_PRODUCER_URL}/suggest/${encodeURIComponent(concatenatedString)}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.text(); // Assuming the response is a string
            setPopupMessage(responseData);
            setShowPopup(true);

            setSuccess(true);
            setMessage('');
        } catch (err) {
            setError('Failed to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <StyledWrapper>
            <div className="card">
                <h2 className="title">Any Suggestions to Improve?</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <div className="form-control bg-light border rounded p-2">
                            {user.email}
                        </div>

                        {error && <div className="invalid-feedback">{error}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            className="form-control"
                            id="message"
                            rows="3"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
            {success && showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .card {
        width: 90%;
        max-width: 450px;
        background-color: white;
        box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
        border-radius: 17px 17px 27px 27px;
        padding: 20px;
        margin: 20px auto;
    }

    .title {
        font-weight: 700;
        font-size: 18px;
        color: #47484b;
        margin-bottom: 20px;
        text-align: center;
    }

    .form-label {
        font-weight: 600;
        color: #47484b;
    }

    .form-control {
        border-radius: 6px;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #dfe1e6;
        width: 100%;
    }

    .form-control.is-invalid {
        border-color: #dc3545;
    }

    .invalid-feedback {
        color: #dc3545;
        font-size: 0.875em;
    }

    .btn-primary {
        background-color: #0a84ff;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%;
    }

    .btn-primary:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }

    .btn-primary:hover:enabled {
        background-color: #026eda;
    }

    .success-message {
        margin-top: 15px;
        color: #28a745;
        font-weight: 600;
    }

    @media (max-width: 768px) {
        .card {
            padding: 15px;
        }

        .title {
            font-size: 16px;
        }

        .btn-primary {
            padding: 8px 16px;
        }
    }
`;