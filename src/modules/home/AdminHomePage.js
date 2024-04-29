import { useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import Navigation, { NavigationWrapper } from '../../components/Navigation';
import { State, StateBuilder } from '../../components/StateBuilder';
import TrainingService from '../../services/TrainingService';

const AdminHomePage = () => {
  const [complianceBriefState, setComplianceBriefState] = useState(State.initial);
  const [complianceBriefs, setComplianceBriefs] = useState({});

  useEffect(() => { getTrainingComplianceBriefs() }, [])

  return (<NavigationWrapper Child={<StateBuilder state={complianceBriefState} successUi={<SuccessUi compliances={complianceBriefs} />} />} />);
  return (
    <div className="container">
      <div className="flex">
        {/* Navigation Side Pane */}
        <div className="w-1/4 bg-gray-200 h-screen">
          <Navigation />
        </div>
        <div className="w-3/4 px-4">
          <StateBuilder state={complianceBriefState} successUi={<SuccessUi compliances={complianceBriefs} />} />
        </div>
      </div>
    </div>
  );




  async function getTrainingComplianceBriefs() {
    setComplianceBriefState(State.loading);
    try {
      const complianceBrief = await TrainingService.getTrainingComplianceBriefs();
      setComplianceBriefs(complianceBrief)
      setComplianceBriefState(State.success);
      console.log(complianceBrief);
    } catch (error) {
      console.log(error);
      setComplianceBriefState(State.failed);
    }
  }


  function SuccessUi({ compliances: compliances }) {
    if (compliances.length == 0) {
      return <div>No Compliance</div>
    }
    return <div>
      <ol>
        {compliances.map((c, index) => (

          <li key={index}>
            <ul>
              <li><strong>Average Attempts:</strong> {c.avg_attempts}</li>
              <li><strong>Average Score:</strong> {c.avg_score}</li>
              <li><strong>User:</strong> {c.username}</li>
              <li><strong>Total Trainings:</strong> {c.total_trainings}</li>
              <li><strong>Completed Trainings:</strong> {c.completed_trainings}</li>
            </ul>
            <br />
          </li>

        ))}
      </ol>
    </div>
  }
}
export default AdminHomePage;