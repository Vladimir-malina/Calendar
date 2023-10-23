import { styled } from "styled-components";
import { CalendarGrid } from "./CalendarGrid";
import { filterStore, tasksStore } from "../stores";
import { ColorInput } from "./ColorInput";
import { Observer } from "mobx-react";
import FileProcess from "./FileProcess";
import { imageDownload } from "../utilities";
import { WEEK_DAYS } from "../constants";
import { useCalendar } from "../hooks";
import { handleFilterTasksByLabel, handleFilterTasksByText } from "../actions";
import { useEffect } from "react";
import { observeFilters } from "../reactions";

const Container = styled.div`
  font-family: sans-serif;
  .top {
    display: flex;
    justify-content: space-between;
  }
  .file-process {
    margin-bottom: 15px;
  }
`;
const MonthName = styled.h2`
  text-align: center;
`;

const Side = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 10px;
  p {
    margin: 0;
  }
`;

const FilterByText = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterByColor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ScrollButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const DaysOfWeek = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 7px;
`;

const daysOfWeek = WEEK_DAYS.map((day) => <div key={day}>{day}</div>);

export const Calendar = () => {
  const { currentDate, goToPreviousMonth, goToNextMonth } = useCalendar();

  useEffect(() => {
    const disposer = observeFilters()
    return disposer
  }, [])

  return (
    <Observer>
      {() => {
        const dataToDownload = tasksStore.daysWithTasks;
        return (
          <Container>
            <div className="top">
              <Side>
                <ScrollButtons>
                  <button onClick={goToPreviousMonth}>{"<"}</button>
                  <button onClick={goToNextMonth}>{">"}</button>
                </ScrollButtons>
                <FilterByText>
                  <p>Filter By Text:</p>
                  <input type="text" onChange={handleFilterTasksByText} />
                </FilterByText>

                <FilterByColor>
                  <p>Filter By Color:</p>
                  <ColorInput
                    onChange={handleFilterTasksByLabel}
                    value={filterStore.filteredColor}
                    onDelete={() => filterStore.setFilteredColor("")}
                    buttonLabel="Add color label"
                  />
                </FilterByColor>
              </Side>

              <Side>
                <FileProcess
                  dataToDownload={dataToDownload}
                  className="file-process"
                />
                <button onClick={imageDownload}>Take Screenshot</button>
              </Side>
            </div>
            <div id="calendar">
              <MonthName>
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </MonthName>

              <DaysOfWeek>{daysOfWeek}</DaysOfWeek>

              <CalendarGrid currentDate={currentDate} />
            </div>
          </Container>
        );
      }}
    </Observer>
  );
};
