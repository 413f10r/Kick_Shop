import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

// layout
import DefaultLayout from "./layouts/DefaultLayout";

// pages
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ManPage from "./pages/ManPage";
import WomanPage from "./pages/WomanPage";
import SummerPage from "./pages/SummerPage";
import WinterPage from "./pages/WinterPage";
import Checkout from "./pages/CheckoutPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import WishListPage from "./pages/WishListPage";
import BallonPage from "./pages/BallonPage";

import ChatBot from "./pages/ChatBotPage";

// components
import CartSection from "./components/CartSection";
import WishSection from "./components/WishSection";

function App() {
    return (
        <BrowserRouter>
            <GlobalProvider>
                <CartSection />
                <WishSection />
                <Routes>
                    <Route Component={DefaultLayout}>
                        <Route path="/" Component={HomePage} />
                        <Route path="/wish" Component={WishListPage} />
                        <Route path="/products/:slug" Component={ProductPage} />
                        <Route path="/man" Component={ManPage} />
                        <Route path="/woman" Component={WomanPage} />
                        <Route path="/summer" Component={SummerPage} />
                        <Route path="/winter" Component={WinterPage} />
                        <Route path="/checkout" Component={Checkout} />
                        <Route path="/search" Component={SearchPage} />
                        <Route path="/ballon" Component={BallonPage} />
                        <Route path="/thankyou" Component={ThankYou} />
                        <Route path="/chatbot" Component={ChatBot} />

                    </Route>
                    <Route path="*" Component={NotFound} />
                </Routes>
            </GlobalProvider>
        </BrowserRouter>
    );
}

export default App;