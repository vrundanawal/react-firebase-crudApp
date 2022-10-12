//import the db
import { db } from "./firestoreConfig";
//for api integration need this function which is comming from firebase
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

//create a interface
export interface ICourse {
  studentName: string;
  name: string;
  marks: number;
  type: string;
  description: string;
}

export interface ICourseDoc extends ICourse {
  id: string;
}

const courseStr = "courses"; //this is from fireStore collection name
const coursesCollectionRef = collection(db, courseStr); //create a reference

//create a class to perform all crud functions and operations
class CourseHelperClass {
  //create a function to grab all the courses from data base
  getCourses = async () => {
    //this is firestore function to get all the docs
    const { docs } = await getDocs(coursesCollectionRef);
    return docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as ICourseDoc;
    });
  };

  //addCourse to db
  addCourse = async (course: ICourse) => {
    //call addDoc function from firebasestore
    return addDoc(coursesCollectionRef, course);
  };

  //update course
  updateCourse = async (id: string, course: ICourse) => {
    //create a reference and store into variable eg= courseDoc
    const courseDoc = doc(db, courseStr, id); //pass id as a document reference
    return updateDoc(courseDoc, course as any);
  };

  //delete course
  deleteCourse = async (id: string) => {
    //create a reference and store into variable eg= courseDoc
    const courseDoc = doc(db, courseStr, id); //pass id as a document reference
    return deleteDoc(courseDoc);
  };

  //getDetails
  getDetails = async (id: string) => {
    //create a reference and store into variable eg= courseDoc
    const courseDoc = doc(db, courseStr, id); //pass id as a document reference
    //fetch the detail
    const fetchedDoc = await getDoc(courseDoc);
    return { ...fetchedDoc.data(), id: fetchedDoc.id } as ICourseDoc;
  };
}

export default new CourseHelperClass();
