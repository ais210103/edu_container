import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { actions } from "../store/reducers/example";
export default function Reduxexample(props) {
  const dispatch = useDispatch();
  const { number } = useSelector((state) => state.example);

  const onclick = () => {
    dispatch(actions.updateNumber(5));
  };

  return (
    <div>
      <button onClick={onclick} style={{ width: "200px" }}>
        +
      </button>

      <p style={{ color: "white", fontSize: "4rem" }}>{number}</p>
      <button style={{ width: "200px" }}>-</button>
    </div>
  );
}
