import React from "react";
import "../css/table.css";
import SelectBox from "../components/SelectBox";
export default function Table(props) {
  const onChange = (e) => {
    props.onChange(e);
  };

  return (
    <div className="Table-container">
      <table>
        <thead>
          <tr className="header">
            {props.headers.map((item) => {
              return <th>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.questionList.map((item, index) => {
            return (
              <tr key={index}>
                {props.dataOrder.map((objkey, i) => {
                  if (item.input_type === 1 && objkey === "al_list") {
                    return (
                      <td>
                        <SelectBox
                          options={item[objkey].map((item) => item.answer)}
                          extractSelected={onChange}
                          data={item}
                        ></SelectBox>
                      </td>
                    );
                  } else if (item.input_type === 0 && objkey === "al_list") {
                    return <td></td>;
                  } else {
                    return <td>{item[objkey]}</td>;
                  }
                })}
              </tr>
            );
          }) ?? []}
        </tbody>
        <tr></tr>
      </table>
    </div>
  );
}
