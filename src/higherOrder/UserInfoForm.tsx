import React, { useEffect, useState } from "react";
import { withEditableResource } from "./withEditableResource";
import { IUserInfoProps, UserInfo } from "../container/UserInfo";
import { ControlledModal } from "../modal/ControlledModal";
import {
  CompletedButton,
  RemoveButton,
} from "../partiallyApply/partiallyApply";
import styled from "styled-components";
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
  resourcePath: any;
}

const EditUserBtn = styled(CompletedButton)`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

const EditUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
`;

const FlexBetween = styled.label`
  display: flex;
  justify-content: space-between;
  margin: 16px;
`;

export const UserInfoForm = withEditableResource(
  ({
    orguser,
    user,
    onChangeUser,
    onSaveUser,
    onResetUser,
  }: IUserInfoFormProps) => {
    const { name, age, hairColor } = user || {};
    const [shouldShowModal, setShouldShowModal] = useState(false);

    return user ? (
      <>
        <UserInfo user={orguser} />
        <EditUserBtn
          onClick={() => setShouldShowModal(!shouldShowModal)}
          text="Edit User"
        ></EditUserBtn>
        <ControlledModal
          shouldShow={shouldShowModal}
          onRequestClose={() => setShouldShowModal(false)}
        >
          <EditUserWrapper>
            <FlexBetween>
              Name:
              <input
                value={name}
                onChange={(e) =>
                  onChangeUser({ ...user, name: e.target.value })
                }
              />
            </FlexBetween>

            <FlexBetween>
              Age:
              <input
                type="number"
                value={age}
                onChange={(e) =>
                  onChangeUser({ ...user, age: Number(e.target.value) })
                }
              />
            </FlexBetween>
            <FlexBetween>
              Hair Color:
              <input
                value={hairColor}
                onChange={(e) =>
                  onChangeUser({ ...user, hairColor: e.target.value })
                }
              />
            </FlexBetween>
            <FlexBetween>
              <RemoveButton onClick={onResetUser} text="Reset" />
              <CompletedButton
                onClick={() => {
                  onSaveUser();
                  setShouldShowModal(false);
                }}
                text="Save Changes"
              />
            </FlexBetween>
          </EditUserWrapper>
        </ControlledModal>
      </>
    ) : (
      <p>Loading...</p>
    );
  },
  "user"
);
