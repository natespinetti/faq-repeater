import React, { useEffect, useState } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Textarea,
    FormControl,
} from '@contentful/f36-components';
import { v4 as uuid } from 'uuid';
import { useSDK } from '@contentful/react-apps-toolkit';
import { FieldAppSDK, ValidationError } from '@contentful/app-sdk';
import { RichTextEditor } from '@contentful/field-editor-rich-text';
import { CloseIcon, PlusIcon } from '@contentful/f36-icons';

/** An Item which represents an list item of the repeater app */
interface Item {
    id: string;
    key: string;
    value: any;
}

/** A simple utility function to create a 'blank' item
 * @returns A blank `Item` with a uuid
*/
function createItem(): Item {
    return {
        id: uuid(),
        key: '',
        value: '',
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
    }, [sdk])

    const updateItem = (index: number, property: string, value: any) => {
      const updatedItems = [...items];
      updatedItems[index] = { ...updatedItems[index], [property]: value };
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
                            <TableCell style={{borderRight: '1px solid #ccd0d4'}}>
                              <FormControl.Label>Question</FormControl.Label>
                                <Textarea
                                    id="key"
                                    style={{ minWidth: '250px', height: '400px' }}
                                    // labelText="Item Name"
                                    value={item.key}
                                    onChange={(e) => updateItem(index, 'key', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                              <FormControl.Label>Answer</FormControl.Label>
                              <RichTextEditor
                                sdk={{
                                  ...sdk,
                                  field: {
                                    ...sdk.field, // Include ALL methods first!
                                    getValue: () => item.value || {},
                                    setValue: async (value) => {
                                      const updatedItems = [...items];
                                      updatedItems[index] = { ...updatedItems[index], value };

                                      setItems(updatedItems);

                                      return sdk.field.setValue(updatedItems); // Return the full array to Contentful field storage
                                    },
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

                            </TableCell>
                            <TableCell style={{justifyContent: 'center', width: '40px', background: "#f4f4f4", color: "#aaa", display: "grid", alignContent: 'center', borderLeft: '1px solid #ccd0d4'}}>
                                <Button variant="secondary" style={{ padding: '10px', height: '20px', minHeight: '20px', width: '20px', borderRadius: '50%' }} startIcon={<CloseIcon style={{ width:'16px' }} />} onClick={() => deleteItem(item)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button style={{ justifySelf: 'flex-end', marginTop: '1rem' }} variant="primary" startIcon={<PlusIcon />} onClick={addNewItem}>Add Question</Button>
        </div>
    );
};

export default Field;
