import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Moment from "react-moment";
import "react-tabs/style/react-tabs.css";
import PageWrapper from "../../components/PageWrapper";
import { State } from "../../components/StateBuilder";
import "../../components/calendar/Calendar.js";
import CalendarBox from "../../components/calendar/Calendar.js";
import "../../components/calendar/calendar.css";
import CurriculumService from "../../services/CurriculumService.js";
import TrainingService from "../../services/TrainingService";
const EmpHomePage = () => {
  const [state, setState] = useState(State.initial);
  const [pendingTraining, setTrainings] = useState([]);
  const [completedTrainings, setCompletedTrainings] = useState([]);
  const [curriculum, setCurriculum] = useState([]);
  const [date, onDateChange] = useState(new Date());
  useEffect(() => {
    getTraining();
  }, []);
  const [complianceBriefState, setComplianceBriefState] = useState(
    State.initial
  );
  const [
    { avg_attempts, avg_score, user, total_trainings, completed_trainings },
    setComplianceBrief,
  ] = useState({});
  useEffect(() => {
    getTrainingComplianceBrief();
  }, []);
  useEffect(() => {
    getCurriculums();
  }, []);

  return (
    <PageWrapper
      PageHeading={`Welcome, ${localStorage.getItem("username")}`}
      state={state}
      successUi={
        <div className="flex-1">
          <div className="flex">
            <div className="flex-1 text-left bg-gray-200 p-8 rounded-xl">
              <a href="/trainings">
                <h1 className="text-2xl mb-4">UPCOMING TASKS</h1>
                <ul className="marker:text-green list-outside list-disc ml-6">
                  {pendingTraining.map((t) => (
                    <li className="text-red-500 text-3xl">
                      <div className="flex text-black text-base items-center">
                        <Moment format="DD MMM" className="font-semibold w-14">
                          {t.due_date}
                        </Moment>
                        <span className="text-2xl font-thin px-2">|</span>
                        <div className="">{t.title}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <h1 className="text-2xl mb-4 mt-8">COMPLETED</h1>
                <ul className="marker:text-green list-outside list-disc ml-6">
                  {completedTrainings.map((t) => (
                    <li className="text-green-500 text-3xl">
                      <div className="flex text-black text-base">
                        <div className="">
                          <strike>{t.title}</strike>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>{" "}
              </a>
            </div>
          </div>
        </div>
      }
      sidebar={
        <>
          <a href="/schedule">
            <div className="mb-8">
              <CalendarBox value={date} />
            </div>
          </a>

          <a href="/analytics">
            <div className="text-xl bg-gray-200 rounded-xl p-4 flex mb-8">
              <div style={{ width: 75, height: 75 }}>
                <CircularProgressbar
                  className="text-base"
                  value={completed_trainings / total_trainings}
                  maxValue={1}
                  text={`${(
                    (completed_trainings / total_trainings) *
                    100
                  ).toFixed(2)}%`}
                />
              </div>
              <div className="flex-1">
                <p>
                  {completed_trainings}/{total_trainings} Trainings completed
                  this month
                </p>
              </div>
            </div>
          </a>

          <div className="bg-gray-200 text-xl  rounded-xl p-4 text-left">
            <div>
              {curriculum.map((e) => (
                <li>
                  Certified in
                  <span className="font-semibold"> {e.name}</span>
                </li>
              ))}
            </div>
          </div>
        </>
      }
    />
  );

  async function getTraining() {
    setState(State.loading);
    try {
      const pendingTraining = await TrainingService.getTrainingsCompliances({
        trainingStatus: "pending",
      });
      setTrainings(pendingTraining);
      const completedTraining = await TrainingService.getTrainingsCompliances({
        trainingStatus: "completed",
      });
      console.log(completedTraining);
      setCompletedTrainings(completedTraining);
      setState(State.success);
      console.log(state);
    } catch (error) {
      console.log(error);
      setState(State.failed);
    }
  }

  async function getTrainingComplianceBrief() {
    setComplianceBriefState(State.loading);
    try {
      const complianceBrief =
        await TrainingService.getTrainingComplianceBrief();
      console.log("complianceBrief");
      console.log(complianceBrief);
      setComplianceBrief(complianceBrief);
      setComplianceBriefState(State.success);
      console.log(complianceBrief);
    } catch (error) {
      console.log(error);
      setComplianceBriefState(State.failed);
    }
  }

  async function getCurriculums() {
    setState(State.loading);
    try {
      const curriculum = await CurriculumService.getCurriculumAssignment({
        status: "completed",
      });
      setCurriculum(curriculum);
      setState(State.success);
      console.log(state);
    } catch (error) {
      console.log(error);
      setState(State.failed);
    }
  }
};

export default EmpHomePage;
