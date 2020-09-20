/**
 * Chat Room Creation Box
 */

import React from "react";
import { Modal, Button, Form, Input } from "semantic-ui-react";
import { useFormik } from "formik";

import { ChatRoomType } from "src/Components/ChatRoom/type";
import { t } from "src/lib/language/translate";

import { HandleChatRoomCreationBoxOpenType } from "./type";

interface Props {
  open: boolean;
  handleChatRoomCreationBoxOpen: HandleChatRoomCreationBoxOpenType;
}

function Main(props: Props): JSX.Element
{
  const { open, handleChatRoomCreationBoxOpen } = props;

  const formik = useFormik({
    initialValues: {
      name: "",
      intro: "",
    },
    validate: (values: ChatRoomType) => {
      ////
      console.log(values);
    },
    onSubmit: (values: ChatRoomType) => {
      ////
      console.log(values);
    },
  });

  return (
    <>
      <Modal
        open={open}
        onClose={() => handleChatRoomCreationBoxOpen(false)}
      >
        <Modal.Header>{t("Create Chat Room")}</Modal.Header>

        <Modal.Content>
          <Form>
            <Form.Field required>
              <label>{t("Name")}</label>
              <Input placeholder={t("Name")} {...formik.getFieldProps("name")} />
            </Form.Field>
            <Form.Field>
              <label>{t("Intro")}</label>
              <Input placeholder={t("Intro")} {...formik.getFieldProps("intro")} />
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={() => handleChatRoomCreationBoxOpen(false)}>{t("Cancel")}</Button>
          <Button type="submit" onClick={() => formik.handleSubmit()}>{t("Ok")}</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default Main;
