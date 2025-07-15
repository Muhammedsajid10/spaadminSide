import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Appoint from "./Clientsidepage/Appoint";
import Teammembers from "./Clientsidepage/Teammembers";
import Giftcards from "./Clientsidepage/Giftcard";
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
      <div className="app-container">
        <Navbar className="fixed-navbar" />
        <div className="main-content">
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

            {/* Catalog sidebar with constant width */}
            <Route path="/catalog-sidebar" element={
              <div className="layout-with-sidebar">
                <CatalogSidebarLayout />
                <div className="content-with-margin">
                  <Routes>
                    <Route index element={<ServiceMenu />} />
                    <Route path="memberships" element={<Memberss />} />
                    <Route path="sales-page" element={<SalesPage />} />
                  </Routes>
                </div>
              </div>
            } />

            {/* SALES SIDEBAR: Only on /sales-sidebar */}
            <Route path="/sales-sidebar" element={
              <div className="layout-with-sidebar">
                <SalesSidebarLayout />
                <div className="content-with-margin">
                  <Routes>
                    <Route index element={<Dailysalesss />} />
                    <Route path="appointments" element={<Appoint />} />
                    <Route path="sales-page" element={<SalesPage />} />

                    <Route path="payments" element={<Paymentclient />} />
                    <Route path="gift-cards" element={<Giftcards />} />
                    <Route path="membership" element={<Membership />} />
                  </Routes>
                </div>
              </div>
            } />
            <Route path="/team-sidebar" element={
              <div className="layout-with-sidebar">
                <TeamSideBarLayout />
                <div className="content-with-margin">
                  <Routes>
                    <Route index element={<Teammembers />} />
                    <Route path="sheduled-shifts" element={<Sheduledshifts />} />
                    <Route path="time-sheets" element={<Timesheets />} />

                  </Routes>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;