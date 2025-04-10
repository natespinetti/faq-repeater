import React, { useState } from 'react';
import { Checkbox } from '@contentful/f36-components';
import { FieldsAndFunctions } from 'components/types';

const CheckBox = ({ 
  item,
  options = ["Yes", "No"], 
  updateItem, 
  fieldIndex, 
  fieldName, 
  index: itemIndex 
}: FieldsAndFunctions) => {
  const [value, setValue] = useState<string[]>(item.fields?.[fieldIndex]?.value || []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    const updatedValues = value.includes(selectedValue)
      ? value.filter((v) => v !== selectedValue)
      : [...value, selectedValue];
    setValue(updatedValues);
    updateItem(itemIndex, fieldIndex, updatedValues, 'checkbox', fieldName);
  };

  return (
    <Checkbox.Group
      name="checkbox-options"
      value={value}
      onChange={handleChange}
    >
    {options.map((option, idx) => (
        <Checkbox
        key={idx}
        value={option}
        id={`checkbox-${idx}`}
        >
            {option}
        </Checkbox>
    ))}
      
    </Checkbox.Group>
  );
};

export default CheckBox;
