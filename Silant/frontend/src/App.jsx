import React from "react";

import './styles/App.css'

import Table from "./components/Table";
import Header from "./components/Header"
import SearchMachines from "./components/SearchMachines";
import MachineFilters from "./Filters/MachineFilters";
import MaintenanceFilters from "./Filters/MaintenanceFilters";
import ReclamationFilter from "./Filters/ReclamationFilter";

export default function App() {
  return (
    <div className="main">
      <Header />
      <ReclamationFilter />
      <MaintenanceFilters />
      <SearchMachines />
      <Table />
      <MachineFilters />
    </div>
  );
}