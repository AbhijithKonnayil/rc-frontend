import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { State } from '../components/StateBuilder';

const Certifications = () => {
    const [state, setState] = useState(State.success);
    return (<PageWrapper PageHeading="Certifications" state={state} successUi={<div className="">
        <div>
            <div className='flex'>

            </div>


        </div>
    </div>} />);
}

export default Certifications