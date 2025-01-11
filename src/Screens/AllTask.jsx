import React, { useEffect, useState } from "react";
import Header from "../Components/headers";
import Accordian from "../Components/Accodian";

const AllTask = () => {
  const [allData, setAllData] = useState({});

  const handleData = () => {
    const allDataStorage = JSON.parse(localStorage.getItem("allData"));
    setAllData(allDataStorage);
  };

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    window.addEventListener("storage", handleData);
    return () => {
      window.removeEventListener("storage", handleData);
    };
  }, []);

  const deleteTask = (id, day) => {
    const modifiedDay = allData[day].filter((item) => {
      return item.id != id;
    });
    let newData = allData;
    newData[day] = modifiedDay;
    localStorage.setItem("allData", JSON.stringify(newData));
    window.dispatchEvent(new Event("storage"));
  };
  return (
    <div>
      <Header text="Manage tasks" isBack={true} />
      {Object.keys(allData).map((item) => {
        return (
          <Accordian
            title={item}
            taskArray={allData[item]}
            deleteTask={deleteTask}
          />
        );
      })}
    </div>
  );
};

export default AllTask;
