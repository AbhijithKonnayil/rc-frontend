import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PageWrapper from '../../components/PageWrapper';
import { State, StateBuilder } from '../../components/StateBuilder';
import TrainingComplianceCard from '../../components/TrainingCompliaceCard';
import HeadingRow from '../../components/heading-row/HeadingRow';
import { NavigationWrapper } from '../../components/sidebar/Navigation';
import TabBar from '../../components/tabbar/Tabbar';
import TrainingService from '../../services/TrainingService';
const EmpHomePage = () => {
  const [state, setState] = useState(State.initial);
  const [complianceBriefState, setComplianceBriefState] = useState(State.initial);
  const [trainings, setTrainings] = useState({});
  const [{ avg_attempts, avg_score, user, total_trainings, completed_trainings }, setComplianceBrief] = useState({});
  /*   { avg_attempts, avg_score, user, total_trainings, completed_trainings } */
  useEffect(() => { getTraining() }, [])
  useEffect(() => { getTrainingComplianceBrief() }, [])
  const trainingTabs = [
    { id: 'due', label: 'Due', content: <StateBuilder state={state} successUi={<SuccessUi trainings={trainings.pendingTraining} />} /> },
    { id: 'completed', label: 'Completed', content: <StateBuilder state={state} successUi={<SuccessUi trainings={trainings.completedTraining} />} /> },
    { id: 'all', label: 'Training History', content: <StateBuilder state={state} successUi={<SuccessUi trainings={trainings.allTraining} />} /> },
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
              <div className={`w-[${withProgress}%] h-full rounded-full bg-blue-500`} />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (<PageWrapper PageHeading="Home" state={complianceBriefState} successUi={<div className="">
    <div>
      <div className='flex'>
        <TabBar tabs={trainingTabs} />
        <div>
          <StateBuilder state={complianceBriefState} successUi={<div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card title="Average Attempts" value={avg_attempts} />
                <Card title="Average Score" value={avg_score} />
                <Card title="User" value={user} />
                <Card title="Total Trainings" value={total_trainings} />
                <Card title="Completed Trainings" value={completed_trainings} withProgress={(completed_trainings / total_trainings) * 100} />
              </div>
            </div>
          </div>} />
        </div>
      </div>


    </div>
  </div>} />);
  return (<NavigationWrapper Child={<StateBuilder state={complianceBriefState} successUi={
    <div className="">
      <div>
        <HeadingRow heading="Your Trainings" />
        <div className='flex'>
          <TabBar tabs={trainingTabs} />
          <div>
            <StateBuilder state={complianceBriefState} successUi={<div>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card title="Average Attempts" value={avg_attempts} />
                  <Card title="Average Score" value={avg_score} />
                  <Card title="User" value={user} />
                  <Card title="Total Trainings" value={total_trainings} />
                  <Card title="Completed Trainings" value={completed_trainings} withProgress={(completed_trainings / total_trainings) * 100} />
                </div>
              </div>
            </div>} />
          </div>
        </div>


      </div>
    </div>
  } />} />);
  return (
    <div className="container">
      <div>
        <StateBuilder state={complianceBriefState} successUi={<div>
          <h1>User Data</h1>
          <ul>
            <li><strong>Average Attempts:</strong> {avg_attempts}</li>
            <li><strong>Average Score:</strong> {avg_score}</li>
            <li><strong>User:</strong> {user}</li>
            <li><strong>Total Trainings:</strong> {total_trainings}</li>
            <li><strong>Completed Trainings:</strong> {completed_trainings}</li>
          </ul>
        </div>} />
      </div>
      <Tabs>
        <TabList>
          <Tab>All Trainings</Tab>
          <Tab>Pending</Tab>
          <Tab>Completed</Tab>
        </TabList>

        <TabPanel>
          <StateBuilder state={state} successUi={<SuccessUi trainings={trainings.allTraining} />} />
        </TabPanel>
        <TabPanel>
          <StateBuilder state={state} successUi={<SuccessUi trainings={trainings.pendingTraining} />} />
        </TabPanel>
        <TabPanel>
          <StateBuilder state={state} successUi={<SuccessUi trainings={trainings.completedTraining} />} />
        </TabPanel>
      </Tabs>
    </div>
  );


  async function getTraining() {
    setState(State.loading);
    try {
      const pendingTraining = await TrainingService.getTrainings({ trainingStatus: 'pending' });
      const completedTraining = await TrainingService.getTrainings({ trainingStatus: 'completed' });
      const allTraining = await TrainingService.getTrainings();
      setTrainings({
        pendingTraining: pendingTraining,
        completedTraining: completedTraining,
        allTraining: allTraining
      })
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
      const complianceBrief = await TrainingService.getTrainingComplianceBrief();
      console.log("complianceBrief")
      console.log(complianceBrief)
      setComplianceBrief(complianceBrief)
      setComplianceBriefState(State.success);
      console.log(complianceBrief);
    } catch (error) {
      console.log(error);
      setComplianceBriefState(State.failed);
    }
  }


  function SuccessUi({ trainings }) {
    if (trainings.length == 0) {
      return <div>No Trainings</div>
    }
    return <div>
      <ul>
        {trainings.map((training, index) => (
          <TrainingComplianceCard training={training} key={index} />
        ))}
      </ul>

    </div>
  }

  const UserData = ({ avgAttempts, avgScore, user, totalTrainings, completedTrainings }) => {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold text-gray-800">User Data</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Average Attempts" value={avgAttempts} />
          <Card title="Average Score" value={avgScore} />
          <Card title="User" value={user} />
          <Card title="Total Trainings" value={totalTrainings} />
          <Card title="Completed Trainings" value={completedTrainings} withProgress={(completedTrainings / totalTrainings) * 100} />
        </div>
      </div>
    );
  };


}
export default EmpHomePage;