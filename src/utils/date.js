function timestamp2ymd(intTime) {
  var d = new Date(intTime * 1000);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = ("0" + d.getHours()).slice(-2);
  var min = ("0" + d.getMinutes()).slice(-2);
  // var sec = ("0" + d.getSeconds()).slice(-2);

  return year + "-" + month + "-" + day + " " + hour + ":" + min;
}

export default {
  timestamp2ymd
};
