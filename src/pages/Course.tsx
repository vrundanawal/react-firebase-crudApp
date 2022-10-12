import { Heading, List, ListItem, Stack, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseHelperClass, { ICourseDoc } from "../CourseHelperClass";

const Course = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<ICourseDoc>();
  //const history = useNavigate();

  const fetchDetails = async () => {
    if (id) {
      const course = await CourseHelperClass.getDetails(id);
      setCourse(course);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };
  return (
    <Stack m="12" p="10" boxShadow="xl" spacing={4} align="center">
      {/* <Button onClick={() => history(-1)} colorScheme="purple">
        Go Back
      </Button> */}
      <Button onClick={goToHomePage} colorScheme="purple">
        Go Back
      </Button>

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
