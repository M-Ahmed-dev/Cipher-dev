import { Box, Checkbox } from "@chakra-ui/react";
import PropTypes from "prop-types";

function OptionCheckboxes({
  category,
  categoryData,
  formik,
  handleItem,
  handleSelectCategory,
}) {
  return (
    <Box mt="30px" key={category} width="100%">
      <Box>
        <Checkbox
          fontWeight="600"
          id={category}
          width="100%"
          padding="10px"
          backgroundColor="#EEEEEE"
          name="applicable_items"
          value={category}
          isChecked={
            formik.values.applied_to === "all" ||
            categoryData[category].every((item) =>
              formik.values.applicable_items.includes(item.id)
            )
          }
          onChange={handleSelectCategory}
          colorScheme="teal"
        >
          {category === "uncategorized" ? "" : category}
        </Checkbox>
      </Box>
      {categoryData[category].map((item) => (
        <Box padding="5px" mt="10px" ml="20px" key={item.id}>
          <Checkbox
            id={item.id.toString()}
            name="applicable_items"
            value={item.id.toString()}
            isChecked={
              formik.values.applied_to === "all" ||
              formik.values.applicable_items.includes(item.id)
            }
            onChange={handleItem}
            colorScheme="teal"
          >
            {item.name}
          </Checkbox>
        </Box>
      ))}
    </Box>
  );
}

OptionCheckboxes.propTypes = {
  category: PropTypes.string.isRequired,
  categoryData: PropTypes.object.isRequired,
  formik: PropTypes.object.isRequired,
  handleItem: PropTypes.func.isRequired,
  handleSelectCategory: PropTypes.func.isRequired,
};

export default OptionCheckboxes;
