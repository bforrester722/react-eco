import React, { useState } from "react";
import { withEditableResource } from "./withEditableResource";
import { IUserInfoProps, UserInfo } from "../container/UserInfo";
import { ControlledModal } from "../modal/ControlledModal";
export interface IUserInfoFormProps {
  orguser: IUserInfoProps["user"];
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
  url: any;
}
export const UserInfoForm = withEditableResource(
  ({
    orguser,
    user,
    onChangeUser,
    onSaveUser,
    onResetUser,
    url,
  }: IUserInfoFormProps) => {
    const { name, age, hairColor } = user || {};
    const [shouldShowModal, setShouldShowModal] = useState(false);

    return user ? (
      <>
        <UserInfo user={orguser} />
        <button onClick={() => setShouldShowModal(!shouldShowModal)}>
          {shouldShowModal ? "Hide Modal" : "Show Modal"}
        </button>
        <ControlledModal
          shouldShow={shouldShowModal}
          onRequestClose={() => setShouldShowModal(false)}
        >
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
        </ControlledModal>
      </>
    ) : (
      <p>Loading...</p>
    );
  },
  "user"
);
