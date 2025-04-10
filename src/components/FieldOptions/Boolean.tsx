import { Switch } from '@contentful/f36-components';
import { FieldsAndFunctions } from 'components/types';
import { useState } from "react";
import React from "react";

const Boolean = ({ item, options = ["Allow"], updateItem, fieldIndex, fieldName, index }: FieldsAndFunctions) => {
    const [value, setValue] = useState(item.fields?.[fieldIndex]?.value ?? true);
    
    return (
        <>
        <Switch
        name="allow-cookies-controlled"
        id="allow-cookies-controlled"
        isChecked={value}
        onChange={(e) => {setValue((prevState: any) => !prevState); updateItem(index, fieldIndex, e.target.checked, 'boolean', fieldName)}}
        >
        {options[0]}
        </Switch>
     </>
    )
};

export default Boolean;
