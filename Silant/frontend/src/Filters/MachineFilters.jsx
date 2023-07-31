import React, { useState, useEffect } from 'react'

import SelectListService from '../API/SelectListService';
import MachineService from '../API/MachineService';

import MySelect from '../UI/Select/MySelect';
import MyButton from '../UI/Button/MyButton';

export default function MachineFilters() {
    const [filterValues, setFilterValues] = useState({
        equipmentModel: '',
        engineMake: '',
        transmissionModel: '',
        drivingBridgeModel: '',
        controlledBridgeModel: '',
    });

    const [equipmentModels, setEquipmentModels] = useState([]);
    const [engineMakes, setEngineMakes] = useState([]);
    const [transmissionModels, setTransmissionModels] = useState([]);
    const [drivingBridgeModels, setDrivingBridgeModels] = useState([]);
    const [controlledBridgeModels, setControlledBridgeModels] = useState([]);
    const [resetValues, setResetValues] = useState(false);

    useEffect(() => {

        async function fetchData() {
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
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (resetValues) {
            setFilterValues({
                equipmentModel: '',
                engineMake: '',
                transmissionModel: '',
                drivingBridgeModel: '',
                controlledBridgeModel: '',
            });
            setResetValues(false);
        }
    }, [resetValues]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterValues({ ...filterValues, [name]: value });
    };

    const handleFilterSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await MachineService.getWithFilters(filterValues);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleResetFilters = () => {
        setResetValues(true);
    };

    return (
        <div>
            <form onSubmit={handleFilterSubmit}>
                <MySelect
                    label="Модель оборудования"
                    name="equipmentModel"
                    value={filterValues.equipmentModel}
                    options={equipmentModels}
                    field={'title'}
                    onChange={handleFilterChange}
                />
                <br />
                <MySelect
                    label="Производитель двигателя"
                    name="engineMake"
                    value={filterValues.engineMake}
                    options={engineMakes}
                    field={'title'}
                    onChange={handleFilterChange}
                />
                <br />
                <MySelect
                    label="Модель трансмиссии"
                    name="transmissionModel"
                    value={filterValues.transmissionModel}
                    options={transmissionModels}
                    field={'title'}
                    onChange={handleFilterChange}
                />
                <br />
                <MySelect
                    label="Модель моста, отвечающего за передвижение"
                    name="drivingBridgeModel"
                    value={filterValues.drivingBridgeModel}
                    options={drivingBridgeModels}
                    field={'title'}
                    onChange={handleFilterChange}
                />
                <br />
                <MySelect
                    label="Модель управляемого моста"
                    name="controlledBridgeModel"
                    value={filterValues.controlledBridgeModel}
                    options={controlledBridgeModels}
                    field={'title'}
                    onChange={handleFilterChange}
                />
                <br />
                <MyButton type="submit">Применить фильтры</MyButton>
                <MyButton onClick={handleResetFilters}>Сбросить фильтры</MyButton>
            </form>
        </div>
    )
}