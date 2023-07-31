import React, { useState } from 'react'

import ReclamationService from '../API/ReclamationService'

export default function ReclamationList() {
    const [reclamations, setReclamation] = useState([])
    if (!reclamations.length) {
        ReclamationService.getAll().then(resp => { setReclamation(resp.data) })
    }
    return (
        <table>
            <tbody>
                <tr>
                    <th>Дата отказа</th>
                    <th>Наработка, м/час</th>
                    <th>Узел отказа</th>
                    <th>Описание отказа</th>
                    <th>Способ восстановления</th>
                    <th>Используемые запасные части</th>
                    <th>Дата восстановления</th>
                    <th>Время простоя техники</th>
                    <th>Машина</th>
                    <th>Сервисная компания</th>
                </tr>
                {reclamations.map(reclamation => (
                    <tr key={reclamation.id}>
                        <td>{reclamation.failureDate}</td>
                        <td>{reclamation.operatingTime}</td>
                        <td>{reclamation.failureJuncture}</td>
                        <td>{reclamation.failureDescription}</td>
                        <td>{reclamation.recoveryMethod}</td>
                        <td>{reclamation.spareParts}</td>
                        <td>{reclamation.recoveryDate}</td>
                        <td>{reclamation.equipmentDowntime}</td>
                        <td>{reclamation.machine}</td>
                        <td>{reclamation.serviceCompany}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
