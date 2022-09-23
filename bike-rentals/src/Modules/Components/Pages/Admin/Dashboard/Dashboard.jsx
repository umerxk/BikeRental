import { GlobalContext } from "../../../../Context/GlobalState";
import { useContext, useEffect, useState } from "react";
import { BikeForm, UserForm } from "../../Home/HomeModules/Forms";
import { UsersStats, BikesStats } from "../Stats";

const Dashboard = () => {
  const [createBikeModal, setCreateBikeModal] = useState(false);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [refreshData, setRefreshData] = useState("");
  const [step, setStep] = useState("allUsers");
  const { setSideBarAction, sideBarAction } = useContext(GlobalContext);

  const CurrentStat = {
    allUsers: UsersStats,
    allBikes: BikesStats,
  };

  useEffect(() => {
    if (sideBarAction) {
      if (sideBarAction === "addNewBike") {
        setCreateBikeModal(true);
      } else if (sideBarAction === "createAccount") {
        setCreateUserModal(true);
      } else {
        setStep(sideBarAction);
      }
    }
  }, [sideBarAction]);

  const Component = CurrentStat[step];

  return (
    <>
      <Component
        refreshData={refreshData}
        setRefreshData={(e) => setRefreshData(e)}
      />
      {createBikeModal && (
        <BikeForm
          createBikeModal={createBikeModal}
          handleCloseModal={() => {
            setCreateBikeModal(false);
            setSideBarAction(step);
          }}
          refresh={(e) => setRefreshData(e)}
        />
      )}

      {setCreateUserModal && (
        <UserForm
          isVisible={createUserModal}
          handleCloseModal={() => {
            setCreateUserModal(false);
            setSideBarAction(step);
          }}
          refresh={(e) => setRefreshData(e)}
        />
      )}
    </>
  );
};
export default Dashboard;
