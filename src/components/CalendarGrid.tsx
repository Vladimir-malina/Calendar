import { FC } from "react";
import { styled } from "styled-components";
import { getDaysInCalendar, holidaysMapper } from "../utilities";
import DayCell from "./DayCell";
import { useFetchHolidays } from "../hooks";

const CalendarGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
`;
interface Props {
  currentDate: Date;
}

export const CalendarGrid: FC<Props> = (props) => {
  const { currentDate } = props;
  const currentYear = currentDate.getFullYear();
  const holidays = useFetchHolidays(currentYear);
  const mappedHolidays = holidaysMapper(holidays)
  const daysInCalendarGrid = getDaysInCalendar(currentDate);
  const today = new Date().toLocaleDateString()

  return (
    <CalendarGridContainer>
      {daysInCalendarGrid.map(({ day, id, isDisabled }) => {
        const holiday = mappedHolidays.find(day => day.date === id)
        const dayOfMonth = day.getDate();
        const isToday = today === id
        
        return (
          <DayCell
            key={id}
            dayOfMonth={dayOfMonth}
            isDisabled={isDisabled}
            dayId={id}
            holiday={holiday?.name}
            isToday={isToday}
          />
        );
      })}
    </CalendarGridContainer>
  );
};
