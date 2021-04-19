import React, { useState, useEffect } from "react";
import "../css/textfield.css";
export default function TextField(props) {
  //    let stripped = e.target.value;
  // if (props.numbersOnly !== undefined && props.numbersOnly === true) {
  //   stripped = e.target.value.replace(/[^0-9]+/g, "");
  // }
  // console.log("stripped", stripped);
  // setInputValue(stripped);
  const [inputVal, setInputVal] = useState("");
  const onChange = (e) => {
    let stripped = e.target.value;
    if (props.numbersOnly) {
      stripped = e.target.value.replace(/[^0-9|.]+/g, "");
    }
    if (props.onChange) {
      props.onChange(stripped);
    }
    setInputVal(stripped);
  };

  const onBlur = (e) => {
    if (props.onBlur) {
      props.onBlur(inputVal);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };
  useEffect(() => {
    if (props.clearOnDisabled && props.disabled) {
      onChange({ target: { value: "" } });
    }
  }, [props.clearOnDisabled, props.disabled]);
  return (
    <>
      <input
        type="text"
        className="textField"
        onChange={onChange}
        onBlur={onBlur}
        value={inputVal}
        disabled={props.disabled}
        onKeyDown={handleKeyDown}
      ></input>
    </>
  );
}
