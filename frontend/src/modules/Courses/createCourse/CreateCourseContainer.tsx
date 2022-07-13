import React from "react";
import { useGetAllUsersQuery } from "../../UserProfile/userSlice/endpoints";
import { useAppSelector } from "../../../store/hooks";
import { useCreateCourseMutation } from "../coursesSlice/endpoints";
import Loader from "../../../components/Loader/Loader";
import CreateCourse from "./CreateCourse";

const CreateCourseContainer = () => {
  const id = useAppSelector((state) => state.user.user._id);
  const { data, isLoading } = useGetAllUsersQuery("student");
  const [createCourse] = useCreateCourseMutation();

  const onFinish = async (values: any) => {
    try {
      const data = {
        data: values,
        author: id,
      };
      await createCourse(data).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <CreateCourse data={data} onFinish={onFinish} />
  );
};

export default CreateCourseContainer;
