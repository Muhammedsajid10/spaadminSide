import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Appoint from "./Clientsidepage/Appoint";
import Teammembers from "./Clientsidepage/Teammembers";
import Giftcards from "./Clientsidepage/Giftcards";
import Membership from "./Clientsidepage/Membership";
import ClientsList from "./Clientsidepage/Clientlist";
import Todayandbody from "./Clientsidepage/Todayandbody";
import Memberss from "./Clientsidepage/Memberss";
import Dailysalesss from "./Clientsidepage/Dailysalesss";
import Paymentclient from "./Clientsidepage/Paymentclient";
import SalesPage from "./Clientsidepage/Salespage";
import TopService from "./Clientsidepage/Topservices";
import Dashboard from "./Clientsidepage/Dashboard";
import Sheduledshifts from "./Clientsidepage/Sheduledshifts";
import Graphs from "./Clientsidepage/Graphs";
import Selectcalander from "./Clientsidepage/Selectcalander";
import LoginPage from "./Clientsidepage/Loginpage";
import Signuppage from "./Clientsidepage/Signuppage";
import Seconddashboard from "./Clientsidepage/Seconddashboard";
import Firstdashboard from "./Clientsidepage/Firstdashboard";
import Demo from "./Clientsidepage/Demo";
import Navbar from "./Clientsidepage/Navbar";
import "./App.css";
import HomePage from "./Clientsidepage/HomePage";
import DashboardLayout from "./Clientsidepage/";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (login/signup) can go here if needed */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appoint />} />
          <Route path="/gift-cards" element={<Giftcards />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/clients-list" element={<ClientsList />} />
          {/* <Route path="/today-body" element={<Todayandbody />} /> */}
          <Route path="/members" element={<Memberss />} />
          <Route path="/daily-sales" element={<Dailysalesss />} />
          <Route path="/payment-client" element={<Paymentclient />} />
          <Route path="/sales-page" element={<SalesPage />} />
          {/* <Route path="/top-service" element={<TopService />} /> */}
          <Route path="/scheduled-shifts" element={<Sheduledshifts />} />
          {/* <Route path="/graphs" element={<Graphs />} /> */}
          <Route path="/select-calendar" element={<Selectcalander />} />
          <Route path="/second-dashboard" element={<Seconddashboard />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/demo" element={<Demo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
