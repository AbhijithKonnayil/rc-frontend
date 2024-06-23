import { default as React, useEffect, useState } from "react";
import ScrollBodyInNavWrapper from "../components/ScrollBodyInNavWrapper";
import { ScrollSection } from "../components/ScrollSection";
import { State, StateBuilder } from "../components/StateBuilder";
import HeadingRow from "../components/heading-row/HeadingRow";
import { NavigationWrapper } from "../components/sidebar/Navigation";
import TextField from "../components/textfield";
import CurriculumService from "../services/CurriculumService";
import TrainingService from "../services/TrainingService";
const AddTraining = () => {
  const [trainingData, setTrainingData] = useState({
    title: undefined,
    code: undefined,
    curriculum: undefined,
    training_material_link: undefined,
    description: undefined,
  });
  const [trainings, setTrainings] = useState([]);
  const [state, setState] = useState(State.initial);
  const [curriculums, setCurriculums] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const trainings = await TrainingService.getTrainings();
      const curriculums = await CurriculumService.getCurriculum();
      setTrainings(trainings);
      setCurriculums(curriculums);
      setState(State.success);
    } catch (e) {}
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await TrainingService.addTrainings(trainingData);
      // Clear form fields after successful submission
      setTrainingData({
        title: undefined,
        code: undefined,
        curriculum: undefined,
        training_material_link: undefined,
        description: undefined,
      });
      alert("Training added successfully!");
      getData();
    } catch (error) {
      console.error("Error adding Training:", error);
      alert("Failed to add Training. Please try again.");
    }
  };

  const Form = () => {
    return (
      <div className="flex flex-1 justify  p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg w-full max-w-lg"
        >
          <TextField
            type="text"
            id="title"
            name="title"
            label="Title"
            value={trainingData.title}
            onChange={handleChange}
            required
            className="mb-8"
          />
          <TextField
            type="text"
            id="code"
            name="code"
            label="Code"
            value={trainingData.code}
            onChange={handleChange}
            required
            className="mb-8"
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            value={trainingData.description}
            onChange={handleChange}
            required
            className="mb-8"
          />
          <TextField
            id="training_material_link"
            name="training_material_link"
            label="Material Link"
            value={trainingData.training_material_link}
            onChange={handleChange}
            required
            className="mb-8"
          />

          <DropDown
            className="mb-20"
            list={curriculums}
            label="Curriculum"
            name="curriculum"
            value={trainingData.curriculum}
            optionValue={(e) => e.id}
            handleChange={handleChange}
            displayTextFun={(e) => {
              return e.name;
            }}
          />
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
    <NavigationWrapper
      Child={
        <ScrollBodyInNavWrapper
          child={
            <div>
              <HeadingRow heading={"Add Training"} />
              <div className="flex flex-1">
                {Form()}
                <StateBuilder
                  state={state}
                  successUi={
                    <ScrollSection
                      title={"Trainings"}
                      list={trainings}
                      displayTextFun={(e) => {
                        return e.title;
                      }}
                    />
                  }
                />
              </div>
            </div>
          }
        />
      }
    />
  );
};

const DropDown = ({
  list,
  displayTextFun,
  className,
  label,
  value,
  name,
  optionValue,
  handleChange,
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={label} className="block text-gray-700 font-medium mb-2">
          {label}
        </label>
      )}
      <div className={``}>
        <select
          className="mt-1 p-2 w-full border rounded-md"
          value={value}
          name={name}
          onChange={handleChange}
        >
          <option disabled selected value>
            {" "}
            -- select an option --{" "}
          </option>
          {list.map((e) => {
            return (
              <option key={optionValue(e)} value={optionValue(e)}>
                {displayTextFun(e)}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default AddTraining;
