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
  name: string;
  students: number;
  type: string;
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
}

export default new CourseHelperClass();
