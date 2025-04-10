import { Box, Flex, TextInput, Button } from "@contentful/f36-components";
import React from "react";

const RepeatableStringInput = ({
    values,
    onChange
  }: {
    values: string[];
    onChange: (values: string[]) => void;
  }) => {
    const addOption = () => onChange([...values, '']);
    const updateOption = (i: number, val: string) => {
      const updated = [...values];
      updated[i] = val;
      onChange(updated);
    };
    const removeOption = (i: number) => {
      const updated = values.filter((_, index) => index !== i);
      onChange(updated);
    };
  
    return (
      <Box marginBottom="spacingS">
        {values.map((val, i) => (
          <Flex key={i} alignItems="center" marginBottom="spacingXs" gap="spacingXs">
            <TextInput
              value={val}
              onChange={(e) => updateOption(i, e.target.value)}
            />
            <Button variant="secondary" onClick={() => removeOption(i)}>
              Remove
            </Button>
          </Flex>
        ))}
        <Button variant="secondary" onClick={addOption}>
          Add Option
        </Button>
      </Box>
    );
  };

  export default RepeatableStringInput;