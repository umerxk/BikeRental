import { Modal } from "antd";

const AppModal = ({
  openModal,
  closeModal,
  children,
  handleSubmit,
  okText = "OK",
  cancelText = "Cancel",
  width="80%",
  title=""
}) => {
  return (
    <Modal
      okText={okText}
      cancelText={cancelText}
      visible={openModal}
      onCancel={closeModal}
      onOk={handleSubmit}
      width={width}
      title={title}
    >
      {children}
    </Modal>
  );
};

export default AppModal;
