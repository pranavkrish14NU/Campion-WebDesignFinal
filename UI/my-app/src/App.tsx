import "../src/dist/App.css";
import Nav from "../src/components/Navbar/Nav";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/CurrentUser";
import Home from "./components/HomePage/Home";
import Campgrounds from "./components/Campgrounds/Campgrounds";
import NewCampground from "./components/NewCampground/NewCampground";
import Login from "./components/Login";
import Logout from "./components/Logout/Logout";
import Register from "./components/Register";
import CampgroundDetailed from "./components/CampgroundDetailed/CampgroundDetailed";
import EditCampground from "./components/EditCampground/EditCampground";
import BookingCampground from "./components/BookingCampground/BookingCampground";
import Admin from "./components/Admin/admin";
import Edit from "./components/Admin/Edit";
import Footer from "./components/Footer/Footer";
import logo from "./assets/BrandLogo1.png";
import store from "./store";
import Policy from './components/Policy/PolicyPage'
import ContactUs from "./components/ContactUs/ContactUs";
import FaqPage from './components/Faq/Faq';
import { Provider } from "react-redux";
import {useTranslation , I18nextProvider} from 'react-i18next'
import i18n from './i18n'
 
//let imagePath = './logo.svg';
 
//let imagePath = '../../../assets/161881353_padded_logo.png';
 
interface NavItem {
  text: string;
  path: string;
}
 
// Define the main App component
const App = () => {
  const { t }  = useTranslation('common');

  // Navigation items with corresponding paths
  const items: NavItem[] = [
    { text: t('navbar.home.label'), path: "/" },
    { text: t('navbar.campground.label'), path: "/campgrounds" },
    { text: t('navbar.newCampground.label'), path: "/campgrounds/new" },
    { text: t('navbar.login.label'), path: "/login" },
    { text: t('navbar.signup.label'), path: "/register" },
    { text: t('navbar.logout.label'), path: "/logout" },
  ];

 
  const handleAddCampground = (campgroundData: {
    _id?: string;
    name: string;
    location: string;
    type: string;
    description: string;
    price: number;
    imageUrl: string;
  }) => {
    // Handle adding campground data
    console.log("Adding campground:", campgroundData);
  };
 
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
      <Router>
        <AuthProvider>
          <div>
            <Nav brandName="" imageSrcPath={logo} navItems={items} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campgrounds" element={<Campgrounds />} />
              <Route
                path="/campgrounds/new"
                element={
                  <NewCampground onAddCampground={handleAddCampground} />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/campgrounds/:campgroundId"
                element={<CampgroundDetailed />}
              />
              <Route path="/logout" element={<Logout />} />
              <Route
                path="/campgrounds/:campgroundId/edit"
                element={<EditCampground />}
              />
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/campgrounds/:campgroundId/booking"
                element={<BookingCampground />}
              />
              <Route
                path="/admin/campgrounds/:campgroundId/edit"
                element={<Edit />}
              />
              <Route
                path="/policies"
                element={<Policy />}
              />
              <Route
                path="/Contact"
                element={<ContactUs />}
              />
               <Route
                path="/faq"
                element={<FaqPage />}
              />
            </Routes>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
      </I18nextProvider>
    </Provider>
  );
};
 
// Export the App component
export default App;