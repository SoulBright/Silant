import React, { useState } from "react";

import MachineFilters from "../Filters/MachineFilters";
import MaintenanceFilters from "../Filters/MaintenanceFilters";
import ReclamationFilters from "../Filters/ReclamationFilter";

import MyButton from "../UI/Button/MyButton";

import '../styles/Main.css'

export default function Main() {
    const [activeTab, setActiveTab] = useState('MachineList')
    const user = localStorage.getItem('username');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="main">
            <h1 style={{ display: 'flex', justifyContent: 'center' }}>Здравствуйте {user}</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <MyButton
                    onClick={() => handleTabClick("MachineList")}
                    style={{
                        border: activeTab === "MachineList" ? "2px solid #D20A11" : "2px solid #163E6C",
                        background: activeTab === "MachineList" ? "#EBE6D6" : "#f5d7bf",
                    }}
                >
                    Общая информация
                </MyButton>
                <MyButton
                    onClick={() => handleTabClick("MaintenanceList")}
                    style={{
                        border: activeTab === "MaintenanceList" ? "2px solid #D20A11" : "2px solid #163E6C",
                        background: activeTab === "MaintenanceList" ? "#EBE6D6" : "#f5d7bf",
                    }}
                >
                    Техническое обслуживание
                </MyButton>
                <MyButton
                    onClick={() => handleTabClick("ReclamationList")}
                    style={{
                        border: activeTab === "ReclamationList" ? "2px solid #D20A11" : "2px solid #163E6C",
                        background: activeTab === "ReclamationList" ? "#EBE6D6" : "#f5d7bf",
                    }}
                >
                    Рекламации
                </MyButton>
            </div>
            <hr />
            {activeTab === "MachineList" && <MachineFilters />}
            {activeTab === "MaintenanceList" && <MaintenanceFilters />}
            {activeTab === "ReclamationList" && <ReclamationFilters />}
        </div>
    )
}