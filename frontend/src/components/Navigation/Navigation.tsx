import React from "react";
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  BarChartOutlined,
  PlusCircleOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { logOut } from "../../modules/Auth/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { Link, useLocation } from "react-router-dom";
import ImageBase from "../ImageBase";
import { useIsTeacher } from "../../App";

export const NAVIGATION_ROUTES = {
  home: "/",
  user: "/profile",
  createCourse: "/create-course",
  answer: "/answer",
};

const Navigation = ({ user }: any) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isTeacher } = useIsTeacher();
  const { name, avatar } = user;

  const logoutHandler = () => {
    dispatch(logOut());
  };

  return (
    <>
      <header className="header-container">
        <div>{name}</div>
        <div>
          {avatar?.fileB64 && avatar?.mimetype && (
            <ImageBase
              file={user?.avatar?.fileB64}
              type={user?.avatar?.mimetype}
              className="user-avatar"
            />
          )}
        </div>
      </header>
      <nav className="navigation-container">
        <div className="navigation-links">
          <Link
            to={NAVIGATION_ROUTES.home}
            className={`navigation__icon-wrapper ${
              location.pathname === NAVIGATION_ROUTES.home ||
              location.pathname.includes("/course/")
                ? "active"
                : ""
            }`}
          >
            <HomeOutlined />
            <p>Home</p>
          </Link>
          <Link
            to={NAVIGATION_ROUTES.user}
            className={`navigation__icon-wrapper ${
              location.pathname === NAVIGATION_ROUTES.user ? "active" : ""
            }`}
          >
            <UserOutlined />
            <p>Profile</p>
          </Link>
          {isTeacher && (
            <>
              <Link
                to={NAVIGATION_ROUTES.createCourse}
                className={`navigation__icon-wrapper ${
                  location.pathname === NAVIGATION_ROUTES.createCourse
                    ? "active"
                    : ""
                }`}
              >
                <PlusCircleOutlined />
                <p>Creation</p>
              </Link>
              <Link
                to={NAVIGATION_ROUTES.answer}
                className={`navigation__icon-wrapper ${
                  location.pathname === NAVIGATION_ROUTES.answer ? "active" : ""
                }`}
              >
                <FileOutlined />
                <p>Answers</p>
              </Link>
            </>
          )}
        </div>
        <div className="navigation__icon-wrapper" onClick={logoutHandler}>
          <LogoutOutlined />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
