import { Select } from "@contentful/f36-components";
import { FieldsAndFunctions } from "components/types";
import { useState } from "react";
import React from "react";

const Dropdown = ({ item, options = ["Yes", "No"], updateItem, fieldIndex, fieldName, index }: FieldsAndFunctions) => {
    const [value, setValue] = useState(item.fields?.[fieldIndex]?.value || options[0]);
    
    return (
        <>
        <Select
          id="optionSelect-controlled"
          name="optionSelect-controlled"
          value={value}
          onChange={(e) => {setValue(e.target.value); updateItem(index, fieldIndex, e.target.value, 'dropdown', fieldName)}}
        >
          {options.map((option, idx) => (
            <Select.Option key={idx}>{option}</Select.Option>
        ))}
        </Select>
     </>
    )
};

export default Dropdown;
