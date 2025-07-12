// Main Dashboard Component
import React from "react";
import Graphs from "./Graphs";
import Todayandbody from "./Todayandbody";
import TopService from "./Topservices";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your business performance</p>
        </div>
        
        {/* Dashboard Grid - 2 rows, 2 columns */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-auto">
          {/* Row 1 - Column 1: Charts */}
          <div className="xl:col-span-1">
            <Graphs />
          </div>
          
          {/* Row 1 - Column 2: Appointments */}
          <div className="xl:col-span-1">
            <Todayandbody />
          </div>
          
          {/* Row 2 - Both Columns: Top Stats */}
          <div className="xl:col-span-2">
            <TopService />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;