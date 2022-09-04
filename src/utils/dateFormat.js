export function cardDateFormat(date) {
  const newDate = date.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formatedDate = `${newDate[2]} ${months[newDate[1] - 1]}`;
  return formatedDate;
}

export function getFormatedNowDate() {
  const date_not_formatted = new Date();
  let formatted_date = date_not_formatted.getFullYear() + "-";
  if (date_not_formatted.getMonth() < 9) {
    formatted_date += "0";
  }
  formatted_date += date_not_formatted.getMonth() + 1;
  formatted_date += "-";
  if (date_not_formatted.getDate() < 10) {
    formatted_date += "0";
  }
  formatted_date += date_not_formatted.getDate();

  let formatted_time = date_not_formatted.getHours() + ":";
  formatted_time += date_not_formatted.getMinutes();
  return { date: formatted_date, time: formatted_time };
}
