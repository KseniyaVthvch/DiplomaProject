import { ICourse } from "../../Courses/interfaces";

export interface ITask {
  _id: string;
  task: string;
  description: string;
  courseId: string;
}

export interface TaskInfoProps {
  isTeacher: boolean;
  refetch: () => void;
  setTask: (v: ITask) => void;
  currentTask: ITask;
  data: ICourse;
}
