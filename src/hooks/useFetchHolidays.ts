import { useEffect, useState } from "react"
import { fetchHolidaysService } from "../services"

export const useFetchHolidays = (year: number) => {

  const [holidays, setHolidays] = useState([])

  const fetchHolidays = async () => {
    const holidays = await fetchHolidaysService(year)
    setHolidays(holidays)
  }

  useEffect(() => {
    fetchHolidays()
  }, [year])

  return holidays
}