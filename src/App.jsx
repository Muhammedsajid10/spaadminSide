import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Appoint from "./Clientsidepage/Appoint";
import Teammembers from "./Clientsidepage/Teammembers";
import Giftcards from "./Clientsidepage/Giftcard";
import Membership from "./Clientsidepage/Membership";
import ClientsList from "./Clientsidepage/Clientlist";
// import Todayandbody from "./Clientsidepage/Todayandbody";
import Memberss from "./Clientsidepage/Memberss";
import Dailysalesss from "./Clientsidepage/Dailysalesss";
import Paymentclient from "./Clientsidepage/Paymentclient";
import SalesPage from "./Clientsidepage/Salespage";
// import TopService from "./Clientsidepage/Topservices";
import Dashboard from "./Clientsidepage/Dashboard";
import Sheduledshifts from "./Clientsidepage/Sheduledshifts";
import Selectcalander from "./Clientsidepage/Selectcalander";
import LoginPage from "./Clientsidepage/Loginpage";
import Signuppage from "./Clientsidepage/Signuppage";
import Demo from "./Clientsidepage/Demo";
import Navbar from "./Clientsidepage/Navbar";
import "./App.css";
// import DashboardPage from "./Clientsidepage/HomePage";
import DashboardLayout from "./Clientsidepage/DashboardLayout";
import SalesSidebarLayout from './Clientsidepage/SalesSidebarLayout';
// import ShiftScheduler from './Clientsidepage/Sheduledshifts';
import Scheduler from './Clientsidepage/Selectcalander';
import { Calendar } from "lucide-react";
import CatalogSidebarLayout from "./Clientsidepage/CatalogSideBarLayout";
import ServiceMenu from "./Clientsidepage/ServiceMenu";
import TeamSideBarLayout from "./Clientsidepage/TeamSidebarLayout";
import Timesheets from "./Clientsidepage/TimeSheets";
import DashboardPage from "./Clientsidepage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* Main Dashboard Routes */}
          <Route index element={<DashboardPage />} />
          <Route path="calendar" element={<Scheduler />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients-list" element={<ClientsList />} />
          <Route path="appointments" element={<ClientsList />} />
          
          {/* Sales Sidebar Routes */}
          <Route path="sales/*" element={<SalesSidebarLayout />}>
            <Route index element={<Dailysalesss />} />
            <Route path="daily-summary" element={<Dailysalesss />} />
            <Route path="appointments" element={<Appoint />} />
            <Route path="sales-page" element={<SalesPage />} />
            <Route path="payments" element={<Paymentclient />} />
            <Route path="gift-cards" element={<Giftcards />} />
            <Route path="memberships" element={<Memberss />} />
          </Route>

          {/* Catalog Sidebar Routes */}
          <Route path="catalog/*" element={<CatalogSidebarLayout />}>
            <Route index element={<ServiceMenu />} />
            <Route path="memberships" element={<Membership />} />
          </Route>

          {/* Team Sidebar Routes */}
          <Route path="team/*" element={<TeamSideBarLayout />}>
            <Route index element={<Teammembers />} />
            <Route path="scheduled-shifts" element={<Sheduledshifts />} />
            <Route path="time-sheets" element={<Timesheets />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;