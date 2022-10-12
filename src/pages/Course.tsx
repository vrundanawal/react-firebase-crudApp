import {
  Heading,
  List,
  ListItem,
  Stack,
  Button,
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseHelperClass, { ICourseDoc } from "../CourseHelperClass";

const Course = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<ICourseDoc>();

  const fetchDetails = async () => {
    if (id) {
      const course = await CourseHelperClass.getDetails(id);
      setCourse(course);
    }
  };

  useEffect(() => {
    fetchDetails();
  });
  return (
    <Stack m="12" p="10" boxShadow="xl" spacing={4} align="center">
      {/* <Stack m="12" p="5" boxShadow="xl"> */}
      <Button colorScheme="blue">Go Back</Button>

      <Heading>More Information</Heading>
      <List>
        <ListItem>
          <strong>Student Name : </strong>
          {course?.studentName}
        </ListItem>
        <ListItem>
          <strong>Course Name :</strong> {course?.name}
        </ListItem>
        <ListItem>
          <strong>Marks:</strong> {course?.marks}/100
        </ListItem>
        <ListItem>
          <strong>Description:</strong> {course?.description}
        </ListItem>
      </List>
    </Stack>
  );
};

export default Course;
