import { Box, Textarea, Button, Text } from "@contentful/f36-components";
import { Field } from "components/types";
import React from "react";

const JSONPreview = ({ data }: { data: { fields: Field[]; buttonCopy?: string } }) => {
    const cleanFields = data.fields.map(({ ...field }) => {
      const cleaned = { ...field };
    
      // Default to options: ['1'] for media/reference if not set
      if ((cleaned.type === 'media' || cleaned.type === 'reference') &&
          (!cleaned.options || cleaned.options.length === 0)) {
        cleaned.options = ['1'];
      }
    
      // Remove empty options for other types
      if (
        ('options' in cleaned && Array.isArray(cleaned.options)) &&
        cleaned.options.length === 0 &&
        !(cleaned.type === 'media' || cleaned.type === 'reference')
      ) {
        delete cleaned.options;
      }
    
      return cleaned;
    });
    
    const payload: any = {
      fields: cleanFields
    };
    
    if (data.buttonCopy && data.buttonCopy.trim() !== '') {
      payload.buttonCopy = data.buttonCopy;
    }
    
    const json = JSON.stringify(payload, null, 2);
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(json);
    };
  
    return (
      <Box>
        <Text fontWeight="fontWeightDemiBold" marginBottom="spacingS">
          Live JSON Preview
        </Text>
        <Textarea value={json} rows={25} style={{ width: '100%' }} />
        <Button variant="primary" onClick={copyToClipboard}>
          Copy to Clipboard
        </Button>
      </Box>
    );
  };

  export default JSONPreview;