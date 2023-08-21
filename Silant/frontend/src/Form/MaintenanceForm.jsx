import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axiosConfig';

import SelectListService from '../API/SelectListService';
import MachineService from '../API/MachineService';

import MyButton from '../UI/Button/MyButton';
import MyInput from '../UI/Input/MyInput';
import MySelect from '../UI/Select/MySelect';

export default function MaintenanceForm() {

    const [successMessage, setSuccessMessage] = useState('');
    const [data, setData] = useState({
        type: '',
        date: '',
        operatingTime: '',
        workOrder: '',
        workOrderDate: '',
        maintenanceOrganization: '',
        machine: '',
        serviceCompany: '1',
    });

    const [types, setTypes] = useState([]);
    const [maintenanceOrganizations, setMaintenanceOrganizations] = useState([]);
    const [serviceCompany, setServiceCompany] = useState([]);
    const [machine, setMachine] = useState([]);

    const isCompany = useSelector(state => state.auth.company);

    useEffect(() => {
        fetchEquipmentModels();
    }, []);

    const fetchEquipmentModels = async () => {
        try {
            const typesResponse = await SelectListService.getMaintenanceType();
            setTypes(typesResponse.data);

            const maintenanceOrganizationsResponse = await SelectListService.getMaintenanceOrganization();
            setMaintenanceOrganizations(maintenanceOrganizationsResponse.data);

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
            await axios.post('/maintenance/', {
                type: data.type,
                date: data.date,
                operatingTime: data.operatingTime,
                workOrder: data.workOrder,
                workOrderDate: data.workOrderDate,
                maintenanceOrganization: data.maintenanceOrganization,
                machine: data.machine,
                serviceCompany: data.serviceCompany,
            });

            setSuccessMessage(`Информация о новом ТО успешно добавлена`);
            setData({ ...data, type: '' });
            setData({ ...data, date: '' });
            setData({ ...data, operatingTime: '' });
            setData({ ...data, workOrder: '' });
            setData({ ...data, workOrderDate: '' });
            setData({ ...data, maintenanceOrganization: '' });
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
                        <h3>{!successMessage && 'Добавление информации о новом ТО'}</h3>

                        <label>Наработка, м/час: </label>
                        <MyInput
                            type="text"
                            name="operatingTime"
                            value={data.operatingTime}
                            onChange={handleChange}
                        />

                        <label>№ заказ-наряда: </label>
                        <MyInput
                            type="text"
                            name="workOrder"
                            value={data.workOrder}
                            onChange={handleChange}
                        />

                        <label>Дата заказ-наряда: </label>
                        <MyInput
                            type="date"
                            name="workOrderDate"
                            value={data.workOrderDate}
                            onChange={handleChange}
                        />

                        <label>Дата проведения ТО: </label>
                        <MyInput
                            type="date"
                            name="date"
                            value={data.date}
                            onChange={handleChange}
                        />

                        <MySelect
                            label="Вид ТО"
                            name="type"
                            value={data.type}
                            options={types}
                            field="title"
                            onChange={handleChange}
                        />

                        <MySelect
                            label="Организация, проводившая ТО"
                            name="maintenanceOrganization"
                            value={data.maintenanceOrganization}
                            options={maintenanceOrganizations}
                            field={'title'}
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
