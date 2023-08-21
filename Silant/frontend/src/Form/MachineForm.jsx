import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

import SelectListService from '../API/SelectListService';

import MyButton from '../UI/Button/MyButton';
import MyInput from '../UI/Input/MyInput';
import MyTextarea from '../UI/MyTextarea/MyTextarea';
import MySelect from '../UI/Select/MySelect';

import './MyCreateForm.css'

export default function MachineForm() {

    const [successMessage, setSuccessMessage] = useState('');
    const [data, setData] = useState({
        machineSerialNumber: '',
        equipmentModel: '',
        engineMake: '',
        engineSerialNumber: '',
        transmissionModel: '',
        transmissionSerialNumber: '',
        drivingBridgeModel: '',
        drivingBridgeSerialNumber: '',
        controlledBridgeModel: '',
        controlledBridgeSerialNumber: '',
        contract: '',
        shipDate: '',
        consignee: '',
        deliveryAddress: '',
        picking: '',
        client: '',
        serviceCompany: '',
    });

    const [equipmentModels, setEquipmentModels] = useState([]);
    const [engineMakes, setEngineMakes] = useState([]);
    const [transmissionModels, setTransmissionModels] = useState([]);
    const [drivingBridgeModels, setDrivingBridgeModels] = useState([]);
    const [controlledBridgeModels, setControlledBridgeModels] = useState([]);
    const [serviceCompany, setServiceCompany] = useState([]);
    const [client, setClient] = useState([]);

    useEffect(() => {
        fetchEquipmentModels();
    }, []);

    const fetchEquipmentModels = async () => {
        try {
            const equipmentModelResponse = await SelectListService.getEquipmentModel();
            setEquipmentModels(equipmentModelResponse.data);

            const engineMakeResponse = await SelectListService.getEngineMake();
            setEngineMakes(engineMakeResponse.data);

            const transmissionModelResponse = await SelectListService.getTransmissionModel();
            setTransmissionModels(transmissionModelResponse.data);

            const drivingBridgeModelResponse = await SelectListService.getDrivingBridgeModel();
            setDrivingBridgeModels(drivingBridgeModelResponse.data);

            const controlledBridgeModelResponse = await SelectListService.getControlledBridgeModel();
            setControlledBridgeModels(controlledBridgeModelResponse.data);

            const serviceCompanyResponse = await SelectListService.getServiceCompany();
            setServiceCompany(serviceCompanyResponse.data);

            const clientResponse = await SelectListService.getClient();
            setClient(clientResponse.data);

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
            await axios.post('/machine/', {
                machineSerialNumber: data.machineSerialNumber,
                equipmentModel: data.equipmentModel,
                engineMake: data.engineMake,
                engineSerialNumber: data.engineSerialNumber,
                transmissionModel: data.transmissionModel,
                transmissionSerialNumber: data.transmissionSerialNumber,
                drivingBridgeModel: data.drivingBridgeModel,
                drivingBridgeSerialNumber: data.drivingBridgeSerialNumber,
                controlledBridgeModel: data.controlledBridgeModel,
                controlledBridgeSerialNumber: data.controlledBridgeSerialNumber,
                contract: data.contract,
                shipDate: data.shipDate,
                consignee: data.consignee,
                deliveryAddress: data.deliveryAddress,
                picking: data.picking,
                client: data.client,
                serviceCompany: data.serviceCompany,
            });

            setSuccessMessage(`Машина № ${data.machineSerialNumber} успешно добавлена`);
            setData({ ...data, machineSerialNumber: '' });
            setData({ ...data, equipmentModel: '' });
            setData({ ...data, engineMake: '' });
            setData({ ...data, engineSerialNumber: '' });
            setData({ ...data, transmissionModel: '' });
            setData({ ...data, transmissionSerialNumber: '' });
            setData({ ...data, drivingBridgeModel: '' });
            setData({ ...data, drivingBridgeSerialNumber: '' });
            setData({ ...data, controlledBridgeModel: '' });
            setData({ ...data, controlledBridgeSerialNumber: '' });
            setData({ ...data, contract: '' });
            setData({ ...data, shipDate: '' });
            setData({ ...data, consignee: '' });
            setData({ ...data, deliveryAddress: '' });
            setData({ ...data, picking: '' });
            setData({ ...data, client: '' });
            setData({ ...data, serviceCompany: '' });

        } catch (error) {
            setSuccessMessage({ ...data, successMessage: 'Вы ввели неверные данные' });
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
                    <div>
                        <h3>{!successMessage && 'Добавление новой Машины'}</h3>

                        <div className="form-container">
                            <div className="input-container">
                                <label>Зав. № машины:</label>
                                <MyInput
                                    type="text"
                                    name="machineSerialNumber"
                                    value={data.machineSerialNumber}
                                    onChange={handleChange}
                                />

                                <label>Зав. № двигателя: </label>
                                <MyInput
                                    type="text"
                                    name="engineSerialNumber"
                                    value={data.engineSerialNumber}
                                    onChange={handleChange}
                                />

                                <label>Зав. № трансмиссии: </label>
                                <MyInput
                                    type="text"
                                    name="transmissionSerialNumber"
                                    value={data.transmissionSerialNumber}
                                    onChange={handleChange}
                                />

                                <label>Зав. № ведущего моста: </label>
                                <MyInput
                                    type="text"
                                    name="drivingBridgeSerialNumber"
                                    value={data.drivingBridgeSerialNumber}
                                    onChange={handleChange}
                                />

                                <label>Зав. № управляемого моста: </label>
                                <MyInput
                                    type="text"
                                    name="controlledBridgeSerialNumber"
                                    value={data.controlledBridgeSerialNumber}
                                    onChange={handleChange}
                                />

                                <label>Договор поставки №, дата: </label>
                                <MyInput
                                    type="text"
                                    name="contract"
                                    value={data.contract}
                                    onChange={handleChange}
                                />

                                <label>Грузополучатель: </label>
                                <MyInput
                                    type="text"
                                    name="consignee"
                                    value={data.consignee}
                                    onChange={handleChange}
                                />

                                <label>Адрес поставки: </label>
                                <MyInput
                                    type="text"
                                    name="deliveryAddress"
                                    value={data.deliveryAddress}
                                    onChange={handleChange}
                                />

                                <label>Дата отгрузки с завода: </label>
                                <MyInput
                                    type="date"
                                    name="shipDate"
                                    value={data.shipDate}
                                    onChange={handleChange}
                                />

                                <label>Комплектация: </label>
                                <MyTextarea
                                    type="text"
                                    name="picking"
                                    value={data.picking}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="select-container">
                                <MySelect
                                    label="Модель техники"
                                    name="equipmentModel"
                                    value={data.equipmentModel}
                                    options={equipmentModels}
                                    field="title"
                                    onChange={handleChange}
                                />

                                <MySelect
                                    label="Модель двигателя"
                                    name="engineMake"
                                    value={data.engineMake}
                                    options={engineMakes}
                                    field="title"
                                    onChange={handleChange}
                                />

                                <MySelect
                                    label="Модель трансмиссии"
                                    name="transmissionModel"
                                    value={data.transmissionModel}
                                    options={transmissionModels}
                                    field="title"
                                    onChange={handleChange}
                                />

                                <MySelect
                                    label="Модель ведущего моста"
                                    name="drivingBridgeModel"
                                    value={data.drivingBridgeModel}
                                    options={drivingBridgeModels}
                                    field="title"
                                    onChange={handleChange}
                                />

                                <MySelect
                                    label="Модель управляемого моста:"
                                    name="controlledBridgeModel"
                                    value={data.controlledBridgeModel}
                                    options={controlledBridgeModels}
                                    field="title"
                                    onChange={handleChange}
                                />

                                <MySelect
                                    label="Клиент"
                                    name="client"
                                    value={data.client}
                                    options={client}
                                    field={'clientUser'}
                                    onChange={handleChange}
                                />

                                <MySelect
                                    label="Сервисная компания"
                                    name="serviceCompany"
                                    value={data.serviceCompany}
                                    options={serviceCompany}
                                    field={'serviceCompanyUser'}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <MyButton type="submit">Создать</MyButton>
                    </div>
                </form>
            </div>
        </>
    );
};
