import React, { useState } from 'react'

import MachineService from '../API/MachineService';

import '../styles/MachineList.css'
export default function MachineList() {
    const [machines, setMachines] = useState([])
    if (!machines.length) {
        MachineService.getAll().then(resp => { setMachines(resp.data) })
    }
    return (
        <div className="big-table">
            <table>
                <tbody>
                    <tr>
                        <th>Зав. № машины</th>
                        <th>Модель техники</th>
                        <th>Модель двигателя</th>
                        <th>Зав. № двигателя</th>
                        <th>Модель трансмиссии</th>
                        <th>Зав. № трансмиссии</th>
                        <th>Модель ведущего моста</th>
                        <th>Зав. № ведущего моста</th>
                        <th>Модель управляемого моста</th>
                        <th>Зав. № управляемого моста</th>
                        <th>Договор поставки №, дата</th>
                        <th>Дата отгрузки с завода</th>
                        <th>Грузополучатель</th>
                        <th>Адрес поставки</th>
                        <th>Комплектация</th>
                        <th>Клиент</th>
                        <th>Сервисная компания</th>
                    </tr>
                    {machines.map(machine => (
                        <tr key={machine.id}>
                            <td>{machine.machineSerialNumber}</td>
                            <td>{machine.equipmentModel}</td>
                            <td>{machine.engineMake}</td>
                            <td>{machine.engineSerialNumber}</td>
                            <td>{machine.transmissionModel}</td>
                            <td>{machine.transmissionSerialNumber}</td>
                            <td>{machine.drivingBridgeModel}</td>
                            <td>{machine.drivingBridgeSerialNumber}</td>
                            <td>{machine.controlledBridgeModel}</td>
                            <td>{machine.controlledBridgeSerialNumber}</td>
                            <td>{machine.contract}</td>
                            <td>{machine.shipDate}</td>
                            <td>{machine.consignee}</td>
                            <td>{machine.deliveryAddress}</td>
                            <td>{machine.picking}</td>
                            <td>{machine.client}</td>
                            <td>{machine.serviceCompany}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
