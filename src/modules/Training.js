import { default as React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import PageWrapper from '../components/PageWrapper';
import { State, StateBuilder } from '../components/StateBuilder';

import ListBuilder from '../components/ListBuilder';
import TrainingComplianceCard from '../components/TrainingCompliaceCard';
import TabBar from '../components/tabbar/Tabbar';
import TrainingService from '../services/TrainingService';

const Trainings = () => {
    const [state, setState] = useState(State.initial);
    const [pendingTraining, setTrainings] = useState({});
    useEffect(() => { getTraining() }, []);

    const trainingTabs = [
        {
            id: 'due', label: 'Due', content: <StateBuilder state={state} successUi={<ListBuilder dataList={pendingTraining} noItemText={'No Items'} itemCard={(training, index) => (
                <TrainingComplianceCard training={training} key={index} />
            )} />} />
        }
    ];

    return (<PageWrapper PageHeading="Home" state={state} successUi={<div className="">
        <div>
            <div className='flex'>
                <TabBar tabs={trainingTabs} />
            </div>


        </div>
    </div>} />);

    async function getTraining() {
        setState(State.loading);
        try {
            const pendingTraining = await TrainingService.getTrainings({ trainingStatus: 'pending' });
            setTrainings(pendingTraining)
            setState(State.success);
            console.log(state);
        } catch (error) {
            console.log(error);
            setState(State.failed);
        }
    }

}

export default Trainings