import React from "react";
import { IUser } from "../userSlice";
import ImageBase from "../../../components/ImageBase";
import Card from "../../../components/Card/Card";
import { getPerformanceSetting } from "../../../services/getPerfomanceSetting";
import EditProfileContainer from "../EditProfile/EditProfileContainer";

export interface ProfileContainerProps {
  user: IUser;
  average: number;
  isTeacher: boolean;
}

const Profile = ({ user, average, isTeacher }: ProfileContainerProps) => {
  const {
    email,
    name,
    avatar: { mimetype, fileB64 },
  } = user;
  const { status } = getPerformanceSetting(average);
  return (
    <Card className="user-profile__container">
      <div className="user-profile__body">
        <div className="user-profile__image-wrapper">
          <ImageBase file={fileB64} type={mimetype} />
        </div>
        <div className="user-profile__info-wrapper">
          <div className={"profile-title"}>
            <h2>User profile</h2>
            <EditProfileContainer />
          </div>

          <div className="user-info-item">
            <span className="user-info__label">Full name: </span>
            <span>{name}</span>
          </div>
          <div className="user-info-item">
            <span className="user-info__label">Email:</span>{" "}
            <span>{email}</span>
          </div>
          {!isTeacher && (
            <div className="user-info-item">
              <span className="user-info__label">Average score: </span>
              {average ? (
                <span className={status}>{average}</span>
              ) : (
                <span>You don't have grades yet</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Profile;
