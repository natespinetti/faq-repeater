import { TextInput } from '@contentful/f36-components';
import { FieldsAndFunctions } from 'components/types';
import React, { useState } from 'react';

const NumberInput = ({ item, updateItem, fieldIndex, fieldName, index }: FieldsAndFunctions) => {
    const [value, setValue] = useState<string>(item.fields?.[fieldIndex]?.value || '');
  return (
    <TextInput 
    type="number" 
    value={value}
    onChange={(e) => {
        setValue(e.target.value);
        updateItem(index, fieldIndex, e.target.value, 'number', fieldName);
    }}
    />
  );
};

export default NumberInput;
