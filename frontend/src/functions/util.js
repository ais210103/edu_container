export const formatDate = (dt) => {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
};

export const checkGasBreaker = (str) => {
  //   console.log("check str", str);
  const res = str.indexOf("ガス遮断器");
  if (res === -1) {
    return false;
  } else {
    return true;
  }
};

export const evalVoltageClass = (val) => {
  //-1 === no corresponding option
  //-2 === invalid input
  if (val === "") {
    return 0;
  }
  if (val === "0") {
    return 0;
  }
  if (isNaN(val)) {
    return -2;
  } else if (val >= 1 && val <= 10) {
    return 1;
  } else if (val >= 20 && val <= 40) {
    return 2;
  } else if (val >= 50 && val <= 100) {
    return 3;
  } else if (val >= 101 && val <= 200) {
    return 4;
  } else if (val >= 201) {
    return 5;
  } else return -1;
};

// const checkRequired = () => {};
