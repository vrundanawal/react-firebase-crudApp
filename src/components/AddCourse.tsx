import { Button, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
  InputControl,
  NumberInputControl,
  SelectControl,
  SubmitButton,
} from "formik-chakra-ui";
import { FC, useState } from "react";
import CourseHelperClass from "../CourseHelperClass";

import Modal from "./Modal";

//create a interface to addUsers and call the fetchCourses with return type void
interface IAddCourseProps {
  fetchCourses: () => void;
}

const AddCourse: FC<IAddCourseProps> = ({ fetchCourses }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Modal title="Add Course" isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={{
            studentName: "",
            name: "",
            marks: "",
            type: "",
            description: "",
          }}
          onSubmit={async (values) => {
            console.log(values);
            //try and catch block to handle the data
            try {
              setIsLoading(true);
              //call the helper class with method to add coureses
              await CourseHelperClass.addCourse({
                studentName: values.studentName,
                name: values.name,
                marks: parseInt(values.marks), //convert string into number
                type: values.type,
                description: values.description,
              });
            } catch (error) {
              console.log(error);
              alert(error);
            } finally {
              setIsLoading(false); //after getting data make loading is to be false
              fetchCourses(); //call fetchCourses to get updated data without refresh the page
              onClose(); //from formik to close the modal after add the data
            }
          }}
        >
          <Form>
            <Stack py="4">
              <InputControl
                name="studentName"
                label="Student Name"
                inputProps={{ placeholder: "Enter Your Name" }}
              />
              <InputControl
                name="name"
                label="Course Name"
                inputProps={{ placeholder: "Enter Course Name" }}
              />
              <NumberInputControl name="marks" label="Students Marks" />

              <SelectControl name="type" label="Course Type">
                <option value="">Select a course type</option>
                <option value="hard">Hard</option>
                <option value="medium">Medium</option>
                <option value="easy">Easy</option>
              </SelectControl>

              <InputControl
                name="description"
                label="Description"
                inputProps={{ placeholder: "Description" }}
              />
            </Stack>

            <Flex justify="end">
              <SubmitButton isLoading={isLoading} colorScheme="purple">
                Add Course
              </SubmitButton>
            </Flex>
          </Form>
        </Formik>
      </Modal>
      <Button onClick={onOpen} mb="4">
        Add Course
      </Button>
    </>
  );
};
export default AddCourse;
