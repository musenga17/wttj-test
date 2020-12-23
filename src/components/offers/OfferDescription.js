import React from 'react';
import { Modal, useModalState } from '@welcome-ui/modal';
import { Button } from '@welcome-ui/button';
import { Box } from '@welcome-ui/box';
import data from '../../data/data.json';
import parse from 'html-react-parser';
import "./OfferDescription.scss";
import DescriptionPart from './descriptionParts/DescriptionPart';

const OfferDescription = (props) => {
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
      <Modal {...modal} ariaLabel="example" className="modalInformation">
        <Modal.Title marginBottom="4px" display="block">
          {props.jobInformations.name} - <span style={{ color: "green" }}>{props.jobInformations.contract_type.en}</span>
        </Modal.Title>
        <Modal.Content>
          <DescriptionPart title="Job description">{parse(props.jobInformations.description)}</DescriptionPart>
          <DescriptionPart title="Profile">{parse(props.jobInformations.profile)}</DescriptionPart>
          <DescriptionPart title="Location">
            <p>
              {props.jobInformations.office.address}<br />
              {props.jobInformations.office.zip_code}<br />
              {props.jobInformations.office.district}
            </p>
          </DescriptionPart>
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

export default OfferDescription;