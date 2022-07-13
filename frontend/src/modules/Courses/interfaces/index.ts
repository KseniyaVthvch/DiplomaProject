import { ITask } from "../../Tasks/interfaces";

export interface ICourse {
  _id: string;
  tasks: Array<ITask>;
  description: string;
  courseTitle: string;
  students?: Array<any>;
}

export interface CourseDetailsProps {
  data: ICourse;
}

export interface ICourseInfo {
  _id: string;
  description: string;
  courseTitle: string;
  author: string;
}

export interface CoursesInfoProps {
  courses: ICourseInfo[];
  handleClick: (item: string, course: ICourseInfo) => void;
}
