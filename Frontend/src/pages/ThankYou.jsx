import { Link } from "react-router-dom"

export default function thankYou() {
    return (
        <>
        
           <h1 className="text-center py-3 font">Kick Shop</h1>
            <div className="container-fluid text-center mt-5">
                <div className="alert alert-success" role="alert">
                    <h2>Ordine effettuato con successo!</h2>
                    <h4>
                        Grazie per aver acquistato sul nostro sito
                        <span><i className="fa-solid fa-arrow-down"></i></span>
                    </h4>
                    <p>Ti abbiamo inviato una mail con i dettagli dell'acquisto.</p>
                    <Link to={'/'} className="btn btn-primary mt-3">Torna al Sito</Link>
                </div>
            </div>
       


        </>
    )
}