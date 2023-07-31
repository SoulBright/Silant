import React from "react";

import classes from "../Select/MySelect.module.css"

export default function MySelect({ label, name, value, options, field, onChange }) {
    return (
      <label>
      {label}:
      <select className={classes.mySelect} name={name} value={value} onChange={onChange}>
        <option value="">Все</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>{option[field]}</option>
        ))}
      </select>
    </label>
    );
  }
