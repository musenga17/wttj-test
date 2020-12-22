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

var listOfJobsDefault = [];
var apiCalled = false;
var listOfOfficesNames = [];
var listOfDepartmentNames = [];

const Offers = () => {

  const [listOfJobs, setListOfJobs] = useState([]);
  const [listOfContractTypes, setListOfContractTypes] = useState([]);
  const [searchJobValue, setSearchJobValue] = useState("");
  const [contractTypeValue, setContractTypeValue] = useState("");
  const [groupByValue, setGroupByValue] = useState("office.name");
  const [dateValue, setDateValue] = useState(null);

  useEffect(() => {
    if (!apiCalled) {
      const fetchData = async () => {
        await Axios.get("https://www.welcomekit.co/api/v1/embed?organization_reference=Pg4eV6k")
          .then((result) => {
            listOfJobsDefault = result.data.jobs;
            setListOfJobs(result.data.jobs);
            getContractTypes(result.data.jobs);
            getOfficeNames(result.data.jobs);
            getDepartmentNames(result.data.jobs);
            apiCalled = true;
          })
          .catch((error) => {
            console.log(error);
          });

        filterSearchJob();
      };
      fetchData();
    }
    else {
      filterSearchJob();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchJobValue, contractTypeValue, dateValue, groupByValue]);

  /**
   * This method gets the office names in an array 
   * without making duplicates
   * 
   * @param {Array} listOfJobs The list in which we will do the research
  */
  const getOfficeNames = (listOfJobs) => {
    for (const job of listOfJobs) {
      if (!listOfOfficesNames.includes(job.office.name)) {
        listOfOfficesNames.push(job.office.name);
      }
    }
  }

  /**
   * This method gets the department names in an array 
   * without making duplicates
   * 
   * @param {Array} listOfJobs The list in which we will do the research
  */
  const getDepartmentNames = (listOfJobs) => {
    for (const job of listOfJobs) {
      if (!listOfDepartmentNames.includes(job.department.name)) {
        listOfDepartmentNames.push(job.department.name);
      }
    }
  }

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
  };

  /**
   * This method gets the types of contracts in an array 
   * without making duplicates
   * 
   * @param {Array} listOfJobs The list in which we will do the research
  */
  const getContractTypes = (listOfJobs) => {
    var listOfContractTypesTMP = [];
    for (const job of listOfJobs) {
      if (!containsObjectLabel(listOfContractTypesTMP, job.contract_type.en)) {
        listOfContractTypesTMP.push({
          value: job.contract_type.en,
          label: job.contract_type.en
        });
      }
    }
    setListOfContractTypes(listOfContractTypesTMP);
  };

  const handleSearchChange = (e) => {
    setSearchJobValue(e.target.value);
  };

  const handleContractTypeChange = (e) => {
    setContractTypeValue(e);
  };

  const handleDateChange = (e) => {
    setDateValue(e);
  };

  const handleGroupByChange = (e) => {
    setGroupByValue(e);
  };

  /**
   * This method applies the filter for the search of jobs
  */
  const filterSearchJob = () => {
    var listOfJobsTMP = listOfJobsDefault.filter((job) => job.name.toLowerCase().includes(searchJobValue.toLowerCase()));
    setListOfJobs(listOfJobsTMP);
    filterContractType(listOfJobsTMP);
  };

  /**
   * This method applies the filter for the selected type of contract
   * 
   * @param {Array} listfJobsFiltered The list potentially already filtered
  */
  const filterContractType = (listOfJobsFiltered) => {
    var listOfJobsTMP = [];
    if (contractTypeValue !== "" && contractTypeValue !== undefined) {
      listOfJobsTMP = listOfJobsFiltered.filter((job) => job.contract_type.en === contractTypeValue);
    }
    else {
      listOfJobsTMP = listOfJobsFiltered;
    }
    setListOfJobs(listOfJobsTMP);
    filterDate(listOfJobsTMP);
  }

  /**
   * This method applies the filter for the selected date
   * 
   * @param {Array} listfJobsFiltered The list potentially already filtered
  */
  const filterDate = (listOfJobsFiltered) => {
    var listOfJobsTMP = [];
    if (dateValue !== null && dateValue !== undefined) {
      listOfJobsTMP = listOfJobsFiltered.filter((job) => new Date(job.published_at) > new Date(dateValue));
    }
    else {
      listOfJobsTMP = listOfJobsFiltered;
    }
    setListOfJobs(listOfJobsTMP);
    filterGroupBy(listOfJobsTMP);
  }

  /**
   * This method applies the filter for the selected group
   * 
   * @param {Array} listfJobsFiltered The list potentially already filtered
  */
  const filterGroupBy = (listOfJobsFiltered) => {
    var listOfJobsTMP = [];
    var listOfGroups = [];
    var group = [];

    switch (groupByValue) {
      case 'office.name':
        for (const officeName of listOfOfficesNames) {
          group = listOfJobsFiltered.filter((job) => job.office.name === officeName);
          listOfGroups.push(group);
          // We decompose the elements (jobs) of all the groups in a single array
          listOfJobsTMP = [].concat(...listOfGroups);
        }
        break;

      case 'department.name':
        for (const departmentName of listOfDepartmentNames) {
          group = listOfJobsFiltered.filter((job) => job.department.name === departmentName);
          listOfGroups.push(group);
          // We decompose the elements (jobs) of all the groups in a single array
          listOfJobsTMP = [].concat(...listOfGroups);
        }
        break;

      default:
        listOfJobsTMP = listOfJobsFiltered;
        break;
    }
    setListOfJobs(listOfJobsTMP);
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
              onChange={(e) => handleSearchChange(e)}
              value={searchJobValue}
            />
            <ConnectedField
              name="contractType"
              component={Select}
              placeholder={data.offers.contractTypeSelect.placeholder}
              options={listOfContractTypes}
              isClearable
              className="select inputField"
              onChange={(e) => handleContractTypeChange(e)}
              value={contractTypeValue}
            />
            <ConnectedField
              name="date"
              component={DatePicker}
              placeholder={data.offers.datePickerInput.placeholder}
              className="inputField"
              onChange={handleDateChange}
            />
            <ConnectedField
              name="groupBy"
              component={Select}
              placeholder={data.offers.groupBySelect.placeholder}
              options={data.offers.groupBySelect.options}
              className="select inputField"
              onChange={(e) => handleGroupByChange(e)}
              value={groupByValue}
            />
          </Box>
        }
      </Form>
      {listOfJobs.map((job) => (
        <Job key={`job-${job.id}`} jobInformations={job} searchTerm={searchJobValue} />
      ))}
    </Box>
  );
};

export default Offers;