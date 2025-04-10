// components/QuantityCounter.jsx
import React from 'react';
import Button from 'react-bootstrap/Button';

const QuantityCounter = ({ index, quantity, onQuantityChange, maxQuantity }) => {
    const handleDecrease = () => {
        if (quantity > 1) {
            onQuantityChange(index, quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            onQuantityChange(index, quantity + 1);
        }
    };

    return (
        <div className="d-flex align-items-center gap-2">
            <Button
                variant="outline-danger"
                size="sm"
                onClick={handleDecrease}
                disabled={quantity <= 1}
            >
                -
            </Button>

            <span className="fw-bold">{quantity}</span>

            <Button
                variant="outline-success"
                size="sm"
                onClick={handleIncrease}
                disabled={quantity >= maxQuantity}
            >
                +
            </Button>
           
        </div>
    );
};

export default QuantityCounter;