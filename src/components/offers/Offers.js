import React, { useEffect, useState } from 'react';
import data from "../../data/data.json";
import { Box } from '@welcome-ui/box';
import { Text } from '@welcome-ui/text';
import { Form } from "react-final-form"
import { ConnectedField } from '@welcome-ui/connected-field';
import { InputText } from '@welcome-ui/input-text';
import { Select } from '@welcome-ui/select';
import { DatePicker } from '@welcome-ui/date-picker';
import Job from '../jobs/Job';
import Axios from 'axios';
import "./Offers.scss";


const Offers = () => {

  const [listOfJobs, setListOfJobs] = useState([]);
  const [listOfContractTypes, setListOfContractTypes] = useState([]);

  useEffect(() => {
    Axios.get("https://www.welcomekit.co/api/v1/embed?organization_reference=Pg4eV6k")
      .then((result) => {
        setListOfJobs(result.data.jobs);
        getContractTypes(result.data.jobs);
      })
      .catch((error) => {
        console.log(error);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This method determines if the array already contains an object whose the property value 'label'
   * is equal to the searched string
   * 
   * @param {Array} list The list in which we will do the research
   * @param {string} searchedString The searched string
  */
  const containsObjectLabel = (list, searchedString) => {
    const condition = (element) => element.label === searchedString;
    return list.some(condition);
  }

  /**
   * This method gets the types of contracts in an array 
   * without making duplicates
   * 
   * @param {Array} list The list in which we will do the research
  */
  const getContractTypes = (listOfJobs) => {
    var listOfContractTypesTMP = [];
    var index = 0;
    for (const job of listOfJobs) {
      if (!containsObjectLabel(listOfContractTypesTMP, job.contract_type.en)) {
        listOfContractTypesTMP.push({
          value: `contractType${index}`,
          label: job.contract_type.en
        });
        index++;
      }
    }
    setListOfContractTypes(listOfContractTypesTMP);
  }

  return (
    <Box
      padding="50px"
      margin="-100px auto 0"
      backgroundColor="light.700"
      maxWidth="max-content"
    >
      <Text variant="h3" textAlign="center" marginBottom="50px">{data.offers.title}</Text>
      <Form
        onSubmit={() => console.log("onSubmit")}
        initialValues={{
          date: Date.now(),
          groupBy: "department.name"
        }}
      >
        {() =>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            marginBottom="50px"
          >
            <ConnectedField
              name="searchJob"
              component={InputText}
              placeholder={data.offers.searchInput.placeholder}
              className="inputField"
            />
            <ConnectedField
              name="contractType"
              component={Select}
              placeholder={data.offers.contractTypeSelect.placeholder}
              options={listOfContractTypes}
              isClearable
              className="select inputField"
            />
            <ConnectedField
              name="date"
              component={DatePicker}
              placeholder={data.offers.datePickerInput.placeholder}
              className="inputField"
            />
            <ConnectedField
              name="groupBy"
              component={Select}
              placeholder={data.offers.groupBySelect.placeholder}
              options={data.offers.groupBySelect.options}
              className="select inputField"
            />
          </Box>
        }
      </Form>
      {listOfJobs.map((job) => (
        <Job key={`job-${job.id}`} jobInformations={job} />
      ))}
    </Box>
  );
};

export default Offers;