import { ITask } from "../../Tasks/interfaces";
import { IUser } from "../../UserProfile/userSlice";

export interface IAnswer {
  answer: string;
  createdAt: string;
  grade: null | number;
  taskId: string;
  userId: string;
  user: IUser;
  _id: string;
}

export interface IAnswers extends ITask {
  answers: IAnswer[];
}
