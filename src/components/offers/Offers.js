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


const Offers = () => {

  const [listOfJobs, setListOfJobs] = useState([]);

  useEffect(() => {
    fetch("https://www.welcomekit.co/api/v1/embed?organization_reference=Pg4eV6k")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("RES : ", result.jobs);
          setListOfJobs(result.jobs);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {

        }
      )
  }, []);

  let list = [
    {
      value: "Choix-1",
      label: "YYYYYYYYYYYYYYYYYYYY"
    },
    {
      value: "Choix-2",
      label: "Choix-2"
    },
    {
      value: "Choix-3",
      label: "Choix-3"
    }
  ];

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
        initialValues={{ date: Date.now() }}
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
              marginRight="10px"
            />
            <ConnectedField
              name="contractType"
              component={Select}
              placeholder={data.offers.contractTypeSelect.placeholder}
              options={list}
              marginRight="10px"
            />
            <ConnectedField
              name="date"
              component={DatePicker}
              placeholder={data.offers.datePickerInput.placeholder}
              marginRight="10px"
            />
            <ConnectedField
              name="groupBy"
              component={Select}
              placeholder={data.offers.groupBySelect.placeholder}
              options={list}
              marginRight="10px"
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