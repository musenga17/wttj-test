import React from 'react';
import { Box } from '@welcome-ui/box';
import { Text } from '@welcome-ui/text';

const InformationPart = (props) => {
  return (
    <Box marginBottom="20px">
      <Text variant="h4" marginBottom="14px" color="info.500">{props.title}</Text>
      <Box fontSize="12px" className="informationPartText">
        {props.children}
      </Box>
    </Box>
  );
};

export default InformationPart;