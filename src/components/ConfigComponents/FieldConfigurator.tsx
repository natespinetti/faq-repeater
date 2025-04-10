import { Table, TableBody, TableRow, TableCell, FormLabel, Select, TextInput, Button } from "@contentful/f36-components";
import React from "react";
import RepeatableStringInput from "./RepeatableStringInput";
import { CloseIcon } from '@contentful/f36-icons';
import { Field } from "components/types";

type FieldConfiguratorProps = {
    field: Field;
    index: number;
    updateField: (index: number, updatedField: Field) => void;
    removeField: (index: number) => void;
};

const fieldTypes = [
    'textarea',
    'richtext',
    'dropdown',
    'reference',
    'checkbox',
    'number',
    'media',
    'radio',
    'boolean'
];
  
const FieldConfigurator = ({
    field,
    index,
    updateField,
    removeField
  }: FieldConfiguratorProps) => {
    
    const update = (updates: Partial<Field>) => {
      updateField(index, { ...field, ...updates });
    };
  
    return (
      <div  style={{ display: 'grid' }}>
          <Table>
              <TableBody>
                  <TableRow style={{display: 'inline-flex', width: '100%', flexDirection: 'row', border: '1px solid #ccd0d4', borderBottom: "0px" }}>
                      <TableCell style={{justifyContent: 'center', minWidth: '40px', background: "#f4f4f4", color: "#aaa", display: "grid", alignContent: 'center', borderRight: '1px solid #ccd0d4'}}>
                        {index + 1}
                      </TableCell>
  
                        <TableCell style={{ borderRight: '1px solid #ccd0d4', minWidth: '200px' }}>
                         <FormLabel>Field Type</FormLabel>
                         <p style={{ fontStyle: "italic", fontSize: "10px" }}>&nbsp;</p>
                          <Select
                            value={field.type}
                            onChange={(e) => update({ type: e.target.value, options: [] })}
                          >
                            {fieldTypes.map((type) => (
                              <Select.Option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </Select.Option>
                            ))}
                          </Select>
                        </TableCell>
  
                        <TableCell style={{ borderRight: '1px solid #ccd0d4', minWidth: '260px' }}>
                          <FormLabel>Field Name</FormLabel>
                          <p style={{ fontStyle: "italic", fontSize: "10px" }}>This will display as a label above the field type.</p>
                           <TextInput
                            placeholder="Field name"
                            value={field.name}
                            onChange={(e) => update({ name: e.target.value })}
                          />
                        </TableCell>
  
                        {(field.type === 'radio' ||
                            field.type === 'checkbox' ||
                            field.type === 'media' || 
                            field.type === 'reference' ||
                            field.type === 'dropdown') && (
                        <TableCell style={{ borderRight: '1px solid #ccd0d4', minWidth: '261px' }}>
                          <FormLabel>Options</FormLabel>
                          {(field.type === 'radio' ||
                            field.type === 'checkbox' ||
                            field.type === 'dropdown') && (
                              <>
                            <p style={{ fontStyle: "italic", fontSize: "10px" }}>Default options for {field.type} are: ['Yes', 'No']</p>
                            <RepeatableStringInput
                              values={field.options || []}
                              onChange={(options) => update({ options })}
                            />
                            </>
                          )}
                          {(field.type === 'media' || field.type === 'reference') && (
                            <>
                            <p style={{ fontStyle: "italic", fontSize: "10px" }}>Default amount of entries allowed for {field.type} is: 10</p>
                            <TextInput
                              type="number"
                              placeholder="Max allowed entries"
                              min={1}
                              value={field.options?.[0] || ''}
                              onChange={(e) => update({ options: [e.target.value] })}
                            />
                            </>
                          )}
                        </TableCell>
                        )}
                      
                      <TableCell style={{justifyContent: 'center', background: "#f4f4f4", color: "#aaa", display: "grid", alignContent: 'center', marginLeft: 'auto'}}>
                          <Button variant="secondary" style={{ padding: '10px', height: '20px', minHeight: '20px', width: '20px', borderRadius: '50%' }} startIcon={<CloseIcon style={{ width:'16px' }} />} onClick={() => removeField(index)} />
                      </TableCell>
                  </TableRow>
  
              </TableBody>
          </Table>
      </div>
    );
  };

  export default FieldConfigurator;