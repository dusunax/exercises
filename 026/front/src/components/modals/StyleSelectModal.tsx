import { Button, Modal } from "antd";
import { useState } from "react";

export default function StyleSelectModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Button type="primary" onClick={showModal}>
        시작하기
      </Button>
    </>
  );
}
