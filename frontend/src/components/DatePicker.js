import React from "react";

export default function DatePicker(props) {
  //   const [date, setDate] = useState(null);

  const onChange = (e) => {
    let targetDate = e.currentTarget.value;
    props.onDateChange(targetDate);
  };

  return (
    <>
      <input
        type="date"
        className="textField"
        onChange={onChange}
        defaultValue={props.initialDate}
        max={props.maxDate}
      ></input>
    </>
  );
}
