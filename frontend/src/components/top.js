import React, { useEffect } from "react";
import "../css/top.css";
import { useSelector, useDispatch } from "react-redux";
import SelectBox from "./SelectBox";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import request from "../functions/request";
import { formatDate } from "../functions/util";
import { deviceActions } from "../store/reducers/device";
export default function Top(props) {
  const { customerList, eventDate } = useSelector((state) => state.device);
  const dispatch = useDispatch();

  useEffect(async () => {
    console.log("asdfasdf");
    const customer = await request(
      `${process.env.REACT_APP_PUBLIC_URL}/json/customer.json`
    );
    console.log("customer", customer);
    dispatch(deviceActions.setCustomerList(["選択してください", ...customer]));
    dispatch(deviceActions.setEventDate(formatDate(new Date())));
  }, []);

  const selectDate = (e) => {
    console.log(e);
    dispatch(deviceActions.setEventDate(e));
  };

  const selectCustomer = (e) => {
    const obj = customerList[e.index];
    dispatch(deviceActions.setCustomer({ value: obj, index: e.index }));
  };

  const inputLocation = (e) => {
    console.log(e);
    dispatch(deviceActions.setLocation(e));
  };
  const inputVolt = (e) => {
    console.log(e);
    dispatch(deviceActions.setVolt(e));
  };
  const inputLine = (e) => {
    console.log(e);
    dispatch(deviceActions.setLine(e));
  };
  const inputTestNo = (e) => {
    console.log(e);
    dispatch(deviceActions.setTestNo(e));
  };
  const inputManager = (e) => {
    console.log(e);
    dispatch(deviceActions.setManager(e));
  };
  const inputContact = (e) => {
    console.log(e);
    dispatch(deviceActions.setContact(e));
  };

  return (
    <div className="top-container">
      <div className="label-div">
        <p>asdfasdf</p>
      </div>
      <div className="container-content">
        <div className="grid-item">
          <p className="grid-item-label">お客様</p>
          <SelectBox
            options={customerList}
            extractSelected={selectCustomer}
          ></SelectBox>
        </div>
        <div className="grid-item">
          <p className="grid-item-label">設置場所</p>
          <TextField onBlur={inputLocation}></TextField>
        </div>
        <div className="grid-item">
          <p className="grid-item-label">定格電圧</p>
          <TextField numbersOnly={true} onBlur={inputVolt}></TextField>
        </div>
        <div className="grid-item">
          <p className="grid-item-label">回線名称</p>
          <TextField onBlur={inputLine}></TextField>
        </div>
        <div className="grid-item"></div>
        <div className="grid-item">
          <p className="grid-item-label">試験番号</p>
          <TextField onBlur={inputTestNo}></TextField>
        </div>
        <div className="grid-item">
          <p className="grid-item-label">ご担当者</p>
          <TextField onBlur={inputManager}></TextField>
        </div>
        <div className="grid-item">
          <p className="grid-item-label">連絡先</p>
          <TextField onBlur={inputContact}></TextField>
        </div>
        <div className="grid-item">
          <p className="grid-item-label">発生日</p>
          <DatePicker
            initialDate={formatDate(new Date())}
            onDateChange={selectDate}
            maxDate={formatDate(new Date())}
            currentDate={eventDate}
          ></DatePicker>
        </div>
      </div>
    </div>
  );
}
