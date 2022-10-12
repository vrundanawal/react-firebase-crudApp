import {
  Badge,
  Container,
  Flex,
  Heading,
  Icon,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import AddCourse from "../components/AddCourse";
import UpdateCourse from "../components/UpdateCourse";
import { useNavigate } from "react-router-dom";
import { SiFirebase } from "react-icons/si";
import CourseHelperClass, { ICourseDoc } from "../CourseHelperClass";
const Home = () => {
  const [courses, setCourses] = useState<ICourseDoc[]>([]);
  const navigate = useNavigate();

  //fetchCourses
  const fetchCourses = async () => {
    //CourseHelperClass will provide the courses which is in db with getCouses function call
    const courses = await CourseHelperClass.getCourses();
    //console.log(courses);
    setCourses(courses);
  };

  //useEffect hook for Api Call
  useEffect(() => {
    fetchCourses();
  }, []);
  console.log(courses);
  return (
    <>
      <Flex py="4" bg="purple.800" justify="center" align="center" gap="4">
        <SiFirebase fontSize="50px" color="white" />{" "}
        <Heading
          fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
          color="white"
        >
          Firebase/React Crud App
        </Heading>
      </Flex>
      <Container maxW="container.lg" mt="8">
        {/* send fetchUsers as a props to update the ui with updated data*/}
        <AddCourse fetchCourses={fetchCourses} />
        <TableContainer>
          <Table variant="striped" colorScheme="purple">
            <Thead>
              <Tr>
                <Th>Student Name</Th>
                <Th> Course Name</Th>
                <Th>Marks</Th>
                <Th>Type</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map((course) => (
                <Tr key={course.id}>
                  <Td>{course.studentName}</Td>
                  <Td>{course.name}</Td>
                  <Td>{course.marks}</Td>

                  <Td>
                    <Badge
                      colorScheme={
                        course.type === "easy"
                          ? "green"
                          : course.type === "medium"
                          ? "blue"
                          : "red"
                      }
                    >
                      {course.type}
                    </Badge>
                  </Td>
                  <Td>
                    <Flex gap="4">
                      <Icon
                        cursor="pointer"
                        onClick={() => navigate(`/course/${course.id}`)}
                        fontSize="xl"
                      >
                        <FaEye />
                      </Icon>
                      <UpdateCourse
                        course={course}
                        fetchCourses={fetchCourses}
                      />
                      <Icon
                        _hover={{ color: "red.500" }}
                        color="red.300"
                        fontSize="xl"
                      >
                        <FaTrash />
                      </Icon>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Home;
