import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

import MyButton from '../UI/Button/MyButton'
import ListService from '../API/ListService'

export default function ReclamationList({ filteredReclamations }) {
    console.log(`В данный момент в пропсе${filteredReclamations}`)
    const [reclamations, setReclamation] = useState([]);
    console.log(`В данный момент в массиве ${reclamations}`)
    const [objectInfo, setObjectInfo] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedFailureJuncture, setSelectedFailureJuncture] = useState('');
    const [selectedRecoveryMethod, setSelectedRecoveryMethod] = useState('');

    useEffect(() => {
        setReclamation(filteredReclamations);
    }, [filteredReclamations]);

    useEffect(() => {
        if (selectedFailureJuncture) {
            ListService.getFailureJuncture(selectedFailureJuncture)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedFailureJuncture]);

    useEffect(() => {
        if (selectedRecoveryMethod) {
            ListService.getRecoveryMethod(selectedRecoveryMethod)
                .then((resp) => {
                    setObjectInfo(resp.data);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedRecoveryMethod]);

    const handleFailureJunctureClick = (reclamation) => {
        setSelectedFailureJuncture(reclamation);
    };

    const handleRecoveryMethodClick = (reclamation) => {
        setSelectedRecoveryMethod(reclamation);
    };

    const closeModal = () => {
        setSelectedFailureJuncture('');
        setSelectedRecoveryMethod('');
        setModalIsOpen(false)
    }

    return (
        <div>
            <div>
                <h1 style={{ textAlign: 'center' }}>Информация о рекламациях вашей техники</h1>
            </div>
            {reclamations.length ? (
                <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Дата отказа</th>
                                <th>Наработка, м/час</th>
                                <th>Узел отказа</th>
                                <th>Описание отказа</th>
                                <th>Способ восстановления</th>
                                <th>Запасные части</th>
                                <th>Дата восстановления</th>
                                <th>Время простоя техники</th>
                                <th>Машина</th>
                                <th>Сервисная компания</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reclamations.map(reclamation => (
                                <tr key={reclamation.id}>
                                    <td>{reclamation.failureDate}</td>
                                    <td>{reclamation.operatingTime}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleFailureJunctureClick(reclamation.failureJuncture)}>
                                        {reclamation.failureJuncture}
                                    </td>
                                    <td>{reclamation.failureDescription}</td>
                                    <td
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleRecoveryMethodClick(reclamation.recoveryMethod)}>
                                        {reclamation.recoveryMethod}
                                    </td>
                                    <td>{reclamation.spareParts}</td>
                                    <td>{reclamation.recoveryDate}</td>
                                    <td>{reclamation.equipmentDowntime}</td>
                                    <td>{reclamation.machine}</td>
                                    <td>{reclamation.serviceCompany}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h3 style={{color: '#D20A11', textAlign: 'center' }}>Рекламации с выбранными параметрами отсутствуют</h3>
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
    )
}
