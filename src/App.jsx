import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
// import Graphs from "./Clientsidepage/Graphs";
import Selectcalander from "./Clientsidepage/Selectcalander";
import LoginPage from "./Clientsidepage/Loginpage";
import Signuppage from "./Clientsidepage/Signuppage";
// import SecondDashboard from "./Clientsidepage/Seconddashboard";
import Demo from "./Clientsidepage/Demo";
import Navbar from "./Clientsidepage/Navbar";
import "./App.css";
import HomePage from "./Clientsidepage/HomePage";
import DashboardLayout from "./Clientsidepage/DashboardLayout";
import SalesSidebarLayout from './Clientsidepage/SalesSidebarLayout';
import ShiftScheduler from './Clientsidepage/Sheduledshifts';
import Scheduler from './Clientsidepage/Selectcalander';
import { Calendar } from "lucide-react";
import CatalogSidebarLayout from "./Clientsidepage/CatalogSideBarLayout";
import ServiceMenu from "./Clientsidepage/ServiceMenu";
import TeamSideBarLayout from "./Clientsidepage/TeamSidebarLayout";
import Timesheets from "./Clientsidepage/TimeSheets";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/calendar" element={<Scheduler />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appoint />} />
          <Route path="/gift-cards" element={<Giftcards />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/clients-list" element={<ClientsList />} />
          <Route path="/members" element={<Memberss />} />
          <Route path="/daily-sales" element={<Dailysalesss />} />
          <Route path="/payment-client" element={<Paymentclient />} />
          <Route path="/sales-page" element={<SalesPage />} />
          <Route path="/scheduled-shifts" element={<Sheduledshifts />} />
          <Route path="/select-calendar" element={<Selectcalander />} />
          <Route path="/team-members" element={<Teammembers />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/demo" element={<Demo />} />
        </Route>

        {/* SALES SIDEBAR: Only on /sales-sidebar */}
        <Route path="/sales-sidebar" element={<SalesSidebarLayout />}>
          <Route index element={<Dailysalesss />} />
          <Route path="appointments" element={<Appoint />} />
          <Route path="sales-page" element={<SalesPage />} />

          <Route path="payments" element={<Paymentclient />} />
          <Route path="gift-cards" element={<Giftcards />} />
          <Route path="membership" element={<Membership />} />
        </Route>
        <Route path="/catalog-sidebar" element={<CatalogSidebarLayout />}>
          <Route index element={<ServiceMenu />} />
          <Route path="memberships" element={<Membership />} />
          <Route path="sales-page" element={<SalesPage />} />
        </Route>
        <Route path="/team-sidebar" element={<TeamSideBarLayout />}>
          <Route index element={<Teammembers />} />
          <Route path="sheduled-shifts" element={<Sheduledshifts />} />
          <Route path="time-sheets" element={<Timesheets />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;