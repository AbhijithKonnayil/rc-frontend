import { default as React, useState } from 'react';
import { NavigationWrapper } from '../components/Navigation';
import CurriculumService from '../services/CurriculumService';

const AddCurriculum = () => {
    const [curriculumData, setCurriculumData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurriculumData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the service to submit curriculum data
            await CurriculumService.addCurriculum(curriculumData);
            // Clear form fields after successful submission
            setCurriculumData({
                name: '',
                description: ''
            });
            alert('Curriculum added successfully!');
        } catch (error) {
            console.error('Error adding curriculum:', error);
            alert('Failed to add curriculum. Please try again.');
        }
    };
    return (
        <NavigationWrapper Child={
            <div>
                <h2>Add Curriculum</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={curriculumData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={curriculumData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>} />
    );
}

export default AddCurriculum