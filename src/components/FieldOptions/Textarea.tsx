import React from 'react';
import {
    Textarea,
} from '@contentful/f36-components';
import { FieldsAndFunctions } from 'components/types';

const TextArea = ({item, updateItem, index, fieldIndex, fieldName} : FieldsAndFunctions) => {
    const value = item.fields?.[fieldIndex]?.value || '';
    return (
        <Textarea
            id="key"
            value={value}
            onChange={(e) => updateItem(index, fieldIndex, e.target.value, 'textarea', fieldName)}
        />
    );
};

export default TextArea;
