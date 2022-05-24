const formatTime = (num) => {
  num = "" + num;
  if (num.length === 1) {
    num = "0" + num;
  }
  return num;
};

export default formatTime;
