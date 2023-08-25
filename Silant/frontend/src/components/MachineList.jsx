import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'

import MyButton from '../UI/Button/MyButton'
import ListService from '../API/ListService'

import AddListsObjects from './AddListsObjects.jsx'

import '../styles/GetTable.css'

export default function MachineList({ filteredMachines }) {
    const isManager = useSelector(state => state.auth.manager);

    const [machines, setMachines] = useState([])
    const [objectInfo, setObjectInfo] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEquipmentModel, setSelectedEquipmentModel] = useState('');
    const [selectedEngineMake, setSelectedEngineMake] = useState('');
    const [selectedTransmissionModel, setSelectedTransmissionModel] = useState('');
    const [selectedDrivingBridgeModel, setSelectedDrivingBridgeModel] = useState('');
    const [selectedControlledBridgeModel, setSelectedControlledBridgeModele] = useState('');

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

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

    ///

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedMachines = machines && machines.length ? machines.sort((a, b) => {
        if (sortColumn === 'machineSerialNumber') {
            return sortDirection === 'asc' ? a.machineSerialNumber.localeCompare(b.machineSerialNumber) : b.machineSerialNumber.localeCompare(a.machineSerialNumber);
        } else if (sortColumn === 'equipmentModel') {
            return sortDirection === 'asc' ? a.equipmentModel.localeCompare(b.equipmentModel) : b.equipmentModel.localeCompare(a.equipmentModel);
        } else if (sortColumn === 'engineMake') {
            return sortDirection === 'asc' ? a.engineMake.localeCompare(b.engineMake) : b.engineMake.localeCompare(a.engineMake);
        } else if (sortColumn === 'engineSerialNumber') {
            return sortDirection === 'asc' ? a.engineSerialNumber.localeCompare(b.engineSerialNumber) : b.engineSerialNumber.localeCompare(a.engineSerialNumber);
        } else if (sortColumn === 'transmissionModel') {
            return sortDirection === 'asc' ? a.transmissionModel.localeCompare(b.transmissionModel) : b.transmissionModel.localeCompare(a.transmissionModel);
        } else if (sortColumn === 'transmissionSerialNumber') {
            return sortDirection === 'asc' ? a.transmissionSerialNumber.localeCompare(b.transmissionSerialNumber) : b.transmissionSerialNumber.localeCompare(a.transmissionSerialNumber);
        } else if (sortColumn === 'drivingBridgeModel') {
            return sortDirection === 'asc' ? a.drivingBridgeModel.localeCompare(b.drivingBridgeModel) : b.drivingBridgeModel.localeCompare(a.drivingBridgeModel);
        } else if (sortColumn === 'drivingBridgeSerialNumber') {
            return sortDirection === 'asc' ? a.drivingBridgeSerialNumber.localeCompare(b.drivingBridgeSerialNumber) : b.drivingBridgeSerialNumber.localeCompare(a.drivingBridgeSerialNumber);
        } else if (sortColumn === 'controlledBridgeModel') {
            return sortDirection === 'asc' ? a.controlledBridgeModel.localeCompare(b.controlledBridgeModel) : b.controlledBridgeModel.localeCompare(a.controlledBridgeModel);
        } else if (sortColumn === 'controlledBridgeSerialNumber') {
            return sortDirection === 'asc' ? a.controlledBridgeSerialNumber.localeCompare(b.controlledBridgeSerialNumber) : b.controlledBridgeSerialNumber.localeCompare(a.controlledBridgeSerialNumber);
        } else if (sortColumn === 'contract') {
            return sortDirection === 'asc' ? a.contract.localeCompare(b.contract) : b.contract.localeCompare(a.contract);
        } else if (sortColumn === 'shipDate') {
            return sortDirection === 'asc' ? a.shipDate.localeCompare(b.shipDate) : b.shipDate.localeCompare(a.shipDate);
        } else if (sortColumn === 'consignee') {
            return sortDirection === 'asc' ? a.consignee.localeCompare(b.consignee) : b.consignee.localeCompare(a.consignee);
        } else if (sortColumn === 'deliveryAddress') {
            return sortDirection === 'asc' ? a.deliveryAddress.localeCompare(b.deliveryAddress) : b.deliveryAddress.localeCompare(a.deliveryAddress);
        } else if (sortColumn === 'picking') {
            return sortDirection === 'asc' ? a.picking.localeCompare(b.picking) : b.picking.localeCompare(a.picking);
        } else if (sortColumn === 'client') {
            return sortDirection === 'asc' ? a.client.localeCompare(b.client) : b.client.localeCompare(a.client);
        } else if (sortColumn === 'serviceCompany') {
            return sortDirection === 'asc' ? a.serviceCompany.localeCompare(b.serviceCompany) : b.serviceCompany.localeCompare(a.serviceCompany);
        };

        return 0;
    }) : [];




    return (
        <div>
            <div>
                <h1 style={{ textAlign: 'center' }}>Информация о комплектации и технических характеристиках</h1>
            </div>
            {!isManager ? null :
                <div className="list-buttons">
                    <AddListsObjects url={'equipment-model'} label={'Добавить модель техники'} />
                    <AddListsObjects url={'engine-make'} label={'Добавить модель двигателя'} />
                    <AddListsObjects url={'transmission-model'} label={'Добавить модель трансмиссии'} />
                    <AddListsObjects url={'driving-bridge-model'} label={'Добавить модель ведущего моста'} />
                    <AddListsObjects url={'controlled-bridge-model'} label={'Добавить управляемого моста'} />
                </div>}
            {machines.length ? (
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('machineSerialNumber')}>
                                    Зав. № машины
                                    {sortColumn === 'machineSerialNumber' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('equipmentModel')}>
                                    Модель техники
                                    {sortColumn === 'equipmentModel' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('engineMake')}>
                                    Модель двигателя
                                    {sortColumn === 'engineMake' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('engineSerialNumber')}>
                                    Зав. № двигателя
                                    {sortColumn === 'engineSerialNumber' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('transmissionModel')}>
                                    Модель трансмиссии
                                    {sortColumn === 'transmissionModel' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('transmissionSerialNumber')}>
                                    Зав. № трансмиссии
                                    {sortColumn === 'transmissionSerialNumber' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('drivingBridgeModel')}>
                                    Модель ведущего моста
                                    {sortColumn === 'drivingBridgeModel' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('drivingBridgeSerialNumber')}>
                                    Зав. № ведущего моста
                                    {sortColumn === 'drivingBridgeSerialNumber' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('controlledBridgeModel')}>
                                    Модель управляемого моста
                                    {sortColumn === 'controlledBridgeModel' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('controlledBridgeSerialNumber')}>
                                    Зав. № управляемого моста
                                    {sortColumn === 'controlledBridgeSerialNumber' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('contract')}>
                                    Договор поставки №, дата
                                    {sortColumn === 'contract' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('shipDate')}>
                                    Дата отгрузки с завода
                                    {sortColumn === 'shipDate' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('consignee')}>
                                    Грузополучатель
                                    {sortColumn === 'consignee' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('deliveryAddress')}>
                                    Адрес поставки
                                    {sortColumn === 'deliveryAddress' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('picking')}>
                                    Комплектация
                                    {sortColumn === 'picking' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('client')}>
                                    Клиент
                                    {sortColumn === 'client' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                                <th onClick={() => handleSort('serviceCompany')}>
                                    Сервисная компания
                                    {sortColumn === 'serviceCompany' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMachines.map(machine => (
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
