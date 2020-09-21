/**
 * Chat Room Creation Box
 */

import React from "react";
import { Modal, Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";

import { ChatRoomType } from "src/Components/ChatRoom/type";
import { t } from "src/lib/language/translate";

import { HandleChatRoomCreationBoxOpenType, FormInputErrorType } from "./type";
import { createChatRoom } from "./lib";

interface Props {
  open: boolean;
  handleChatRoomCreationBoxOpen: HandleChatRoomCreationBoxOpenType;
}

function Main(props: Props): JSX.Element
{
  const { open, handleChatRoomCreationBoxOpen } = props;

  const NAME_MAX = 16;
  const INTRO_MAX = 64;
  const NAME_ERROR_MSG = t(`The name cannot be empty and cannot exceed ${NAME_MAX} characters.`);
  const INTRO_ERROR_MSG = t(`The intro cannot exceed ${INTRO_MAX} characters.`);

  const [nameError, setNameError] = React.useState<FormInputErrorType>();
  const [introError, setIntroError] = React.useState<FormInputErrorType>();
  const [submiting, setSubmiting] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      intro: "",
    },
    validate: (values: ChatRoomType) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors: any = {};

      if (values.name.length === 0 || values.name.length > NAME_MAX) {
        errors["name"] = NAME_ERROR_MSG;
        setNameError({ content: NAME_ERROR_MSG, pointing: "below" });
      } else {
        setNameError(undefined);
      }

      if (values.intro.length > INTRO_MAX) {
        errors["intro"] = INTRO_ERROR_MSG;
        setIntroError({ content: INTRO_ERROR_MSG, pointing: "below" });
      } else {
        setIntroError(undefined);
      }

      return errors;
    },
    onSubmit: async (values: ChatRoomType) => {
      setSubmiting(true);
      await createChatRoom(values);
      setSubmiting(false);
    },
  });

  const clearForm = React.useCallback(() => {
    formik.resetForm();
    setNameError(undefined);
    setIntroError(undefined);
  }, [formik]);

  const handleClose = React.useCallback(() => {
    handleChatRoomCreationBoxOpen(false);
    clearForm();
  }, [handleChatRoomCreationBoxOpen, clearForm]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Modal.Header>{t("Create Chat Room")}</Modal.Header>

        <Modal.Content>
          <Form>
            <Form.Field required>
              <label>{t("Name")}</label>
              <Form.Input placeholder={t("Name")} {...formik.getFieldProps("name")} error={nameError} />
            </Form.Field>
            <Form.Field>
              <label>{t("Intro")}</label>
              <Form.Input placeholder={t("Intro")} {...formik.getFieldProps("intro")} error={introError} />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={handleClose}>{t("Cancel")}</Button>
          <Button
            type="submit"
            onClick={() => formik.handleSubmit()}
            loading={submiting}
            disabled={submiting}
          >{t("Ok")}</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default Main;
