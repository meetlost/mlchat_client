/**
 * Username Creation Box
 */

import React from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";

import { AppAnyType, FormInputErrorType } from "src/Components/App/type";
import {
  HandleOpenType as HandleChatRoomOpenType,
} from "src/Components/ChatRoom/type";
import { t } from "src/lib/language/translate";

import { UsernameType, HandleOpenType } from "./type";
import { setUsername } from "./lib";

interface Props {
  open: boolean;
  handleOpen: HandleOpenType;
  handleChatRoomOpen: HandleChatRoomOpenType;
}

function Main(props: Props): JSX.Element
{
  const { open, handleOpen, handleChatRoomOpen } = props;

  const USERNAME_MAX = 16;
  const USERNAME_ERROR_MSG = t(`The name cannot be empty and cannot exceed ${USERNAME_MAX} characters.`);

  const [usernameError, setUsernameError] = React.useState<FormInputErrorType>();

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: (values: UsernameType) => {
      const errors: AppAnyType = {};

      if (values.username.length === 0 || values.username.length > USERNAME_MAX) {
        errors["username"] = USERNAME_ERROR_MSG;
        setUsernameError({ content: USERNAME_ERROR_MSG, pointing: "below" });
      } else {
        setUsernameError(undefined);
      }

      return errors;
    },
    onSubmit: async (values: UsernameType) => {
      setUsername(values.username);
      handleClose();
      handleChatRoomOpen(true);
    },
  });

  const clearForm = React.useCallback(() => {
    formik.resetForm();
    setUsernameError(undefined);
  }, [formik]);

  const handleClose = React.useCallback(() => {
    handleOpen(false);
    clearForm();
  }, [handleOpen, clearForm]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Modal.Header>{t("Create Username")}</Modal.Header>

        <Modal.Content>
          <Form>
            <Form.Field required>
              <label>{t("Username")}</label>
              <Form.Input placeholder={t("Username")} {...formik.getFieldProps("username")} error={usernameError} />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={handleClose}>{t("Cancel")}</Button>
          <Button
            type="submit"
            onClick={() => formik.handleSubmit()}
          >{t("Ok")}</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default Main;
