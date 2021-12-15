import React from "react";
import Button from "../../components/Button";
import { useMe } from "../../hooks/useMe";

const EditProfile = () => {
  const { data: userData } = useMe();
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h4 className="font-semibold text-2xl mb-3">Edit profile</h4>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <form className="form">
          <input className="input" type="email" name="email" required />
          <input className="input" type="password" name="password" />
          <Button canClick={true} loading={false} actionText="Update Profile" buttonType="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
