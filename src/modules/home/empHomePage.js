import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { State, StateBuilder } from '../../components/StateBuilder';
import TrainingComplianceCard from '../../components/TrainingCompliaceCard';
import TrainingService from '../../services/TrainingService';

const EmpHomePage = () => {
  const [state, setState] = useState(State.initial);
  const [complianceBriefState, setComplianceBriefState] = useState(State.initial);
  const [trainings, setTrainings] = useState({});
  const [{ avg_attempts, avg_score, user, total_trainings, completed_trainings }, setComplianceBrief] = useState({});
  /*   { avg_attempts, avg_score, user, total_trainings, completed_trainings } */
  useEffect(() => { getTraining() }, [])
  useEffect(() => { getTrainingComplianceBrief() }, [])


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
}
export default EmpHomePage;