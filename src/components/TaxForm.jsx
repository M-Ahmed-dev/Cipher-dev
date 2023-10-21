import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon, UpDownIcon } from "@chakra-ui/icons";
import FormOptions from "./FormOptions";

// import DataResponse from "../data/DataResponse";

import DataResponse from "../data";
import OptionCheckboxes from "./OptionCheckboxes";

const ApiData = DataResponse;

console.log(ApiData);

const ApiPayload = {
  initialValues: {
    applicable_items: [],
    applied_to: "",
    name: "",
    rate: 0,
  },
  onSubmit: (values) => {
    console.log(values);
  },
};

const TaxForm = () => {
  const [search, setSearch] = useState("");
  const [categoryData, setCategoryData] = useState({});
  const formik = useFormik(ApiPayload);

  useEffect(() => {
    const newCategory = { OtherItems: [] };
    ApiData.forEach((item) => {
      if (item.category) {
        if (!newCategory[item.category.name]) {
          newCategory[item.category.name] = [];
        }
        newCategory[item.category.name].push(item);
      } else {
        newCategory.OtherItems.push(item);
      }
    });

    setCategoryData(newCategory);
  }, []);

  const handleSelectAllOptions = (e) => {
    const { checked } = e.target;
    if (checked) {
      formik.setFieldValue(
        "applicable_items",
        ApiData.map((item) => item.id)
      );
      formik.setFieldValue("applied_to", "all");
    } else {
      formik.setFieldValue("applicable_items", []);
      formik.setFieldValue("applied_to", "some");
    }
  };

  const handleSelectSingleOption = (e) => {
    const { checked } = e.target;
    if (checked) {
      formik.setFieldValue("applicable_items", []);
      formik.setFieldValue("applied_to", "some");
    }
  };

  const handleItem = (e) => {
    const { value, checked } = e.target;
    let applicable_items = [...formik.values.applicable_items];
    if (checked) {
      applicable_items.push(parseInt(value));
    } else {
      applicable_items = applicable_items.filter(
        (id) => id !== parseInt(value)
      );
    }
    formik.setFieldValue("applicable_items", applicable_items);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    let applicable_items = [...formik.values.applicable_items];
    if (checked) {
      applicable_items = [
        ...applicable_items,
        ...categoryData[value].map((item) => item.id),
      ];
    } else {
      applicable_items = applicable_items.filter(
        (id) => !categoryData[value].map((item) => item.id).includes(id)
      );
    }
    formik.setFieldValue("applicable_items", applicable_items);
  };

  return (
    <Box>
      <Box width="100%">
        <Text fontWeight="600" fontSize="30px">
          Add Tax
        </Text>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Box mt="30px" display="flex" gap="10px">
          <Input
            placeholder="Name"
            type="text"
            width="400px"
            onChange={formik.handleChange}
          />
          <Box>
            <InputGroup>
              <InputRightElement pointerEvents="none">
                <UpDownIcon />
              </InputRightElement>
              <Input
                placeholder="Rate"
                type="number"
                onChange={(e) =>
                  formik.setFieldValue(
                    "rate",
                    (e.target.value / 100).toFixed(2)
                  )
                }
              />
            </InputGroup>
          </Box>
        </Box>

        <FormOptions
          handleSelectAllOptions={handleSelectAllOptions}
          handleSelectSingleOption={handleSelectSingleOption}
          formik={formik}
        />

        <Divider mt="30px" />
        <Box>
          <Box mt="30px">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Items"
                width="200px"
              />
            </InputGroup>
          </Box>

          {Object.keys(categoryData).length > 1 &&
            Object.keys(categoryData).map((category) => (
              <OptionCheckboxes
                key={category}
                category={category}
                categoryData={categoryData}
                formik={formik}
                handleItem={handleItem}
                handleSelectCategory={handleSelectCategory}
              />
            ))}

          <Divider mt="20px" />
          <Button color="#FFFFFF" background="#FF8C00" mt="50px" type="submit">
            Apply tax to {formik.values.applicable_items.length} item(s)
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TaxForm;
