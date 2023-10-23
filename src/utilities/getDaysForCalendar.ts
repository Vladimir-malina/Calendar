export const getDaysInCalendar = (currentDate: Date): Array<{ day: Date, id: string, isDisabled: boolean }> => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const isFirstMonthOfYear = month === 0;
  const isLastMonthOfYear = month === 11;

  const firstDayOfCurrentMonth = new Date(year, month, 1);
  const lastDayOfCurrentMonth = new Date(year, month + 1, 0);
  const firsttDayOfNextMonth = new Date(year, month + 1, 1);

  const firstDayOfCalendar = new Date(
    isFirstMonthOfYear ? year - 1 : year,
    isFirstMonthOfYear ? 12 : month,
    1 - firstDayOfCurrentMonth.getDay()
  );
  const lastDayOfCalendar = new Date(
    isLastMonthOfYear ? year + 1 : year,
    isLastMonthOfYear ? 0 : month + 1,
    6 - lastDayOfCurrentMonth.getDay()
  );

  const getDaysInCurrentMonth = () => {
    const days = [];
    for (
      let day = firstDayOfCurrentMonth;
      day <= lastDayOfCurrentMonth;
      day.setDate(day.getDate() + 1)
    ) {
      days.push({
        day: new Date(day),
        id: day.toLocaleDateString(),
        isDisabled: false,
      });
    }
    return days;
  };

  const getDaysInPreviousMonth = () => {
    const days = [];
    for (
      let day = firstDayOfCalendar;
      day < firstDayOfCurrentMonth;
      day.setDate(day.getDate() + 1)
    ) {
      days.push({
        day: new Date(day),
        id: day.toLocaleDateString(),
        isDisabled: true,
      });
    }
    return days;
  };

  const getDaysInNextMonth = () => {
    const days = [];
    for (
      let day = firsttDayOfNextMonth;
      day <= lastDayOfCalendar;
      day.setDate(day.getDate() + 1)
    ) {
      days.push({
        day: new Date(day),
        id: day.toLocaleDateString(),
        isDisabled: true,
      });
    }
    return days;
  };

  return [
    ...getDaysInPreviousMonth(),
    ...getDaysInCurrentMonth(),
    ...getDaysInNextMonth(),
  ];
};