import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-4 text-danger mb-3">Pagina non trovata</h1>
      <h3 className="mb-4"> Oops... qualcosa è andato storto.</h3>
      <Link to="/" className="btn btn-primary">
        Torna alla Home
      </Link>
    </div>
  );
}
