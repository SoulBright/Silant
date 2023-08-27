import React, { useState } from 'react'

import MachineService from '../API/MachineService';

import MyInput from '../UI/Input/MyInput';
import MyButton from '../UI/Button/MyButton';

import '../styles/GetTable.css'

export default function SearchMachines() {
    const [serialNumber, setSerialNumber] = useState('');
    const [machineData, setMachineData] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSerialNumberChange = (event) => {
        setSerialNumber(event.target.value);
    };

    const handleSearch = async () => {
        if (serialNumber.trim() === '') {
            setMachineData('')
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
                setMachineData('');
                setErrorMessage('Данных о машине с таким серийным номером нет в системе');
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            setMachineData('');
            setErrorMessage('Произошла ошибка при выполнении запроса');
        }
    };

    return (
        <div className='unauthorizate-body'>
            <div className='info'>
                <h2 style={{ color: '#D20A11' }}>Авторизуйтесь для получения подробной информации о вашей технике</h2>
                <h1 style={{ color: '#163E6C' }}>Вы можете получить информацию о техникe по серийному номеру</h1>
            </div>
            <div className="search-wrapper">
            <MyInput
                type="text"
                placeholder="Введите серийный № машины"
                value={serialNumber}
                onChange={handleSerialNumberChange}
            />
            <MyButton onClick={handleSearch}>Найти</MyButton>
            </div>
            {machineData && (
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead style={{color: '#163E6C',}}>
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
                        </thead>
                        <tbody>
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
                <h3 style={{ textAlign: 'center' }}>{errorMessage}</h3>
            )}
        </div>
    );
}
