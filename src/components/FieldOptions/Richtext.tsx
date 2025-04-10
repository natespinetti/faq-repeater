import React from 'react';
import { RichTextEditor } from '@contentful/field-editor-rich-text';
import { ValidationError } from '@contentful/app-sdk';
import { generateKey } from '../../components/utility/generateKey';
import { ContentfulComponentsFieldsAndFunctions } from 'components/types';

const Richtext = ({ item, items, setItems, index, fieldIndex, sdk, fieldName }: ContentfulComponentsFieldsAndFunctions) => {
    const value = item.fields?.[fieldIndex]?.value || {};

    return (
        <RichTextEditor
            sdk={{
                ...sdk,
                field: {
                ...sdk.field, // Include ALL methods first!
                getValue: () => value,
                setValue: async (value) => {
                    const updatedItems = [...items];
                    const updatedFields = [...(updatedItems[index].fields || [])];
                  
                    updatedFields[fieldIndex] = {
                      key: generateKey('richtext', fieldName),
                      type: 'richtext',
                      value: value,
                    };
                  
                    updatedItems[index] = {
                      ...updatedItems[index],
                      fields: updatedFields,
                    };
                  
                    setItems(updatedItems);
                    
                    // ✅ Return this to match the expected type
                    return sdk.field.setValue(updatedItems);
                  },
                getIsDisabled: () => false,
                onSchemaErrorsChanged: (callback: (errors: ValidationError[]) => void) => () => {}, // No-op to satisfy the SDK
                onIsDisabledChanged: (callback: (isDisabled: boolean) => void) => () => {}, // No-op to satisfy the SDK
                onValueChanged(callback) {
                    // No-op to satisfy the SDK
                    return () => {};
                },
                },  
            }}
            isInitiallyDisabled={false}
            maxHeight={275}
            minHeight={275}
        />
    );
};

export default Richtext;
