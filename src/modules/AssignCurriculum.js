import React, { useEffect, useState } from 'react';
import { NavigationWrapper } from '../components/Navigation';
import { State, StateBuilder } from '../components/StateBuilder';
import CurriculumService from '../services/CurriculumService';
import UserService from '../services/UserService';

const AssignCurriculum = () => {
    const [state, setState] = useState(State.initial);
    const [curriculum, setCurriculum] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [selectedCurriculum, setSelectedCurriculum] = useState({});
    const [selectedEmployees, setSelectedEmployees] = useState({});
    useEffect(() => { getData() }, [])
    return (<NavigationWrapper Child={<StateBuilder state={state} successUi={<SuccessUi />} />} />);
    return (


        <div>
            <div>AssignCurriculum</div>
            <StateBuilder state={state} successUi={<SuccessUi />} />
        </div>

    )
    async function getData() {
        try {
            const res = await getEmployees();
            const curriculum = await getCurriculum();
            console.log(curriculum)
            setEmployee(res)
            setCurriculum(curriculum)
            setState(State.success)
        } catch (e) { }
    }

    async function getEmployees() {
        try {
            const res = await UserService.getEmployees();
            return res
        } catch (error) {

        }
    }


    async function getCurriculum() {
        try {
            const res = await CurriculumService.getCurriculum();
            return res
        } catch (error) {

        }
    }
    function handleCurriculumCheckboxChange(curriculumId) {
        setSelectedCurriculum(prevState => ({
            ...prevState,
            [curriculumId]: !prevState[curriculumId]
        }));
    }

    function handleEmployeeCheckboxChange(empId) {
        setSelectedEmployees(prevState => ({
            ...prevState,
            [empId]: !prevState[empId]
        }));
    }
    async function onAssignCurriculum() {
        const selectedCurriculumIds = Object.keys(selectedCurriculum).filter(id => selectedCurriculum[id]);
        const selectedEmployeeIds = Object.keys(selectedEmployees).filter(id => selectedEmployees[id]);

        // Perform further actions with selectedCurriculumIds, such as submitting to backend
        console.log("Selected Curriculum IDs:", selectedCurriculumIds);
        console.log("Selected Emp IDs:", selectedEmployeeIds);
        try {
            const res = await CurriculumService.assignCurriculums(selectedEmployeeIds, selectedCurriculumIds);
            console.log(res)
            return res
        } catch (error) {

        }

    }

    function SuccessUi() {
        if (employee.length == 0) {
            return <div>No Employee</div>
        }
        return (<div className="grid grid-cols-2 gap-4">
            <ul className="list-none p-2 border rounded shadow-sm">
                {employee.length == 0 ? 'No Curriculum' : ' Curriculum'}
                {curriculum.map((c, index) => (
                    <li key={index} className="flex items-center">
                        <input type="checkbox" className="mr-2" checked={selectedCurriculum[c.id]}
                            onChange={() => handleCurriculumCheckboxChange(c.id)} />
                        {c.name}
                    </li>
                ))}
            </ul>
            <ul className="list-none p-2 border rounded shadow-sm">
                {employee.length == 0 ? 'No Employee' : ' Employee'}
                {employee.map((emp, index) => (
                    <li key={index} className="flex items-center">

                        <input type="checkbox" className="ml-2 mr-2" checked={selectedEmployees[emp.id]}
                            onChange={() => handleEmployeeCheckboxChange(emp.id)} />
                        {emp.id} {emp.username}
                    </li>
                ))}
            </ul>
            <button onClick={onAssignCurriculum}>Submit</button>
        </div>);
    }

}

export default AssignCurriculum