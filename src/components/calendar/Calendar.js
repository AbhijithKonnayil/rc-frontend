import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

import "../../components/calendar/calendar.css";
import CurriculumService from "../../services/CurriculumService";
import { State, StateBuilder } from "../StateBuilder";
const CalendarBox = ({ date }) => {
  const [state, setState] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dueDates, setDueDates] = useState();
  useEffect(() => {
    getCurriculumDueDates();
  }, []);
  return (
    <StateBuilder
      state={state}
      successUi={
        <div>
          <Calendar
            value={date}
            className="border-0"
            //formatDay={(locale, date) => (date, 'd 4fg')}
            /*  tileClassName={({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 3 ? 'wednesday' : null} */
            onClickDay={(d) => {
              setSelectedDate(d);
            }}
            tileClassName="border-2 border-rose-500 "
            tileContent={({ activeStartDate, date, view }) => {
              const dateExists = dueDates.some(
                (item) => item.due_date.getDate() === date.getDate()
              );
              console.log(
                dueDates.filter((item) => {
                  const x = item.due_date.getDate() === selectedDate.getDate();
                  return x;
                })
              );
              return view === "month" && dateExists ? (
                <div className="flex justify-center ">
                  <div className="bg-red-800 w-1 h-1 rounded-full"> </div>
                </div>
              ) : (
                <div className=" w-1 h-1"></div>
              );
            }}
          />
          {dueDates &&
            dueDates
              .filter(
                (item) => item.due_date.getDate() === selectedDate.getDate()
              )
              .map((each) => (
                <div className="text-left p-4 my-1 bg-gray-200 rounded-xl">
                  {each.curriculum.name}
                </div>
              ))}
        </div>
      }
    />
  );

  async function getCurriculumDueDates() {
    setState(State.loading);
    try {
      const jsonData = await CurriculumService.getCurriculumDueDates();
      const dueDates = jsonData.map((item) => ({
        ...item,
        due_date: new Date(item.due_date),
      }));
      setDueDates(dueDates);
      setState(State.success);
    } catch (error) {
      console.log(error);
      setState(State.failed);
    }
  }
};

export default CalendarBox;
