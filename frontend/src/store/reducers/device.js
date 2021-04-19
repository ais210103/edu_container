import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "device",
  initialState: {
    customer: "",
    customerList: [],
    location: "",
    volt: "",
    line: "",
    testNo: "",
    manager: "",
    contact: "",
    eventDate: "",
    device: "",
    deviceList: [],
    op: "",
    opList: [],
    voltageClass: "",
    voltageClassList: [],
    type: "",
    typeList: [],
    state: "",
    stateList: [],
    abnormal: "",
    abnormalList: [],
    gasPressure: null,
    QAList: [],
    gasLockPressure: "",
  },

  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setCustomerList: (state, action) => {
      state.customerList = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setVolt: (state, action) => {
      state.volt = action.payload;
    },
    setLine: (state, action) => {
      state.line = action.payload;
    },
    setTestNo: (state, action) => {
      state.testNo = action.payload;
    },
    setManager: (state, action) => {
      state.manager = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setEventDate: (state, action) => {
      state.eventDate = action.payload;
    },
    setDevice: (state, action) => {
      state.device = action.payload;
    },
    setDeviceList: (state, action) => {
      state.deviceList = action.payload;
    },
    setOp: (state, action) => {
      state.op = action.payload;
    },
    setOpList: (state, action) => {
      state.opList = action.payload;
    },
    setVoltageClassList: (state, action) => {
      state.voltageClassList = action.payload;
    },
    setVoltageClass: (state, action) => {
      state.voltageClass = action.payload;
    },
    setTypeList: (state, action) => {
      state.typeList = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setStateList: (state, action) => {
      state.stateList = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setAbnormal: (state, action) => {
      state.abnormal = action.payload;
    },
    setAbnormalList: (state, action) => {
      state.abnormalList = action.payload;
    },
    setGasPressure: (state, action) => {
      state.gasPressure = action.payload;
    },
    setQAList: (state, action) => {
      state.QAList = action.payload;
    },
    setInitialLists: (state, action) => {
      state.voltageClassList = action.payload.voltageClassList;
      state.opList = action.payload.opList;
      state.deviceList = action.payload.deviceList;
      state.stateList = action.payload.stateList;
      state.typeList = ["選択してください"];
      state.abnormalList = ["選択してください"];
    },
    setAnswer: (state, action) => {
      const copy = state.QAList;
      const DQ = action.payload.DQ;
      const index = copy.findIndex((item) => item.code === DQ);
      state.QAList[index].answer = action.payload.answer;
    },

    setGasLockPressure: (state, action) => {
      state.gasLockPressure = action.payload;
    },
  },
});

export const {
  setAbnormal,
  setAbnormalList,
  setContact,
  setCustomer,
  setCustomerList,
  setDevice,
  setDeviceList,
  setEventDate,
  setGasPressure,
  setLine,
  setLocation,
  setManager,
  setOp,
  setOpList,
  setQAList,
  setState,
  setStateList,
  setTestNo,
  setType,
  setTypeList,
  setVolt,
  setVoltageClass,
  setVoltageClassList,
  setTestArray,
  setTestArrayTest,
} = slice.actions;

export const deviceActions = { ...slice.actions };
export default slice.reducer;
