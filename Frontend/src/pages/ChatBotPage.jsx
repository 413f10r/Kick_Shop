import { Link } from "react-router-dom"

export default function ChatBot() {
    return (
        <>

            <h1 className="text-center py-3 font">Kick Shop</h1>
            <h3 className="text-center py-3 font">il tuo assistente personale</h3>
            <div className="container-fluid text-center mt-5">

                <Link to={'/'} className="btn btn-primary mt-3">Torna al Sito</Link>

            </div>



        </>
    )
}