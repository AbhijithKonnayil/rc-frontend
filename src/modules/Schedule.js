import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { State } from '../components/StateBuilder';

const Schedule = () => {
    const [state, setState] = useState(State.success);
    return (<PageWrapper PageHeading="Schedule" state={state} successUi={<div className="">
        <div>
            <div className='flex'>

            </div>


        </div>
    </div>} />);
}

export default Schedule