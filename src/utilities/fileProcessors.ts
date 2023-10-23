import html2canvas from "html2canvas";
import { tasksStore } from "../stores";

export const jsonFileDownload = (dataToDownload: AnyObject) => {
  try {
    const fileName = "calendar.json";
    const data = new Blob([JSON.stringify(dataToDownload)], { type: "text/json" });
    const jsonURL = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
  } catch (er) {
    console.error('Error download file:',er)
  }
}

export const jsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  try {
    const fileReader = new FileReader();
    e.target.files &&
      fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const data = e.target && JSON.parse(e.target.result as string);
      tasksStore.setDaysWithTasks(data)
    };
  } catch (er) {
    console.error('Error upload file:',er)
  }
}

export const imageDownload = () => {
  try {
    const calendar = document.getElementById('calendar');
    if (!calendar) return
    html2canvas(calendar).then(function (canvas) {
      const link = document.createElement('a');
      link.download = 'calendar.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  } catch (er) {
    console.error('Error download image:',er)
  }
}