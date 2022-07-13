import React from "react";
import CreateTaskContainer from "../ManageTask/CreateTaskContainer";
import EditTaskContainer from "../ManageTask/EditTaskContainer";
import DeleteTaskContainer from "../ManageTask/DeleteTaskContainer";
import MDEditor from "@uiw/react-md-editor";
import NoData from "../../../components/Illustrations/NoData";
import { TaskInfoProps } from "../interfaces";
import ShowAnswerContainer from "../../Answers/ShowAnswer/ShowAnswerContainer";
import Title from "../../Courses/coursesInfo/CourseTitle";

const TaskInfo = ({
  isTeacher,
  setTask,
  currentTask,
  refetch,
  data,
}: TaskInfoProps) => {
  const { tasks, courseTitle, description, _id, students } = data;

  return (
    <div>
      <div className="course-info_wrapper">
        <h1>
          <Title
            title={courseTitle}
            id={_id}
            studentsCount={students?.length}
          />
        </h1>
        <p>{description}</p>
      </div>
      <div className="course_tasks__wrapper">
        <div className="task-name__wrapper">
          {isTeacher && (
            <div className="task-name task-name__button">
              <CreateTaskContainer />
            </div>
          )}
          {tasks?.length > 0 ? (
            tasks?.map((task) => (
              <div
                className={`task-name ${
                  task._id === currentTask?._id ? "active" : ""
                }`}
                key={task._id}
                onClick={() => setTask(task)}
              >
                {task.task}
              </div>
            ))
          ) : (
            <div className="task-name">There are no tasks yet :(</div>
          )}
        </div>
        <div>
          {currentTask ? (
            <>
              <div className="task-details__wrapper task_scroll">
                <div className="edit-task__wrapper">
                  {isTeacher && (
                    <div className="manage-task__container">
                      <EditTaskContainer currentTask={currentTask} />
                      <DeleteTaskContainer currentTask={currentTask} />
                    </div>
                  )}
                </div>
                <MDEditor.Markdown source={currentTask.description} />
              </div>
              {!isTeacher && <ShowAnswerContainer />}
            </>
          ) : (
            <div>
              <NoData />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
