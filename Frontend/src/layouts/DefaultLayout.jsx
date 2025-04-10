import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FootballCollection from "../components/FootballCollection";

export default function DefaultLayout() {
  const location = useLocation();
  const isThankYouPage = location.pathname === "/thankyou";
  const isCheckoutPage = location.pathname === "/checkout";
  const isBallonPage = location.pathname === "/ballon";

  return (
    <div className="layout-container d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 bg-light">
        <Outlet />
        
        {/* Render FootballCollection solo se non siamo nella pagina /checkout */}
        {!isCheckoutPage && !isBallonPage && <FootballCollection />}
      </main>
      <Footer
        className="footer"
        style={{
          backgroundColor: "#000",
          color: "#fff",
          textAlign: "center",
          ...(isThankYouPage && {
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 9999,
          }),
        }}
      />
    </div>
  );
}
