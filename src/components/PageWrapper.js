import React from "react";
import { StateBuilder } from "./StateBuilder";
import HeadingRow from "./heading-row/HeadingRow";
import { NavigationWrapper } from "./sidebar/Navigation";
const PageWrapper = ({ PageHeading, state, successUi, sidebar }) => {
  return (
    <NavigationWrapper
      Child={
        <StateBuilder
          state={state}
          successUi={
            <div className="">
              <div>
                <HeadingRow heading={PageHeading} />
                <div className="flex">
                  <div className="flex-1 flex">{successUi}</div>

                  <div className="w-80 ml-8">{sidebar}</div>
                </div>
              </div>
            </div>
          }
        />
      }
    />
  );
};

export default PageWrapper;
