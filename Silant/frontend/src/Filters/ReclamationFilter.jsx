import React, { useState, useEffect } from 'react'

import SelectListService from '../API/SelectListService';
import ReclamationService from '../API/ReclamationService';

import MySelect from '../UI/Select/MySelect';
import MyButton from '../UI/Button/MyButton';

export default function ReclamationFilter() {

    const [filterValues, setFilterValues] = useState({
        failureJuncture: '',
        recoveryMethod: '',
        serviceCompany: '',
    });

    const [failureJuncture, setFailureJuncture] = useState([]);
    const [recoveryMethod, setRecoveryMethod] = useState([]);
    const [serviceCompany, setServiceCompany] = useState([]);
    const [resetValues, setResetValues] = useState(false);

    useEffect(() => {

        async function fetchData() {
            try {
                const failureJunctureResponse = await SelectListService.getFailureJuncture();
                setFailureJuncture(failureJunctureResponse.data);

                const recoveryMethodResponse = await SelectListService.getRecoveryMethod();
                setRecoveryMethod(recoveryMethodResponse.data);

                const serviceCompanyResponse = await SelectListService.getServiceCompany();
                setServiceCompany(serviceCompanyResponse.data);

            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (resetValues) {
            setFilterValues({
                failureJuncture: '',
                recoveryMethod: '',
                serviceCompany: '',
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
            const response = await ReclamationService.getWithFilters(filterValues);
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
                    label="Узел отказа"
                    name="failureJuncture"
                    value={filterValues.failureJuncture}
                    options={failureJuncture}
                    field={'title'}
                    onChange={handleFilterChange}
                />
                <br />
                <MySelect
                    label="Способ восстановления"
                    name="recoveryMethod"
                    value={filterValues.recoveryMethod}
                    options={recoveryMethod}
                    field={'title'}
                    onChange={handleFilterChange}
                />
                <br />
                <MySelect
                    label="Сервисная компания"
                    name="serviceCompany"
                    value={filterValues.serviceCompany}
                    options={serviceCompany}
                    field={'serviceCompanyUser'}
                    onChange={handleFilterChange}
                />
                <br />
                <MyButton type="submit">Применить фильтры</MyButton>
                <MyButton onClick={handleResetFilters}>Сбросить фильтры</MyButton>
            </form>
        </div>
    )
}
