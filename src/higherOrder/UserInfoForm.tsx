import React from "react";
import { withEditableResource } from "./withEditableResource";
import { IUserInfoProps } from "../container/UserInfo";
export interface IUserInfoFormProps {
  user: IUserInfoProps["user"];
  onChangeUser: ({
    age,
    name,
    hairColor,
    hobbies,
    id,
  }: IUserInfoProps["user"]) => void;
  onSaveUser: () => void;
  onResetUser: () => void;
}
export const UserInfoForm = withEditableResource(
  ({ user, onChangeUser, onSaveUser, onResetUser }: IUserInfoFormProps) => {
    const { name, age, hairColor } = user || {};

    return user ? (
      <>
        <label>
          Name:
          <input
            value={name}
            onChange={(e) => onChangeUser({ ...user, name: e.target.value })}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) =>
              onChangeUser({ ...user, age: Number(e.target.value) })
            }
          />
        </label>
        <label>
          Hair Color:
          <input
            value={hairColor}
            onChange={(e) =>
              onChangeUser({ ...user, hairColor: e.target.value })
            }
          />
        </label>
        <button onClick={onResetUser}>Reset</button>
        <button onClick={onSaveUser}>Save Changes</button>
      </>
    ) : (
      <p>Loading...</p>
    );
  },
  "/users/123",
  "user"
);
