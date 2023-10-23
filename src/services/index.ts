import { COUNTRY_CODE, PUBLIC_HOLIDAYS_API } from "../constants";

export const fetchHolidaysService = (year: number) => {
  const url = `${PUBLIC_HOLIDAYS_API}${year}/${COUNTRY_CODE}`

  return fetch(url)
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      throw res
    })
    .then((data) => {
      return data})
    .catch((error) => console.error("Error fetching holidays:",error));
}