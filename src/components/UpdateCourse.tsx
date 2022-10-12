import { Flex, Icon, Stack, useDisclosure } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
  InputControl,
  NumberInputControl,
  SelectControl,
  SubmitButton,
} from "formik-chakra-ui";
import { FC, useState } from "react";
import { FaEdit } from "react-icons/fa";
import CourseHelperClass, { ICourseDoc } from "../CourseHelperClass";

import Modal from "./Modal";

interface IUpdateCourseProps {
  course: ICourseDoc;
  fetchCourses: () => void;
}

const UpdateCourse: FC<IUpdateCourseProps> = ({ course, fetchCourses }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Modal title="Update Course" isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={{
            studentName: course.studentName,
            name: course.name,
            marks: course.marks,
            type: course.type,
            description: course.description,
          }}
          onSubmit={async (values) => {
            // console.log(values);
            try {
              setIsLoading(true);
              //call the helper class with method to add coureses
              await CourseHelperClass.updateCourse(course.id, {
                studentName: values.studentName,
                name: values.name,
                marks: values.marks, //convert string into number
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
                inputProps={{ placeholder: "Enter  Course Name" }}
              />
              <NumberInputControl
                name="marks"
                label="Students Marks"
                helperText="Enter Number of Students"
              />
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
                Update Course
              </SubmitButton>
            </Flex>
          </Form>
        </Formik>
      </Modal>
      <Icon onClick={onOpen} fontSize="xl">
        <FaEdit />
      </Icon>
    </>
  );
};
export default UpdateCourse;
