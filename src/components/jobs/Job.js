import React, { useEffect } from 'react';
import { Box } from '@welcome-ui/box';
import { Text } from '@welcome-ui/text';
import JobInformation from '../informations/JobInformation';
import Mark from 'mark.js';
import PropTypes from 'prop-types';

const Job = (props) => {

  useEffect(() => {
    if(props.searchTerm) {
      highlightSearchTerm(props.searchTerm);
    }
  }, [props.searchTerm]);

  /**
   * This method convert a date in a date format DD/MM/YYYY
   * 
   * @param {string} inputFormat The date that will be converted
  */
  const convertDate = (inputFormat) => {
    const pad = (s) => {
      return (s < 10) ? '0' + s : s;
    }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }

  /**
   * This method highlight the search term in the job name
   * 
   * @param {string} searchTerm The search term
  */
  const highlightSearchTerm = (searchTerm) => {
    // Element that will be highlighted
    var textMarked = new Mark(".jobName");
    textMarked.unmark({
      done: () => {
        textMarked.mark(searchTerm);
      }
    });
  }

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
      <Box maxWidth={{ xs: "200px", md: "initial" }}>
        <Text variant="subtitle1" marginBottom="2px" className="jobName">{props.jobInformations.name}</Text>
        <Text variant="subtitle2" color="dark.200" marginBottom="10px">{props.jobInformations.contract_type.en} - {props.jobInformations.office.name}</Text>
        <Text variant="subtitle2" color="orange" marginBottom="10px">Department : {props.jobInformations.department.name}</Text>
        <Text variant="subtitle2" color="green">Published on {convertDate(props.jobInformations.published_at)}</Text>
      </Box>
      <JobInformation jobInformations={props.jobInformations} />
    </Box>
  );
};

Job.propTypes = {
  jobInformations: PropTypes.object.isRequired,
  searchTerm: PropTypes.string
}

export default Job;