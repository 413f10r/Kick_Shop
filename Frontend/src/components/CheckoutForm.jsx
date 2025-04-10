import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CheckoutForm() {
    const { submitCheckout, formData, setFieldValue } = useGlobalContext();
    const navigate = useNavigate();

    const [acceptTerms, setAcceptTerms] = useState(true);
    const [errors, setErrors] = useState({}); // Stato per gestire gli errori in tempo reale

    // Funzione per validare un singolo campo
    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "userName":
                if (!value.trim()) {
                    error = "Il nome non può essere vuoto.";
                } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
                    error = "Il nome può contenere solo lettere, accenti e spazi.";
                }
                break;

            case "userSurname":
                if (!value.trim()) {
                    error = "Il cognome non può essere vuoto.";
                } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
                    error = "Il cognome può contenere solo lettere, accenti e spazi.";
                }
                break;

            case "userEmail":
                if (!value.trim()) {
                    error = "L'email non può essere vuota.";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = "L'email non è valida.";
                }
                break;

            case "telephone":
                if (!value.trim()) {
                    error = "Il numero di cellulare non può essere vuoto.";
                } else if (!/^\d{7,15}$/.test(value)) {
                    error = "Il numero di cellulare deve contenere solo numeri e avere tra 7 e 15 cifre.";
                }
                break;

            case "addressShipping":
                if (!value.trim()) {
                    error = "L'indirizzo di spedizione non può essere vuoto.";
                }
                break;

            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    // Funzione per gestire il cambiamento dei campi
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFieldValue(e); // Aggiorna il valore nel contesto globale
        validateField(name, value); // Valida il campo in tempo reale
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Controlla se ci sono errori
        const formErrors = Object.values(errors).filter((error) => error !== "");
        if (formErrors.length > 0) {
            e.stopPropagation();
            return;
        }

        submitCheckout(e, navigate);
    };

    return (
        <Form className="py-3 w-100 px-3 px-md-5" onSubmit={handleSubmit}>
            <h5 className="text-center pb-3">Inserisci i dati necessari per procedere con l'ordine</h5>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="userName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        name="userName"
                        onChange={handleFieldChange}
                        value={formData.userName}
                        type="text"
                        placeholder="Es: Mario"
                        required
                    />
                    {errors.userName && <div className="alert alert-danger mt-2">{errors.userName}</div>}
                </Form.Group>

                <Form.Group as={Col} controlId="userSurname">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control
                        name="userSurname"
                        onChange={handleFieldChange}
                        value={formData.userSurname}
                        type="text"
                        placeholder="Es: Rossi"
                        required
                    />
                    {errors.userSurname && <div className="alert alert-danger mt-2">{errors.userSurname}</div>}
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="userEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="userEmail"
                        onChange={handleFieldChange}
                        value={formData.userEmail}
                        type="email"
                        placeholder="Es: mariorossi@gmail.com"
                        required
                    />
                    {errors.userEmail && <div className="alert alert-danger mt-2">{errors.userEmail}</div>}
                </Form.Group>

                <Form.Group as={Col} controlId="telephone">
                    <Form.Label>Cellulare</Form.Label>
                    <Form.Control
                        name="telephone"
                        onChange={handleFieldChange}
                        value={formData.telephone}
                        type="text"
                        placeholder="Es: 3284756834"
                        required
                    />
                    {errors.telephone && <div className="alert alert-danger mt-2">{errors.telephone}</div>}
                </Form.Group>
            </Row>

            <hr />

            <Form.Group className="mb-3" controlId="addressShipping">
                <Form.Label>Indirizzo di spedizione</Form.Label>
                <Form.Control
                    name="addressShipping"
                    onChange={handleFieldChange}
                    value={formData.addressShipping}
                    type="text"
                    placeholder="Es: Via Aspromonte 12, Napoli, 80013"
                    required
                />
                {errors.addressShipping && <div className="alert alert-danger mt-2">{errors.addressShipping}</div>}
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="addressInvoice">
                <Form.Label>Indirizzo di Fatturazione</Form.Label>
                <Form.Control
                    name="addressInvoice"
                    onChange={handleFieldChange}
                    value={formData.addressInvoice}
                    type="text"
                    placeholder="Es: Via Aspromonte 12, Napoli, 80013"
                />
            </Form.Group>

            <hr />

            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check
                    type="checkbox"
                    label="Accetta i termini e condizioni"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                />
                {!acceptTerms && <div className="alert alert-danger mt-2">Devi accettare i termini e condizioni.</div>}
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!acceptTerms}>
                Procedi al pagamento
            </Button>
        </Form>
    );
}