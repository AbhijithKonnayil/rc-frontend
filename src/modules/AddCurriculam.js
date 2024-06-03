import { default as React, useEffect, useState } from 'react';
import ScrollBodyInNavWrapper from '../components/ScrollBodyInNavWrapper';
import { State, StateBuilder } from '../components/StateBuilder';
import HeadingRow from '../components/heading-row/HeadingRow';
import { NavigationWrapper } from '../components/sidebar/Navigation';
import TextField from '../components/textfield';
import CurriculumService from '../services/CurriculumService';
const AddCurriculum = () => {
    const [curriculumData, setCurriculumData] = useState({
        name: '',
        description: ''
    });
    const [curriculums, setCurriculums] = useState([]);
    const [state, setState] = useState(State.initial);
    useEffect(() => {
        getData();
    }, []);


    async function getData() {
        try {
            const curriculums = await getCurriculum();
            setCurriculums(curriculums);
            setState(State.success);
        } catch (e) { }
    }

    async function getCurriculum() {
        try {
            const res = await CurriculumService.getCurriculum();
            return res;
        } catch (error) { }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(curriculumData)
        setCurriculumData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(curriculumData);
            await CurriculumService.addCurriculum(curriculumData);
            // Clear form fields after successful submission
            setCurriculumData({
                name: '',
                description: ''
            });
            alert('Curriculum added successfully!');
            getData();
        } catch (error) {
            console.error('Error adding curriculum:', error);
            alert('Failed to add curriculum. Please try again.');
        }
    };

    const Form = () => {
        return (
            <div className="flex flex-1 justify  p-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg w-full max-w-lg"
                >
                    <div className="mb-8">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Name
                        </label>
                        <TextField
                            type="text"
                            id="name"
                            name="name"
                            value={curriculumData.name}
                            onChange={handleChange}
                            required
                            className=""
                        />
                    </div>

                    <div className="mb-20">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <TextField
                            id="description"
                            name="description"
                            value={curriculumData.description}
                            onChange={handleChange}
                            required
                            className=""
                        ></TextField>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white py-2 rounded-md bg-gray-900 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    };

    return (
        <NavigationWrapper Child={
            <ScrollBodyInNavWrapper child={
                <div>
                    <HeadingRow heading={'Add Curriculum'} />
                    <div className="flex flex-1">

                        {Form()}
                        <StateBuilder
                            state={state}
                            successUi={
                                <ScrollSection
                                    title={'Curriculum'}
                                    list={curriculums}
                                    displayTextFun={(e) => { return e.name }}
                                />}
                        />
                    </div></div >
            } />
        } />
    );
};

const ScrollSection = ({ title, list, displayTextFun }) => {

    const [searchKeyword, onSearchChange] = useState('')
    const filteredList = list.filter((e) => {
        console.log(list.includes(e))
        return displayTextFun(e).toLowerCase().includes(searchKeyword.toLowerCase())
    });
    return (
        <div className="basis-2/5 p-2 m-4 border-0 rounded shadow-sm">
            <div className="block ">{list.length === 0 ? `No ${title}` : `${title}`}</div>
            <div className="flex my-4">
                <TextField
                    value={searchKeyword}
                    placeholder={`Search ${title}`}
                    onChange={(e) => {
                        onSearchChange(e.target.value)
                    }}
                    className="flex-1"
                />
                <button className="p-2 ml-2 bg-gray-900 text-white rounded" onClick={() => onSearchChange('')}>
                    Clear
                </button>
            </div>


            <ul className="">
                {filteredList.length == 0 ? <li className="text-center text-gray-500">No {title}</li> : <></>}
                {filteredList.reverse().map((c, index) => (
                    <li key={index} className={`bg-orange-100 text-left my-2 p-5 rounded-md`}>

                        {displayTextFun(c)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AddCurriculum;
