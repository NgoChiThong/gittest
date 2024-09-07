import React, { useRef, useEffect } from "react";

export default function PayPalButton({ amount, currency, description, onPaymentSuccess }) {
    const paypal = useRef();
    const hasRendered = useRef(false); // Sử dụng một ref để theo dõi việc render

    useEffect(() => {
        if (hasRendered.current) {
            return; // Nếu đã render thì không render lại
        }
        hasRendered.current = true;
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: amount,
                                    currency_code: currency,
                                },
                                description: description,
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                    onPaymentSuccess(order);
                },
                onError: (err) => {
                    console.error(err);
                },
            })
            .render(paypal.current);
    }, [amount, currency, description, onPaymentSuccess]);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}