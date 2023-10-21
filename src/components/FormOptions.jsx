import { Box, Checkbox } from "@chakra-ui/react";
import PropTypes from "prop-types";

function FormOptions({
  formik,
  handleSelectAllOptions,
  handleSelectSingleOption,
}) {
  return (
    <>
      <Box mt="30px" display="flex" flexDirection="column" gap="10px">
        <Checkbox
          id="all"
          name="applied_to"
          value="all"
          checked={formik.values.applied_to === "all"}
          onChange={handleSelectAllOptions}
          colorScheme="orange"
        >
          Apply to all items in collection
        </Checkbox>

        <Checkbox
          id="some"
          name="applied_to"
          value="some"
          checked={formik.values.applied_to === "some"}
          onChange={handleSelectSingleOption}
          colorScheme="orange"
        >
          Apply to all items in collection
        </Checkbox>
      </Box>
    </>
  );
}

FormOptions.propTypes = {
  formik: PropTypes.object.isRequired,
  handleSelectAllOptions: PropTypes.func.isRequired,
  handleSelectSingleOption: PropTypes.func.isRequired,
};

export default FormOptions;
