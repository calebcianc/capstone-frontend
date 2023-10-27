import React from "react";
import UserPreferences from "./UserPreferences";

function UserDashboard({
  userProfile,
  toggleShowSubmit,
  setToggleShowSubmit,
  toggleShowEdit,
  setToggleShowEdit,
  toggleProfileRefresh,
  setToggleProfileRefresh,
  toggleShowSubmit1,
  setToggleShowSubmit1,
  toggleShowEdit1,
  setToggleShowEdit1,
}) {
  return (
    <div className="dashboard-container">
      <UserPreferences
        userProfile={userProfile}
        toggleShowSubmit={toggleShowSubmit}
        setToggleShowSubmit={setToggleShowSubmit}
        toggleShowEdit={toggleShowEdit}
        setToggleShowEdit={setToggleShowEdit}
        toggleProfileRefresh={toggleProfileRefresh}
        setToggleProfileRefresh={setToggleProfileRefresh}
        toggleShowSubmit1={toggleShowSubmit1}
        setToggleShowSubmit1={setToggleShowSubmit1}
        toggleShowEdit1={toggleShowEdit1}
        setToggleShowEdit1={setToggleShowEdit1}
      />
    </div>
  );
}

export default UserDashboard;
