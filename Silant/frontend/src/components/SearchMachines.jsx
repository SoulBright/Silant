import React, { useState } from 'react'

import MachineService from '../API/MachineService';

import MyInput from '../UI/Input/MyInput';
import MyButton from '../UI/Button/MyButton';

export default function SearchMachines() {
    const [serialNumber, setSerialNumber] = useState('');
    const [machineData, setMachineData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSerialNumberChange = (event) => {
        setSerialNumber(event.target.value);
    };

    const handleSearch = async () => {
        if (serialNumber.trim() === '') {
            setErrorMessage('Введите серийный номер машины');
            return;
        }
    
        try {
            const response = await MachineService.getWithSearch(serialNumber);
            const data = response.data;
            if (data.length > 0) {
                setMachineData(data[0]);
                setErrorMessage('');
            } else {
                setMachineData(null);
                setErrorMessage('Данных о машине с таким серийным номером нет в системе');
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            setMachineData(null);
            setErrorMessage('Произошла ошибка при выполнении запроса');
        }
    };

    return (
        <div>
            <MyInput
                type="text"
                placeholder="Введите серийный № машины"
                value={serialNumber}
                onChange={handleSerialNumberChange}
            />
            <MyButton onClick={handleSearch}>Найти</MyButton>
            {machineData && (
                <div>
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
                            </tr>
                            <tr key={machineData.id}>
                                <td>{machineData.machineSerialNumber}</td>
                                <td>{machineData.equipmentModel}</td>
                                <td>{machineData.engineMake}</td>
                                <td>{machineData.engineSerialNumber}</td>
                                <td>{machineData.transmissionModel}</td>
                                <td>{machineData.transmissionSerialNumber}</td>
                                <td>{machineData.drivingBridgeModel}</td>
                                <td>{machineData.drivingBridgeSerialNumber}</td>
                                <td>{machineData.controlledBridgeModel}</td>
                                <td>{machineData.controlledBridgeSerialNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {errorMessage && (
                <p>{errorMessage}</p>
            )}
        </div>
    );
}
