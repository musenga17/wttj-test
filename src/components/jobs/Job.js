import React from 'react';
import PropTypes from 'prop-types';
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
    >
      <Box>
        <Text variant="subtitle1" marginBottom="2px">Subtitle 1</Text>
        <Text variant="subtitle2" color="dark.200">Subtitle 2</Text>
      </Box>
      <Button>See more</Button>
    </Box>
  );
};

Job.propTypes = {

};

export default Job;