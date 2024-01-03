import Stripe from 'stripe';
import {STRIPE_PRIVATE_KEY} from '../config.js';

const stripe = new Stripe(STRIPE_PRIVATE_KEY);

export const createSession = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Stubborn Attachments',
                        description: 'Kindle Book',
                        images: ['https://i.imgur.com/EHyR2nP.png'],
                    },
                    unit_amount: 2000, // 2000 cents = USD20
                },
                quantity: 1,
            },
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'New Collection of Stories',
                        description: 'Hardcover Book',
                        images: ['https://i.imgur.com/lI3h3q6.png'],
                    },
                    unit_amount: 5000, // 2000 cents = USD20
                },
                quantity: 1,
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    });
    return res.json(session);
}