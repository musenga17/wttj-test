import React from 'react';
import { Modal, useModalState } from '@welcome-ui/modal';
import { Button } from '@welcome-ui/button';
import { Box } from '@welcome-ui/box';
import data from '../../data/data.json';
import parse from 'html-react-parser';
import './JobInformation.scss';
import InformationPart from './parts/InformationPart';
import PropTypes from 'prop-types';

const JobInformation = (props) => {
  const modal = useModalState();

  /**
   * This method searches the link object which has the value 'wttj_fr' for the property 'website_reference'.
   * It returns the url for this object found
  */
  const getJobUrl = () => {
    const linkObject = props.jobInformations.websites_urls.find(element => element.website_reference === "wttj_fr");
    return linkObject.url;
  };

  return (
    <>
      <Modal.Trigger width={{ xs: "75px", xl: "auto" }} as={Button} {...modal}>
        {data.offers.jobButton}
      </Modal.Trigger>
      <Modal {...modal} ariaLabel="example" className="jobInformation">
        <Modal.Title marginBottom="4px" display="block">
          {props.jobInformations.name} - <span style={{ color: "green" }}>{props.jobInformations.contract_type.en}</span>
        </Modal.Title>
        <Modal.Content>
          <InformationPart title="Job description">{parse(props.jobInformations.description)}</InformationPart>
          <InformationPart title="Profile">{parse(props.jobInformations.profile)}</InformationPart>
          <InformationPart title="Location">
            <p>
              {props.jobInformations.office.address}<br />
              {props.jobInformations.office.zip_code}<br />
              {props.jobInformations.office.district}
            </p>
          </InformationPart>
        </Modal.Content>
        <Modal.Footer>
          <Box width={1} display="flex" justifyContent="center">
            <Button variant="primary" as="a" href={getJobUrl()} target="_blank">Apply</Button>
          </Box>
        </Modal.Footer>
      </Modal>
    </>
  );
};

JobInformation.propTypes = {
  jobInformations: PropTypes.object.isRequired
}

export default JobInformation;