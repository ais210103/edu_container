import React, { useEffect } from "react";
import "../css/mid.css";
import { useSelector, useDispatch } from "react-redux";
import SelectBox from "./SelectBox";
import TextField from "./TextField";
import request from "../functions/request";
import { checkGasBreaker, evalVoltageClass } from "../functions/util";
import { deviceActions } from "../store/reducers/device";
export default function Mid(props) {
  const {
    device,
    deviceList,
    op,
    opList,
    voltageClass,
    voltageClassList,
    type,
    typeList,
    stateList,
    abnormalList,
    gasPressure,
    gasLockPressure,
    volt,
  } = useSelector((state) => state.device);
  const dispatch = useDispatch();

  useEffect(async () => {
    const device = await request(
      `${process.env.REACT_APP_PUBLIC_URL}/json/katashiki.json`
    );
    const op = await request(
      `${process.env.REACT_APP_PUBLIC_URL}/json/sousakikou.json`
    );
    const voltClass = await request(
      `${process.env.REACT_APP_PUBLIC_URL}/json/voltageClass.json`
    );
    const states = await request(
      `${process.env.REACT_APP_PUBLIC_URL}/json/joutai.json`
    );

    const obj = {
      voltageClassList: ["選択してください", ...(voltClass ?? [])],
      opList: ["選択してください", ...(op ?? [])],
      stateList: ["選択してください", ...(states ?? [])],
      deviceList: [
        "選択してください",
        ...(device
          ?.map((item) => item.kikishurui)
          .filter((v, i, a) => a.indexOf(v) === i) ?? []),
      ],
    };
    dispatch(deviceActions.setInitialLists(obj));
  }, []);

  const selectDevice = (e) => {
    console.log(deviceList[e.index]);
    //***************************************************** */
    const obj =
      deviceList[e.index] === "選択してください" ? "" : deviceList[e.index];

    //************************************************* */
    dispatch(
      deviceActions.setDevice({
        value: obj,
        index: e.index,
      })
    );
  };
  const selectVoltageClass = (e) => {
    console.log(voltageClassList[e.index]);
    //***************************************************** */
    const obj =
      voltageClassList[e.index] === "選択してください"
        ? ""
        : voltageClassList[e.index];

    //************************************************* */
    dispatch(
      deviceActions.setVoltageClass({
        value: obj,
        index: e.index,
      })
    );
  };
  const selectType = (e) => {
    console.log(typeList[e.index]);
    //***************************************************** */
    if (e.index === 0) {
      dispatch(deviceActions.setType({ katashiki: "" }));
    }
    //************************************************* */
    const obj = typeList[e.index];
    dispatch(
      deviceActions.setType({
        value: obj,
        index: e.index,
      })
    );
  };

  const selectState = (e) => {
    console.log(stateList[e.index]);
    const obj =
      stateList[e.index] === "選択してください" ? "" : stateList[e.index];
    dispatch(
      deviceActions.setState({
        value: obj,
        index: e.index,
      })
    );
  };
  const selectAb = (e) => {
    console.log(abnormalList[e.index]);
    if (e.index === 0) {
      dispatch(deviceActions.setAbnormal({ value: { name: "" } }));
      return;
    }
    const obj = abnormalList[e.index];

    dispatch(
      deviceActions.setAbnormal({
        value: obj,
        index: e.index,
      })
    );
  };

  const selectOp = (e) => {
    console.log(opList[e.index]);
    const obj = opList[e.index] === "選択してください" ? "" : opList[e.index];
    dispatch(
      deviceActions.setOp({
        value: obj,
        index: e.index,
      })
    );
  };

  const inputGasPressure = (e) => {
    dispatch(deviceActions.setGasPressure(e));
  };

  //voltageClass
  useEffect(() => {
    if (evalVoltageClass(volt) === -1) {
      alert("範囲外");
      selectVoltageClass({ index: 0, value: "" });
    } else if (evalVoltageClass(volt) === -2) {
      alert("invalid");
      selectVoltageClass({ index: 0, value: "" });
    } else if (evalVoltageClass(volt) >= 0) {
      selectVoltageClass({
        index: evalVoltageClass(volt),
        value:
          voltageClassList[evalVoltageClass(volt)] === "選択してください"
            ? ""
            : voltageClassList[evalVoltageClass(volt)],
      });
    }
  }, [volt]);

  //katashiki
  useEffect(async () => {
    if (device.value && op.value && checkGasBreaker(device?.value ?? "")) {
      const kata = await request(
        `${process.env.REACT_APP_PUBLIC_URL}/json/katashiki.json`
      );
      const katalist = kata.filter(
        (v) => v.kikishurui === device.value && v.sousakikou === op.value
      );
      const abnormals = await request(
        `${process.env.REACT_APP_PUBLIC_URL}/json/ijoujoutai.json`
      );
      console.log(abnormals);
      dispatch(
        deviceActions.setAbnormalList([
          { name: "選択してください" },
          ...abnormals,
        ])
      );
      dispatch(
        deviceActions.setTypeList([
          { katashiki: "選択してください" },
          ...katalist,
        ])
      );
    } else if (device.value && !checkGasBreaker(device?.value ?? "")) {
      const kata = await request(
        `${process.env.REACT_APP_PUBLIC_URL}/json/katashiki.json`
      );
      const abnormals = await request(
        `${process.env.REACT_APP_PUBLIC_URL}/json/ijoujoutai.json`
      );
      const katalist = kata.filter((v) => v.kikishurui === device.value);
      dispatch(
        deviceActions.setTypeList([
          { katashiki: "選択してください" },
          ...katalist,
        ])
      );
      dispatch(
        deviceActions.setAbnormalList([
          { name: "選択してください" },
          ...abnormals,
        ])
      );
    } else {
      dispatch(deviceActions.setTypeList([]));
      dispatch(deviceActions.setAbnormalList([]));
    }
  }, [device.value, op.value]);

  //gasPressure
  useEffect(() => {
    if (type.value && type.index) {
      const obj = typeList[type.index];
      console.log("obj", obj);
      dispatch(deviceActions.setGasLockPressure(obj.gas));
    } else {
      dispatch(deviceActions.setGasLockPressure(""));
    }
  }, [type.value]);

  //gaspressure comparison gasLockPressure
  useEffect(() => {}, [gasPressure, gasLockPressure]);

  return (
    <div className="mid-container">
      <div className="label-div">
        <p>asdfasdf</p>
      </div>
      <div className="container-content">
        <div className="grid-item">
          <p className="grid-item-label">機器種類</p>
          <SelectBox
            options={deviceList.length ? deviceList : ["選択してください"]}
            extractSelected={selectDevice}
            // selected={device}
          ></SelectBox>
        </div>
        <div className="grid-item">
          <p className="grid-item-label">操作機構</p>
          <SelectBox
            options={opList.length ? opList : ["選択してください"]}
            disabled={!checkGasBreaker(device.value ?? "")}
            extractSelected={selectOp}
            clearOnDisabled={true}
            // selected={op}
          ></SelectBox>
        </div>
        <div className="grid-item">
          <p className="grid-item-label">電圧クラス</p>
          <SelectBox
            options={
              voltageClassList.length ? voltageClassList : ["選択してください"]
            }
            extractSelected={selectVoltageClass}
            selected={voltageClass}
            disabled={evalVoltageClass(volt) > 0 ? true : false}
          ></SelectBox>
        </div>
        <div className="grid-item">
          <p className="grid-item-label">形式</p>
          <SelectBox
            options={
              typeList.length
                ? typeList.map((item) => item.katashiki)
                : ["選択してください"]
            }
            extractSelected={selectType}
            // selected={type}
          ></SelectBox>
        </div>
        <div className="grid-item">
          <p className="grid-item-label">ガス圧力ロック値</p>
          <p style={{ textAlign: "center", color: "white" }}>
            {gasLockPressure !== null && gasLockPressure !== ""
              ? `${gasLockPressure} Mpa`
              : ""}
          </p>
        </div>

        <div className="grid-item">
          <p className="grid-item-label">状態</p>
          <SelectBox
            options={stateList.length ? stateList : ["選択してください"]}
            extractSelected={selectState}
            // selected={state}
          ></SelectBox>
        </div>
        <div className="grid-item" style={{ gridColumn: "2 / 4" }}>
          <p className="grid-item-label">異常状態</p>
          <SelectBox
            options={
              abnormalList.length
                ? abnormalList.map((item) => item.name)
                : ["選択してください"]
            }
            extractSelected={selectAb}
          ></SelectBox>
        </div>
        <div className="grid-item"></div>
        <div className="grid-item">
          <p className="grid-item-label">ガス圧力値</p>
          <TextField
            numbersOnly={true}
            disabled={!checkGasBreaker(device.value ?? "")}
            clearOnDisabled={true}
            onBlur={inputGasPressure}
          ></TextField>
        </div>
      </div>
    </div>
  );
}
