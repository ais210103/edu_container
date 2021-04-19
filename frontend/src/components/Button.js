import React from "react";
import { useSelector } from "react-redux";

export default function Button(props) {
  const {
    device,
    op,
    voltageClass,
    type,
    state,
    abnormal,
    volt,
    customer,
    location,
    line,
    testNo,
    manager,
    contact,
    QAList,
    eventDate,
  } = useSelector((state) => state.device);

  const handleClick = () => {
    const answeredQA = [];
    QAList.forEach((element) => {
      if (element.answer) {
        answeredQA.push({ DQ: element.code, answer: element.answer });
      }
    });
    const obj = {
      customer: customer?.value ?? "",
      location: location ?? "",
      volt: volt ?? "",
      line: line ?? "",
      testNo: testNo ?? "",
      manager: manager ?? "",
      contact: contact ?? "",
      eventDate: eventDate ?? "",
      device: device?.value ?? "",
      op: op?.value ?? "",
      voltageClass: voltageClass?.value ?? "",
      type: type?.value?.katashiki ?? "",
      state: state?.value ?? "",
      abnormal: abnormal?.value?.name ?? "",
      QAList: answeredQA,
    };
    // checkRequired;
    alert(JSON.stringify(obj, null, 2));
    console.log(JSON.stringify(obj, null, 2));
  };
  return <button onClick={handleClick}>aaaaaaa</button>;
}
