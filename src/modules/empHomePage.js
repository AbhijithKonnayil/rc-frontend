import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { State, StateBuilder } from '../components/StateBuilder';
import TrainingComplianceCard from '../components/TrainingCompliaceCard';
import TrainingService from '../services/TrainingService';

const EmpHomePage = () => {
  const [state, setState] = useState(State.initial);
  const [trainings, setTrainings] = useState({});

  useEffect(() => { getTraining() }, [])


  return (
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