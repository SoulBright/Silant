import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

import MyButton from '../UI/Button/MyButton'
import ListService from '../API/ListService'

import AddListsObjects from '../Lists/AddListsObjects.jsx'

import '../styles/GetTable.css'

export default function MachineList({ filteredMachines }) {
    const [machines, setMachines] = useState([])
    const [objectInfo, setObjectInfo] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEquipmentModel, setSelectedEquipmentModel] = useState('');
    const [selectedEngineMake, setSelectedEngineMake] = useState('');
    const [selectedTransmissionModel, setSelectedTransmissionModel] = useState('');
    const [selectedDrivingBridgeModel, setSelectedDrivingBridgeModel] = useState('');
    const [selectedControlledBridgeModel, setSelectedControlledBridgeModele] = useState('');

    useEffect(() => {
        setMachines(filteredMachines);
    }, [filteredMachines]);

    useEffect(() => {
        if (selectedEquipmentModel) {
            ListService.getEquipmentModel(selectedEquipmentModel)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedEquipmentModel]);

    useEffect(() => {
        if (selectedEngineMake) {
            ListService.getEngineMake(selectedEngineMake)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedEngineMake]);

    useEffect(() => {
        if (selectedTransmissionModel) {
            ListService.getTransmissionModel(selectedTransmissionModel)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedTransmissionModel]);

    useEffect(() => {
        if (selectedDrivingBridgeModel) {
            ListService.getDrivingBridgeModel(selectedDrivingBridgeModel)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedDrivingBridgeModel]);

    useEffect(() => {
        if (selectedControlledBridgeModel) {
            ListService.getControlledBridgeModel(selectedControlledBridgeModel)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedControlledBridgeModel]);

    const handleEquipmentModelClick = (machine) => {
        setSelectedEquipmentModel(machine);
    };

    const handleEngineMakeClick = (machine) => {
        setSelectedEngineMake(machine);
    };

    const handleTransmissionModelClick = (machine) => {
        setSelectedTransmissionModel(machine);
    };

    const handleDrivingBridgeModelClick = (machine) => {
        setSelectedDrivingBridgeModel(machine);
    };

    const handleControlledBridgeModeleClick = (machine) => {
        setSelectedControlledBridgeModele(machine);
    };

    const closeModal = () => {
        setSelectedEquipmentModel('');
        setSelectedEngineMake('');
        setSelectedTransmissionModel('');
        setSelectedDrivingBridgeModel('');
        setSelectedControlledBridgeModele('');
        setModalIsOpen(false);
    }

    return (
        <div>
            <div>
                <h1 style={{ textAlign: 'center' }}>Информация о комплектации и технических характеристиках вашей техники</h1>
            </div>
            <div className="list-buttons">
                <AddListsObjects url={'equipment-model'} label={'Добавить модель техники'}/>
                <AddListsObjects url={'engine-make'} label={'Добавить модель двигателя'}/>
                <AddListsObjects url={'transmission-model'} label={'Добавить модель трансмиссии'}/>
                <AddListsObjects url={'driving-bridge-model'} label={'Добавить модель ведущего моста'}/>
                <AddListsObjects url={'controlled-bridge-model'} label={'Добавить управляемого моста'}/>
            </div>
            {machines.length ? (
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
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
                        </thead>
                        <tbody>
                            {machines.map(machine => (
                                <tr key={machine.id}>
                                    <td>{machine.machineSerialNumber}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleEquipmentModelClick(machine.equipmentModel)}>
                                        {machine.equipmentModel}
                                    </td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleEngineMakeClick(machine.engineMake)}>
                                        {machine.engineMake}
                                    </td>
                                    <td>{machine.engineSerialNumber}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleTransmissionModelClick(machine.transmissionModel)}>
                                        {machine.transmissionModel}
                                    </td>
                                    <td>{machine.transmissionSerialNumber}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleDrivingBridgeModelClick(machine.drivingBridgeModel)}>
                                        {machine.drivingBridgeModel}
                                    </td>
                                    <td>{machine.drivingBridgeSerialNumber}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleControlledBridgeModeleClick(machine.controlledBridgeModel)}>
                                        {machine.controlledBridgeModel}
                                    </td>
                                    <td>{machine.controlledBridgeSerialNumber}</td>
                                    <td>{machine.contract}</td>
                                    <td>{machine.shipDate}</td>
                                    <td>{machine.consignee}</td>
                                    <td>{machine.deliveryAddress}</td>
                                    <td
                                        style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>
                                        {machine.picking}
                                    </td>
                                    <td>{machine.client}</td>
                                    <td>{machine.serviceCompany}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h3 style={{ color: '#D20A11', textAlign: 'center' }}>Машины с выбранными параметрами отсутствуют</h3>
            )}
            <Modal
                className="modal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Object Info Modal"
            >
                <div className="info">
                    <h2>{objectInfo.title}</h2>
                    <p>{objectInfo.description}</p>
                </div>
                <MyButton onClick={closeModal}>Закрыть</MyButton>
            </Modal>
        </div>
    );
}
