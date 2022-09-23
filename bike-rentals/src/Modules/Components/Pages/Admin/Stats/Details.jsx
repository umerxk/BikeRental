import { AppModal, AppTable } from "../../../../shared";
const Details = ({
  showDetails,
  handleCloseModal,
  header,
  dataSource,
  title,
}) => {
  const getUserName = () => (
    <b>{title?.charAt(0).toUpperCase() + title?.slice(1)}</b>
  );
  return (
    <AppModal
      title={<div>Booking Details of {getUserName()}</div>}
      openModal={showDetails}
      closeModal={handleCloseModal}
      handleSubmit={handleCloseModal}
    >
      <AppTable columns={header} dataSource={dataSource} pagination={false} />
    </AppModal>
  );
};
export default Details;
