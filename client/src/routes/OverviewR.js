import React, { useEffect, useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import UserContext from "../UserProvider";
import { useList } from "../ListProvider"
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import Overview from "../bricks/Overview"

function OverviewR() {
  const { t } = useTranslation();
  const { darkMode } = useContext(UserContext);
  const { status, lists, fetchList } = useList();

  useEffect(() => {
    fetchList(); 
  }, []); 

  const updateList = () => {
    fetchList(); 
  }

  function getChild() {
    switch (status.state) {
      case "pending":
        return (
          <div className="loading">
            <Icon size={10} path={mdiLoading} spin={true}/>
          </div>
        );
      case "success":
        return (
          <>
            <Overview lists={lists} onDeleteSuccess={updateList}/>
          </>
        );
      case "error":
        return (
          <div>
            <div>{t("Failed to load list data.")}</div>
          </div>
        );
      default:
        return null;
    }
  };

 return (
    <div className={darkMode ? "blackBgr" : ""}>
      {getChild()}
    </div>
  );
};

export default OverviewR;