type Holiday = {
  date: string;
  name: string;
};

export const holidaysMapper = (holidays: Array<Holiday>) => {
  return holidays.map((day: Holiday) => {
    const newDate = new Date(day.date).toLocaleDateString()
    return {
      ...day,
      date: newDate,
    };
  });
}