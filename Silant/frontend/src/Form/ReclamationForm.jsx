import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axiosConfig';

import SelectListService from '../API/SelectListService';
import MachineService from '../API/MachineService';

import MyButton from '../UI/Button/MyButton';
import MyInput from '../UI/Input/MyInput';
import MySelect from '../UI/Select/MySelect';

import './MyCreateForm.css'

export default function ReclamationForm() {

    const [successMessage, setSuccessMessage] = useState('');
    const [data, setData] = useState({
        failureDate: '',
        operatingTime: '',
        failureJuncture: '',
        failureDescription: '',
        recoveryMethod: '',
        spareParts: '',
        recoveryDate: '',
        machine: '',
        serviceCompany: '1',
    });

    const [failureJunctures, setfailureJunctures] = useState([]);
    const [recoveryMethods, setRecoveryMethods] = useState([]);
    const [serviceCompany, setServiceCompany] = useState([]);
    const [machine, setMachine] = useState([]);

    const isCompany = useSelector(state => state.auth.company);

    useEffect(() => {
        fetchEquipmentModels();
    }, []);

    const fetchEquipmentModels = async () => {
        try {
            const failureJuncturesResponse = await SelectListService.getFailureJuncture();
            setfailureJunctures(failureJuncturesResponse.data);

            const recoveryMethodsResponse = await SelectListService.getRecoveryMethod();
            setRecoveryMethods(recoveryMethodsResponse.data);

            const serviceCompanyResponse = await SelectListService.getServiceCompany();
            setServiceCompany(serviceCompanyResponse.data);

            const machineResponse = await MachineService.getAll();
            setMachine(machineResponse.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/reclamation/', {
                failureDate: data.failureDate,
                operatingTime: data.operatingTime,
                failureJuncture: data.failureJuncture,
                failureDescription: data.failureDescription,
                recoveryMethod: data.recoveryMethod,
                spareParts: data.spareParts,
                recoveryDate: data.recoveryDate,
                machine: data.machine,
                serviceCompany: data.serviceCompany,
            });

            setSuccessMessage(`Рекламация успешно добавлена`);
            setData({ ...data, failureDate: '' });
            setData({ ...data, operatingTime: '' });
            setData({ ...data, failureJuncture: '' });
            setData({ ...data, failureDescription: '' });
            setData({ ...data, recoveryMethod: '' });
            setData({ ...data, spareParts: '' });
            setData({ ...data, recoveryDate: '' });
            setData({ ...data, machine: '' });
            setData({ ...data, serviceCompany: '1' });

        } catch (error) {
            setSuccessMessage('Вы ввели неверные данные');
        }
    };


    return (
        <>
            <div>
                <h3 style={{ textAlign: 'center' }}>
                    <span className={successMessage === 'Вы ввели неверные данные' ? 'error-message' : ''}>
                        {successMessage}
                    </span>
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className='create-form'>
                        <h3>{!successMessage && 'Добавление новой Рекламации'}</h3>

                        <label>Наработка, м/час </label>
                        <MyInput
                            type="text"
                            name="operatingTime"
                            value={data.operatingTime}
                            onChange={handleChange}
                        />

                        <label>Описание отказа: </label>
                        <MyInput
                            type="text"
                            name="failureDescription"
                            value={data.failureDescription}
                            onChange={handleChange}
                        />

                        <label>Запасные части: </label>
                        <MyInput
                            type="text"
                            name="spareParts"
                            value={data.spareParts}
                            onChange={handleChange}
                        />

                        <label>Дата отказа:</label>
                        <MyInput
                            type="date"
                            name="failureDate"
                            value={data.failureDate}
                            onChange={handleChange}
                        />

                        <label>Дата восстановления: </label>
                        <MyInput
                            type="date"
                            name="recoveryDate"
                            value={data.recoveryDate}
                            onChange={handleChange}
                        />

                        <MySelect
                            label="Узел отказа"
                            name="failureJuncture"
                            value={data.failureJuncture}
                            options={failureJunctures}
                            field="title"
                            onChange={handleChange}
                        />

                        <MySelect
                            label="Способ восстановления"
                            name="recoveryMethod"
                            value={data.recoveryMethod}
                            options={recoveryMethods}
                            field="title"
                            onChange={handleChange}
                        />

                        <MySelect
                            label="Машина"
                            name="machine"
                            value={data.machine}
                            options={machine}
                            field={'machineSerialNumber'}
                            onChange={handleChange}
                        />

                        {!isCompany ?
                            <MySelect
                                label="Сервисная компания"
                                name="serviceCompany"
                                value={data.serviceCompany}
                                options={serviceCompany}
                                field={'serviceCompanyUser'}
                                onChange={handleChange}
                            /> : null}

                        <MyButton type="submit">Создать</MyButton>
                    </div>
                </form>
            </div>
        </>
    );
};
