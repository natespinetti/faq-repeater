import { FieldAppSDK } from '@contentful/app-sdk';

export type Field = {
    type: string;
    name: string;
    options?: string[];
};

interface FieldValue {
    key: string;
    type: string;
    value: any;
  }
  
export interface Item {
    id: string;
    fields: FieldValue[];
}
  
export type ContentfulComponentsFieldsAndFunctions = {
    items: Item[];
    item: Item;
    index: number;
    sdk: FieldAppSDK;
    setItems: (items: Item[]) => void;
    fieldIndex: number;
    fieldName: string;
    options?: Field['options'];
};
  
export type FieldsAndFunctions = {
    item: Item;
    updateItem: (index: number, fieldIndex: number, value: any, type: string, name: string) => void;
    fieldIndex: number;
    fieldName: string;
    index: number;
    options?: Field['options'];
};