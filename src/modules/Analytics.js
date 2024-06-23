import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { State } from '../components/StateBuilder';

const Analytics = () => {
    const [state, setState] = useState(State.success);
    return (<PageWrapper PageHeading="Analytics" state={state} successUi={<div className="">
        <div>
            <div className='flex'>

            </div>


        </div>
    </div>} />);
}

export default Analytics