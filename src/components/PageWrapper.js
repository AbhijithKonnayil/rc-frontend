import React from 'react';
import { StateBuilder } from './StateBuilder';
import HeadingRow from './heading-row/HeadingRow';
import { NavigationWrapper } from './sidebar/Navigation';
const PageWrapper = ({ PageHeading, state, successUi }) => {

    return (<NavigationWrapper Child={<StateBuilder state={state} successUi={
        <div className="">
            <div>
                <HeadingRow heading={PageHeading} />
                <div className='flex'>
                    {successUi}
                </div>
            </div>
        </div>
    } />} />);
}

export default PageWrapper