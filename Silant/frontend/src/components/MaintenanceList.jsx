import React, { useState } from 'react'

import MaintenanceService from '../API/MaintenanceService'

export default function MaintenanceList() {
    const [maintenances, setMaintenance] = useState([])
    if (!maintenances.length) {
        MaintenanceService.getAll().then(resp => { setMaintenance(resp.data) })
        
    }
    return (
        <table >
            <tbody>
                <tr>
                    <th>Вид ТО</th>
                    <th>Дата проведения ТО</th>
                    <th>Наработка, м/час</th>
                    <th>№ заказ-наряда</th>
                    <th>Дата заказ-наряда</th>
                    <th>Организация, проводившая ТО</th>
                    <th>Машина</th>
                    <th>Сервисная компания</th>
                </tr>
                {maintenances.map(maintenance => (
                    <tr key={maintenance.id}>
                        <td>{maintenance.type}</td>
                        <td>{maintenance.date}</td>
                        <td>{maintenance.operatingTime}</td>
                        <td>{maintenance.workOrder}</td>
                        <td>{maintenance.workOrderDate}</td>
                        <td>{maintenance.maintenanceOrganization}</td>
                        <td>{maintenance.machine}</td>
                        <td>{maintenance.serviceCompany}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
