import { default as React, useEffect, useState } from "react";
import ScrollBodyInNavWrapper from "../components/ScrollBodyInNavWrapper";
import { ScrollSection } from "../components/ScrollSection";
import { State, StateBuilder } from "../components/StateBuilder";
import HeadingRow from "../components/heading-row/HeadingRow";
import { NavigationWrapper } from "../components/sidebar/Navigation";
import TextField from "../components/textfield";
import CurriculumService from "../services/CurriculumService";
const AddCurriculum = () => {
  const [curriculumData, setCurriculumData] = useState({
    name: "",
    description: "",
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
    } catch (e) {}
  }

  async function getCurriculum() {
    try {
      const res = await CurriculumService.getCurriculum();
      return res;
    } catch (error) {}
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurriculumData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(curriculumData);
      await CurriculumService.addCurriculum(curriculumData);
      // Clear form fields after successful submission
      setCurriculumData({
        name: "",
        description: "",
      });
      alert("Curriculum added successfully!");
      getData();
    } catch (error) {
      console.error("Error adding curriculum:", error);
      alert("Failed to add curriculum. Please try again.");
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
            id="name"
            name="name"
            label="Name"
            value={curriculumData.name}
            onChange={handleChange}
            required
            className="mb-8"
          />

          <TextField
            id="description"
            name="description"
            value={curriculumData.description}
            onChange={handleChange}
            required
            className="mb-20"
            label="Description"
          ></TextField>

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
              <HeadingRow heading={"Add Curriculum"} />
              <div className="flex flex-1">
                {Form()}
                <StateBuilder
                  state={state}
                  successUi={
                    <ScrollSection
                      title={"Curriculum"}
                      list={curriculums}
                      displayTextFun={(e) => {
                        return e.name;
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

export default AddCurriculum;
