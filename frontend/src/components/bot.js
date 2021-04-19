import React, { useEffect } from "react";
import "../css/bot.css";
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";

import { deviceActions } from "../store/reducers/device";
import { checkGasBreaker } from "../functions/util";
import request from "../functions/request";
export default function Bot(props) {
  const { device, op, abnormal, QAList } = useSelector((state) => state.device);
  const dispatch = useDispatch();

  const onChange = (e) => {
    console.log(e);
    const obj = { DQ: e.data.code };
    const alCode = e.data.al_list.find((v, i, a) => v.answer === e.value);
    obj.answer = alCode.al_code;
    console.log("obj", obj);
    dispatch(deviceActions.setAnswer(obj));
  };

  useEffect(async () => {
    if (
      device.value &&
      checkGasBreaker(device.value) &&
      op.value &&
      abnormal.value?.code
    ) {
      const qalist = await request(
        `${process.env.REACT_APP_PUBLIC_URL}/json/sampleQuestion.json`
      );
      console.log("qalist", qalist);
      qalist.forEach((element) => {
        if (element.input_type === 1) {
          element.al_list = [
            { answer: "選択して下さい", al_code: "" },
            ...element.al_list,
          ];
        }
      });
      dispatch(deviceActions.setQAList(qalist));
    }
  }, [device.value, op.value, abnormal.value]);
  return (
    <div className="bot-container">
      <div className="label-div">
        <p>asdfasdf</p>
      </div>
      <Table
        questionList={QAList}
        dataOrder={["devce_type", "al_list", "reference"]}
        headers={["診断Ｑ", "診断Ａ", "参考"]}
        onChange={onChange}
      ></Table>
    </div>
  );
}
