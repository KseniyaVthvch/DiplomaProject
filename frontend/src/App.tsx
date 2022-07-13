import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import LogIn from "./modules/Auth/LogIn";
import "antd/dist/antd.min.css";
import "./styles/index.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import CoursesContainer from "./modules/Courses/coursesInfo/CoursesContainer";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import SignUp from "./modules/Auth/SignUp";
import { Layout } from "antd";
import { useGetUserQuery } from "./modules/UserProfile/userSlice/endpoints";
import { setUser } from "./modules/UserProfile/userSlice";
import jwt from "jwt-decode";
import Navigation from "../src/components/Navigation";
import CreateCourseContainer from "./modules/Courses/createCourse/CreateCourseContainer";
import Loader from "./components/Loader/Loader";
import TaskInfoContainer from "./modules/Tasks/TaskInfo/TaskInfoContainer";
import AnswersListContainer from "./modules/Answers/AnswersList/AnswersListContainer";
import ProfileContainer from "./modules/UserProfile/Profile/ProfileContainer";

interface IUserInfo {
  id: string;
}

export const useIsTeacher = () => {
  const { role } = useAppSelector((state) => state.user.user);
  if (role === "teacher") {
    return {
      isTeacher: true,
    };
  } else
    return {
      isTeacher: false,
    };
};

function App() {
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAppSelector((state) => state.auth);

  let userId;
  if (token) {
    const decodedToken: IUserInfo = jwt(token);
    userId = decodedToken?.id;
  }
  const { data, isLoading } = useGetUserQuery(userId, {
    skip: !Boolean(userId) && !isAuth,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch, isAuth]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {isAuth && data && <Navigation user={data} />}
      <Layout className="app">
        <Routes>
          <Route path="/login" element={<PublicRoute />}>
            <Route path="/login" element={<LogIn />} />
          </Route>
          <Route path="/signup" element={<PublicRoute />}>
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<CoursesContainer />} />
            <Route path="course/:id" element={<TaskInfoContainer />} />
            <Route path="/create-course" element={<CreateCourseContainer />} />
            <Route path="/profile" element={<ProfileContainer />} />
            <Route path="/answer" element={<AnswersListContainer />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
