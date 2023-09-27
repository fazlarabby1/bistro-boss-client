import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import './CheckoutForm.css';

const CheckoutForm = ({ price, cart }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if (price) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('error', error);
            setCardError(error);
        }
        else {
            setCardError(null)
        }

        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email
                    },
                },
            },
        );

        setProcessing(false);
        if (confirmError) {
            console.log(confirmError);
        }
        console.log(paymentIntent);
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            // save payment info to the server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                data: new Date(),
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId),
                itemNames: cart.map(item => item.name),
                status: 'service pending'
            };
            console.log(payment);

            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        // show confirmation alert
                    }
                })
        }
    };

    return (
        <>
            <h1 className="text-xl font-semibold mb-4">You have to pay: {price}$</h1>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    cardError && <p className='text-red-700 mt-2'>{cardError?.message}</p>
                }
                {
                    transactionId && <p className='text-success mt-2'>Transaction is successful with a transactionID of: <span className="text-lg font-semibold">{transactionId}</span></p>
                }
                <div>
                    <button className="btn btn-info rounded-md btn-sm mt-7" type="submit" disabled={!stripe || !clientSecret || processing}>
                        Pay
                    </button>
                </div>
            </form>
        </>
    );
};

export default CheckoutForm;