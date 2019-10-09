function convert2Date(intTime) {
  const d = new Date(intTime * 1000);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = ("0" + d.getHours()).slice(-2);
  const min = ("0" + d.getMinutes()).slice(-2);
  const sec = ("0" + d.getSeconds()).slice(-2);

  return { year, month, day, hour, min, sec };
}

function timestamp2ymd(intTime) {
  const date = convert2Date(intTime);
  return (
    date.year +
    "-" +
    date.month +
    "-" +
    date.day +
    " " +
    date.hour +
    ":" +
    date.min
  );
}

function timestamp2md(intTime) {
  const date = convert2Date(intTime);
  return date.month + "-" + date.day + " " + date.hour + ":" + date.min;
}

export default {
  timestamp2ymd,
  timestamp2md
};
