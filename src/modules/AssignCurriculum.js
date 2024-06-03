import React, { useEffect, useState } from 'react';
import ScrollSection from '../components/ScrollSection';
import { State, StateBuilder } from '../components/StateBuilder';
import HeadingRow from '../components/heading-row/HeadingRow';
import { NavigationWrapper } from '../components/sidebar/Navigation';
import CurriculumService from '../services/CurriculumService';
import UserService from '../services/UserService';

import ScrollBodyInNavWrapper from '../components/ScrollBodyInNavWrapper';
const AssignCurriculum = () => {
    const [state, setState] = useState(State.initial);
    const [curriculum, setCurriculum] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [selectedCurriculum, setSelectedCurriculum] = useState({});
    const [selectedEmployees, setSelectedEmployees] = useState({});

    useEffect(() => {
        getData();
    }, []);

    return (
        <NavigationWrapper
            Child={
                <StateBuilder
                    state={state}
                    successUi={
                        <ScrollBodyInNavWrapper child={
                            <div>
                                <HeadingRow heading={'Assign Curriculum'} />
                                <SuccessUi />
                            </div>}
                        />
                    }
                />
            }
        />
    );

    async function getData() {
        try {
            const res = await getEmployees();
            const curriculum = await getCurriculum();
            console.log(curriculum);
            setEmployee(res);
            setCurriculum(curriculum);
            setState(State.success);
        } catch (e) { }
    }

    async function getEmployees() {
        try {
            const res = await UserService.getEmployees();
            return res;
        } catch (error) { }
    }

    async function getCurriculum() {
        try {
            const res = await CurriculumService.getCurriculum();
            return res;
        } catch (error) { }
    }

    function handleCurriculumCheckboxChange(curriculumId) {
        console.log("handleCurriculumCheckboxChange");
        setSelectedCurriculum((prevState) => ({
            ...prevState,
            [curriculumId]: !prevState[curriculumId],
        }));
    }

    function handleEmployeeCheckboxChange(empId) {
        console.log("handleEmployeeCheckboxChange");
        setSelectedEmployees((prevState) => ({
            ...prevState,
            [empId]: !prevState[empId],
        }));
    }

    async function onAssignCurriculum() {
        const selectedCurriculumIds = Object.keys(selectedCurriculum).filter(
            (id) => selectedCurriculum[id]
        );
        const selectedEmployeeIds = Object.keys(selectedEmployees).filter(
            (id) => selectedEmployees[id]
        );

        // Perform further actions with selectedCurriculumIds, such as submitting to backend
        console.log("Selected Curriculum IDs:", selectedCurriculumIds);
        console.log("Selected Emp IDs:", selectedEmployeeIds);
        try {
            const res = await CurriculumService.assignCurriculums(
                selectedEmployeeIds,
                selectedCurriculumIds
            );
            console.log(res);
            alert("Curriculum Assigned");
            return res;
        } catch (error) { }
    }

    function SuccessUi() {
        if (employee.length === 0) {
            return <div>No Employee</div>;
        }
        return (
            <div className="flex-1 flex-col flex ">
                <div className="flex-1 text-center">
                    <div className="flex flex-1">{/* 3 cols */}
                        <ScrollSection
                            title={'Curriculum'}
                            list={curriculum}
                            selectedItem={selectedCurriculum}
                            handleCheckboxChange={handleCurriculumCheckboxChange}
                            displayTextFun={(e) => { return e.name }}
                        />

                        <ScrollSection
                            title={'Employee'}
                            list={employee}
                            selectedItem={selectedEmployees}
                            handleCheckboxChange={handleEmployeeCheckboxChange}
                            displayTextFun={(e) => { return `${e.id} ${e.username}` }}

                        />

                        <div className="basis-1/5 p-4">
                            <button onClick={onAssignCurriculum} className="w-full p-2 bg-gray-900 text-white rounded">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


};

export default AssignCurriculum;

