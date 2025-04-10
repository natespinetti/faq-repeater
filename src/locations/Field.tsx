import React, { useEffect, useState } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableRow,
    TableCell,
    FormControl,
} from '@contentful/f36-components';
import { v4 as uuid } from 'uuid';
import { useSDK } from '@contentful/react-apps-toolkit';
import { FieldAppSDK } from '@contentful/app-sdk';
import { CloseIcon, PlusIcon } from '@contentful/f36-icons';
import Richtext from '../components/FieldOptions/Richtext';
import Textarea from '../components/FieldOptions/Textarea';
import Radio from '../components/FieldOptions/Radio';
import Boolean from '../components/FieldOptions/Boolean';
import Checkbox from '../components/FieldOptions/Checkbox';
import NumberInput from '../components/FieldOptions/NumberInput';
import Media from '../components/FieldOptions/Media';
import Reference from '../components/FieldOptions/Reference';
import Dropdown from '../components/FieldOptions/Dropdown';
import { Field as FieldType, Item } from '../components/types';
import { generateKey } from '../components/utility/generateKey';

/** A simple utility function to create a 'blank' item
 * @returns A blank `Item` with a uuid
*/
function createItem(): Item {
    return {
        id: uuid(),
        fields: [],
    };
}

/** The Field component is the Repeater App which shows up 
 * in the Contentful field.
 * 
 * The Field expects and uses a `Contentful JSON field`
 */
const Field = () => {
    const sdk = useSDK<FieldAppSDK>();
    const [items, setItems] = useState<Item[]>([]);
    const [repeaterFields, setRepeaterFields] = useState<FieldType[]>([]);
    const [buttonCopy, setButtonCopy] = useState<String>("");

    useEffect(() => {
      const detach = sdk.field.onValueChanged((value: Item[]) => {
        if (Array.isArray(value)) {
                setItems(value);
        }
      });
    
      return () => {
        if (detach) detach();
      };
    }, [sdk.field]);
    
    useEffect(() => {
        // This ensures our app has enough space to render
        sdk.window.startAutoResizer();
    });

    /** Adds another item to the list */
    const addNewItem = () => {
        sdk.field.setValue([...items, createItem()]);
    };

    useEffect(() => {
      console.log(sdk);

      if (sdk.contentType.description) {
        const JSONDesc = JSON.parse(sdk.contentType.description);
        setButtonCopy(JSONDesc.buttonCopy);
        setRepeaterFields(JSONDesc.fields);
        console.log(JSONDesc);
      }
    }, [sdk]);

    const updateItem = (itemIndex: number, fieldIndex: number, value: any, type: string, name: string) => {
      const updatedItems = [...items];
      const updatedFields = [...(updatedItems[itemIndex].fields || [])];
    
      updatedFields[fieldIndex] = {
        ...(updatedFields[fieldIndex] || {}),
        key: generateKey(type, name),
        type: type,
        value: value,
      };
    
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        fields: updatedFields,
      };
      console.log(updatedItems);
    
      setItems(updatedItems);
      sdk.field.setValue(updatedItems);
    };    

    /** Deletes an item from the list */
    const deleteItem = (item: Item) => {
        sdk.field.setValue(items.filter((i) => i.id !== item.id));
    };

    return (
        <div  style={{ display: 'grid' }}>
            <Table>
                <TableBody>
                    {items.map((item, index) => (
                        <TableRow key={item.id} style={{display: 'flex', flexDirection: 'row', border: '1px solid #ccd0d4', borderBottom: "0px" }}>
                            <TableCell style={{justifyContent: 'center', minWidth: '40px', background: "#f4f4f4", color: "#aaa", display: "grid", alignContent: 'center', borderRight: '1px solid #ccd0d4'}}>
                              {index + 1}
                            </TableCell>
                            {repeaterFields.map((field, fieldIndex) => (
                              <TableCell key={fieldIndex} style={{ borderRight: '1px solid #ccd0d4', minWidth: (field.type === 'reference' || field.type === 'media') ? '500px' : '220px' }}>
                                <FormControl.Label>{field.name}</FormControl.Label>

                                {field.type === 'textarea' ? (
                                  <Textarea item={item} updateItem={updateItem} index={index} fieldIndex={fieldIndex} fieldName={field.name} />
                                ) : field.type === 'richtext' ? (
                                  <Richtext item={item} items={items} setItems={setItems} index={index} fieldIndex={fieldIndex} sdk={sdk} fieldName={field.name} />
                                ) : field.type === 'radio' ? (
                                  <Radio item={item} updateItem={updateItem} fieldIndex={fieldIndex} index={index} options={field.options} fieldName={field.name} />
                                ) : field.type === 'checkbox' ? (
                                  <Checkbox item={item} updateItem={updateItem} fieldIndex={fieldIndex} index={index} options={field.options} fieldName={field.name} />
                                ) : field.type === 'number' ? (
                                  <NumberInput item={item} updateItem={updateItem} fieldIndex={fieldIndex} index={index} fieldName={field.name} />
                                ) : field.type === 'media' ? (
                                  <Media item={item} items={items} setItems={setItems} index={index} options={field.options} fieldIndex={fieldIndex} sdk={sdk} fieldName={field.name} />
                                ) : field.type === 'reference' ? (
                                  <Reference item={item} items={items} setItems={setItems} index={index} options={field.options} fieldIndex={fieldIndex} sdk={sdk} fieldName={field.name} />
                                ) : field.type === 'dropdown' ? (
                                  <Dropdown item={item} updateItem={updateItem} fieldIndex={fieldIndex} index={index} options={field.options} fieldName={field.name} />
                                ) : field.type === 'boolean' ? (
                                  <Boolean item={item} updateItem={updateItem} fieldIndex={fieldIndex} index={index} options={field.options} fieldName={field.name} />
                                ) : null}
                              </TableCell>
                            ))}
                            
                            <TableCell style={{justifyContent: 'center', marginLeft:'auto', width: '40px', background: "#f4f4f4", color: "#aaa", display: "grid", alignContent: 'center'}}>
                                <Button variant="secondary" style={{ padding: '10px', height: '20px', minHeight: '20px', width: '20px', borderRadius: '50%' }} startIcon={<CloseIcon style={{ width:'16px' }} />} onClick={() => deleteItem(item)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button style={{ justifySelf: 'flex-end', marginTop: '1rem' }} variant="primary" startIcon={<PlusIcon />} onClick={addNewItem}>{buttonCopy ? buttonCopy : "Add Item"}</Button>
        </div>
    );
};

export default Field;

