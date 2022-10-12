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
import { ICourseDoc } from "../CourseHelperClass";

import Modal from "./Modal";

interface IUpdateCourseProps {
  course: ICourseDoc;
}

const UpdateCourse: FC<IUpdateCourseProps> = ({ course }) => {
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
              console.log(values);
            } catch (error) {}
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
