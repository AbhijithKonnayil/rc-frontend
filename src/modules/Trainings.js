import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import ListBuilder from "../components/ListBuilder";
import PageWrapper from "../components/PageWrapper";
import { State, StateBuilder } from "../components/StateBuilder";
import TrainingComplianceCard from "../components/TrainingCompliaceCard";
import TabBar from "../components/tabbar/Tabbar";
import TrainingService from "../services/TrainingService";

const Trainings = () => {
  const [state, setState] = useState(State.initial);
  const [complianceBriefState, setComplianceBriefState] = useState(
    State.initial
  );
  const [trainings, setTrainings] = useState({});
  const [
    { avg_attempts, avg_score, user, total_trainings, completed_trainings },
    setComplianceBrief,
  ] = useState({});
  useEffect(() => {
    getTraining();
  }, []);
  useEffect(() => {
    getTrainingComplianceBrief();
  }, []);

  const trainingCardBuilder = (training, index) => (
    <TrainingComplianceCard training={training} key={index} />
  );
  const trainingTabs = [
    {
      id: "due",
      label: "Due",
      content: (
        <StateBuilder
          state={state}
          successUi={
            <ListBuilder
              dataList={trainings.pendingTraining}
              noItemText={"No Training"}
              itemCard={trainingCardBuilder}
            />
          }
        />
      ),
    },
    {
      id: "completed",
      label: "Completed",
      content: (
        <StateBuilder
          state={state}
          successUi={
            <ListBuilder
              dataList={trainings.completedTraining}
              noItemText={"No Training"}
              itemCard={trainingCardBuilder}
            />
          }
        />
      ),
    },
    {
      id: "all",
      label: "All",
      content: (
        <StateBuilder
          state={state}
          successUi={
            <ListBuilder
              dataList={trainings.allTraining}
              noItemText={"No Training"}
              itemCard={trainingCardBuilder}
            />
          }
        />
      ),
    },
  ];

  const Card = ({ title, value, withProgress = false }) => {
    // Add Tailwind CSS classes for styling here (refer to previous example)
    console.log("value ");

    console.log(value);
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <h3 className="text-base font-medium text-gray-800">{title}</h3>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
        {withProgress && (
          <div className="px-6 pt-2 pb-4">
            <div className="h-2 rounded-full bg-gray-200">
              <div
                className={`w-[${withProgress}%] h-full rounded-full bg-blue-500`}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <PageWrapper
      PageHeading="Trainings"
      state={complianceBriefState}
      successUi={
        <div className="flex-1">
          <div className="flex">
            <TabBar tabs={trainingTabs} />
          </div>
        </div>
      }
      sidebar={
        <div className="">
          <div className="h-12"></div>
          <StateBuilder
            state={complianceBriefState}
            successUi={
              <div>
                <div className="flex flex-col">
                  <div className="flex-cols w-full">
                    <div className="bg-gray-200 rounded-xl p-4 my-8">
                      <h2 className="text-5xl font-semibold">
                        {completed_trainings} of {total_trainings}{" "}
                      </h2>
                      <br></br>
                      <p>
                        Training completed in Packing and labeling Curriculum
                      </p>
                    </div>

                    <div className="bg-gray-200 rounded-xl p-4">
                      <h2 className="text-5xl font-semibold">2</h2>
                      <br></br>
                      <p>Training due this week</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      }
    />
  );

  async function getTraining() {
    setState(State.loading);
    try {
      const pendingTraining = await TrainingService.getTrainingsCompliances({
        trainingStatus: "pending",
      });
      const completedTraining = await TrainingService.getTrainingsCompliances({
        trainingStatus: "completed",
      });
      const allTraining = await TrainingService.getTrainingsCompliances();
      setTrainings({
        pendingTraining: pendingTraining,
        completedTraining: completedTraining,
        allTraining: allTraining,
      });
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
};
export default Trainings;
