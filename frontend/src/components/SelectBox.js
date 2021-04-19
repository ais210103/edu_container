import React, { useEffect, useRef } from "react";
import "../css/selectbox.css";
export default function SelectBox(props) {
  const selectedValue = useRef(null);

  const onChange = (e) => {
    console.log(e.currentTarget.selectedIndex);
    select({
      index: e.currentTarget.selectedIndex,
      value: e.currentTarget.value,
      data: props.data ?? "",
    });
  };

  const select = (e) => {
    if (props.extractSelected) {
      props.extractSelected(e);
    }
  };

  useEffect(() => {
    if (props.clearOnDisabled === true && props.disabled === true) {
      select({ index: 0, value: "" });
      selectedValue.current.selectedIndex = 0;
    }
  }, [props.clearOnDisabled, props.disabled]);

  useEffect(() => {
    if (props.selected?.index >= 0) {
      console.log("selectedIndex", selectedValue.current.selectedIndex);
      selectedValue.current.selectedIndex = props.selected.index;
    } else if (!isNaN(props.selected)) {
      selectedValue.current.selectedIndex = props.selected;
    }
  }, [props.selected]);

  return (
    <div className="Select-Box-Div">
      <select
        className="Select-Box"
        onChange={onChange}
        disabled={props.disabled}
        ref={selectedValue}
      >
        {props.options.map((item, i) => {
          return (
            <option key={i} index={i}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
