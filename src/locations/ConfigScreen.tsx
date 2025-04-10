import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Text,
  TextInput,
  Textarea
} from '@contentful/f36-components';
import { PlusIcon } from '@contentful/f36-icons';
import { ConfigAppSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import FieldConfigurator from '../components/ConfigComponents/FieldConfigurator';
import JSONPreview from '../components/ConfigComponents/JSONPreview';
import { Field } from '../components/types';
import { generateKey } from '../components/utility/generateKey';

const ConfigScreen = () => {
  const sdk = useSDK<ConfigAppSDK>();

  const onConfigure = useCallback(async () => {
    const currentState = await sdk.app.getCurrentState();

    return {
      targetState: currentState,
    };
  }, [sdk]);

  useEffect(() => {
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      sdk.app.setReady();
    })();
  }, [sdk]);

  const [config, setConfig] = useState<{
    fields: Field[];
    buttonCopy?: string;
  }>({
    fields: [{type: 'textarea', name: '', options: []}]
  });

  const addNewField = () => {
    setConfig((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        { type: 'textarea', name: '', options: [] }
      ]
    }));
  };

  const updateField = (index: number, updatedField: Field) => {
    const updated = [...config.fields];
    updated[index] = updatedField;
    setConfig((prev) => ({ ...prev, fields: updated }));
  };

  const removeField = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
  };

  return (
    <Box style={{display:"flex", flexDirection: "row", padding: "2rem", gridGap: "2rem" }}>
      {/* Left: Form */}
      <Box style={{ width: "70vw" }}>

        <Text fontWeight="fontWeightDemiBold" marginBottom="spacingS">
          Generate Fields
        </Text>
        {config.fields.map((field, i) => (
          <FieldConfigurator
            key={i}
            field={field}
            index={i}
            updateField={updateField}
            removeField={removeField}
          />
        ))}

        <Box style={{ width: "100%", display: "grid" }}>
          <Button style={{ justifySelf: 'flex-end', marginTop: '1rem' }} variant="primary" startIcon={<PlusIcon />} onClick={addNewField}>Add New Field</Button>
        </Box>

        <Box marginBottom="spacingM">
          <Text fontWeight="fontWeightDemiBold" marginBottom="spacingXs">
            Button Copy
          </Text>
          <p style={{ fontStyle: "italic", fontSize: "10px" }}>This will display in the editor similar to the "Add New Field" button. Value defaults to: 'Add Item'</p>
          <TextInput
            value={config.buttonCopy}
            placeholder='Add Item'
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, buttonCopy: e.target.value }))
            }
          />
        </Box>
        <Box>
          <Text fontWeight="fontWeightDemiBold" style={{ paddingTop: "2rem" }}>
              Field Key for Dev
            </Text>
            <Textarea
              value={config.fields.map(field => generateKey(field.type, field.name)).join('\n')}
            />
      </Box>
      </Box>

      {/* Right: JSON Preview */}
      <Box style={{ width: "30vw" }}>
        <JSONPreview data={config} />
      </Box>
    </Box>
  );
};

export default ConfigScreen;
