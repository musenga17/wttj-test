import React from 'react';
import data from '../../data/data.json';
import { Box } from '@welcome-ui/box';
import { Text } from '@welcome-ui/text';
import { Button } from '@welcome-ui/button';

const Job = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="white"
      width="100%"
      padding="20px 10px"
      marginBottom="10px"
    >
      <Box>
        <Text variant="subtitle1" marginBottom="2px">{props.jobInformations.name}</Text>
        <Text variant="subtitle2" color="dark.200">{props.jobInformations.contract_type.en} - {props.jobInformations.office.name}</Text>
      </Box>
      <Button>{data.offers.jobButton}</Button>
    </Box>
  );
};

export default Job;