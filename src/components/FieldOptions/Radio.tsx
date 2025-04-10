import React, { useState } from 'react';
import { Radio, Stack } from '@contentful/f36-components';
import { FieldsAndFunctions } from 'components/types';

const Boolean = ({ item, options = ["Yes", "No"], updateItem, fieldIndex, fieldName, index }: FieldsAndFunctions) => {
  const [value, setValue] = useState(item.fields?.[fieldIndex]?.value || options[0]);

  return (
    <Stack flexDirection="row">
      {options.map((option, idx) => (
        <Radio key={idx} value={option} isChecked={value === option} onChange={(e) => {setValue(option); updateItem(index, fieldIndex, e.target.value, 'radio', fieldName)}}>
          {option}
        </Radio>
      ))}
    </Stack>
  );
};

export default Boolean;
