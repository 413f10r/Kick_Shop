import { useGlobalContext } from "../context/GlobalContext";
import Badge from "react-bootstrap/Badge";
import QuantityCounter from './ QuantityCounter';
import { useState, useEffect } from 'react';
import ConfirmationModal from "./ConfirmationModal";
import { NavLink } from "react-router-dom";
import Search from "./Search"; // Importa il componente Search

export default function OrderRecap() {
    const { cart = [], handleQuantityChange, handleRemoveItem, quantities = [] } = useGlobalContext();

    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [scroll, setScroll] = useState(0); // Stato per il banner di spedizione

    const ShippingCost = 25; // Costo fisso di spedizione

    // Effetto per il banner di spedizione
    useEffect(() => {
        const scrollInterval = setInterval(() => {
            setScroll((prevScroll) => prevScroll + 1);
        }, 30); // Velocità dello scroll

        return () => clearInterval(scrollInterval);
    }, []);

    const confirmRemove = (index) => {
        setSelectedIndex(index);
        setShowModal(true);
    };

    const handleConfirm = () => {
        handleRemoveItem(selectedIndex);
        setShowModal(false);
        setSelectedIndex(null);
    };

    const handleCancel = () => {
        setShowModal(false);
        setSelectedIndex(null);
    };

    // Calcolare il totale escludendo i prodotti non disponibili
    const subtotal = cart.reduce((acc, item, index) => {
        if (item && item.availability > 0) {
            acc += item.price * (quantities[index] || 1);
        }
        return acc;
    }, 0);

    // Calcolare il totale con il costo di spedizione
    const total = cart.length === 0 ? 0 : subtotal;

    // Calcolare il nuovo totale (senza costo di spedizione se supera 200€)
    const newTotal = cart.length === 0 ? 0 : (subtotal >= 200 ? subtotal : total + ShippingCost);

    // Funzione per mostrare il messaggio di spedizione gratuita
    const freeShipping = () => {
        if (subtotal >= 200) {
            return (
                <div className="alert alert-success mt-3">
                    🎉 Spedizione gratuita per ordini superiori a 200€!
                </div>
            );
        } else {
            const amountLeft = (200 - subtotal).toFixed(2);
            return (
                <div className="alert alert-warning">
                    <span>Mancano
                        <strong> {amountLeft} € </strong>
                        per ottenere la spedizione gratuita.

                        <br />

                        Potrebbero interessarti i  nostri
                        <NavLink
                            aria-current="page"
                            to={`/ballon`}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            <button
                                type="button"
                                className="btn btn-outline-dark mx-2"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            >
                                Palloni
                            </button>
                        </NavLink>
                        da collezione.
                        {/* Oppure le nostre */}
                        {/* <NavLink
                            aria-current="page"
                            to={`/search?q=scarpe&sortField=name&sortOrder=asc`}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            <button
                                type="button"
                                className="btn btn-outline-dark mx-2 mb-2 mt-1"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            >
                                Maglie
                            </button>
                        </NavLink> */}
                    </span>

                    {/* <div>
                        <p>Oppure ricerca il tuo stile</p>
                        <Search />
                    </div> */}
                </div>


            );
        }
    };

    return (
        <div className="offcanvas-body">
            {/* Banner di spedizione */}
            {/* <div className="banner-container">
                 <div className="banner-content" style={{ transform: `translateX(-${scroll}px)` }}>
                    <p className="text"><strong className="text-warning">OFFERTA</strong> speciale Kick Shop!!! 🚚 Approfitta della
                        <strong className="text-warning"> SPEDIZIONE GRATUITA!!! </strong> Per ordini superiori a 200€! Non lasciarti sfuggire questa occasione!
                    </p>
                </div>
            </div> */}

            {cart.length === 0 ? (
                <>
                    <p className="text-center text-muted">
                        <i className="fa-solid fa-heart-broken"></i> Il tuo carrello è vuoto.
                    </p>
                    <NavLink
                        aria-current="page"
                        to={`/`}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <button
                            type="button"
                            className="btn btn-outline-dark w-100"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        >
                            Torna alla Home
                        </button>
                    </NavLink>
                </>
            ) : (
                <ul className="list-group">
                    {cart.map((item, index) => (
                        <li key={index} className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center gap-3" aria-current="true">
                            {/* Immagine prodotto */}
                            <img
                                src={item.images?.[0]?.image_url}
                                alt={item.name}
                                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                            />

                            {/* Info e badge */}
                            <div className="d-flex flex-column flex-grow-1">
                                <p className="mb-1">
                                    <strong>{item.name}</strong> - {item.price} €
                                </p>

                                {item.availability === 0 && (
                                    <Badge bg="warning" text="dark">Non disponibile</Badge>
                                )}
                            </div>

                            {/* Counter + trash */}
                            <div className='d-flex gap-2 align-items-center'>
                                {item.availability > 0 ? (
                                    <QuantityCounter
                                        index={index}
                                        quantity={quantities[index] || 1}
                                        onQuantityChange={handleQuantityChange}
                                        maxQuantity={item.availability}
                                    />
                                ) : (
                                    <span className="text-muted">Prodotto esaurito</span>
                                )}

                                <button
                                    className="btn btn-danger"
                                    onClick={() => confirmRemove(index)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="d-flex flex-column gap-2 py-3 w-100">
                {/* Totale parziale */}
                <div className="input-group w-100">
                    <span className="input-group-text">
                        <strong>TOTALE PARZIALE : </strong></span>
                    <div
                        className={"input-group-text "}
                    >
                        <span className="w-100">
                            <strong>{total.toFixed(2)} €</strong>
                        </span>
                    </div>
                </div>

                {/* Costo di spedizione */}
                <div className="input-group w-100">
                    <span className="input-group-text"><strong>Costo di spedizione : </strong></span>
                    <div
                        className={`input-group-text ${subtotal >= 200 ? "text-decoration-line-through text-danger" : ""}`}
                    >
                        <span className="w-100">
                            <strong>{ShippingCost.toFixed(2)} €</strong>
                        </span>
                    </div>

                </div>
            </div>


            {/* Messaggio di spedizione gratuita */}
            {freeShipping()}

            {/* Nuovo totale */}
            <div className="input-group w-100">
                <span className="input-group-text"><strong>PREZZO FINALE: </strong></span>
                <div className="input-group-text bg-success text-light border border-success">
                    <span className="w-100">
                        <strong>{newTotal.toFixed(2)} €</strong>
                    </span>
                </div>
            </div>

            {/* Modal di conferma */}
            <ConfirmationModal
                show={showModal}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                message="Sei sicuro di voler rimuovere questo prodotto dal carrello?"
            />
        </div>
    );
}