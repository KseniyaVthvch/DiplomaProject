import React from "react";
import Profile from "./Profile";
import { useAppSelector } from "../../../store/hooks";
import Model from "../../../components/3DModel/3DModel";
import { useGetAverageQuery } from "../../Answers/answersSlice/endpoints";
import Loader from "../../../components/Loader/Loader";
import { useIsTeacher } from "../../../App";

const ProfileContainer = () => {
  const { isTeacher } = useIsTeacher();
  const { user } = useAppSelector((state) => state.user);
  const userId = user?._id;
  const { data, isLoading } = useGetAverageQuery({ userId }, { skip: !userId });
  const isNotEmpty = Object.keys(user).length;
  const average = Math.round(data?.average || 0);

  if (isLoading) {
    return <Loader />;
  } else
    return isNotEmpty ? (
      <div style={{ display: "flex" }}>
        <Profile isTeacher={isTeacher} user={user} average={average} />
        {!isTeacher && isNotEmpty && <Model average={average} />}
      </div>
    ) : (
      <div>som went wrong</div>
    );
};

export default ProfileContainer;
