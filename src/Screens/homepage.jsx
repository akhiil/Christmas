import React, { useEffect, useState } from "react";
import Header from "../Components/headers";
import { EllipsisVertical, Plus } from "lucide-react";
import { alldataDummy, days, months } from "../Components/utils";
import AnimatedCheckbox from "../Components/checkBox";
import { Modal } from "../Components/Modals";
import { MenuBar } from "../Components/MeanuBar";
import { useNavigate } from "react-router";

const Homepage = () => {
  const today = new Date();
  const [todaysData, setTodaysData] = useState([]);
  const [issModalOpen, setIsModalOpen] = useState(false);
  const [openMeanubar, setIsOpenMeanuBar] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (id) => {
    // Retrieve completed tasks from local storage
    let completed = localStorage.getItem("completedTask");
    completed = completed ? JSON.parse(completed) : [];
    // Default to empty array if null

    // Find the index of the task ID in the completed array
    const index = completed.indexOf(id);

    // If the task ID is found in the completed array
    if (index > -1) {
      // Create a new array without the completed task ID
      const tempCompletedTask = [...completed];
      tempCompletedTask.splice(index, 1); // Remove the task ID
      localStorage.setItem("completedTask", JSON.stringify(tempCompletedTask)); // Update local storage
    } else {
      // Add the task ID to the completed array
      localStorage.setItem("completedTask", JSON.stringify([...completed, id]));
    }

    // Update today's data with the new checked state
    setTodaysData((prevData) =>
      prevData.map((item) => {
        if (id === item.id) {
          return { ...item, isChecked: !item.isChecked }; // Toggle isChecked state
        }
        return item; // Return unchanged item
      })
    );
  };

  const handleData = (completed = []) => {
    if (!JSON.parse(localStorage.getItem("allData"))) {
      localStorage.setItem(
        "allData",
        JSON.stringify({
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        })
      );
    } else {
      const allData = JSON.parse(localStorage.getItem("allData"));
      setTodaysData(
        allData[days[today.getDay()]].map((item) => {
          return { ...item, isChecked: completed?.includes(item.id) ?? false };
        })
      );
    }
  };

  let completed = localStorage.getItem("completedTask");

  useEffect(() => {
    let completed = localStorage.getItem("completedTask");
    if (!completed) {
      localStorage.setItem("completedTask", JSON.stringify([]));
    }else{
        completed = JSON.parse(completed)
    }
    const today = new Date();
    const exactToday = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
    const savedDate = JSON.parse(localStorage.getItem("todaysDate"));
    if (savedDate) {
      if (savedDate !== exactToday) {
        localStorage.setItem("completedTask", []);
        localStorage.setItem("todaysDate", JSON.stringify(exactToday));
      }
    } else {
      localStorage.setItem("todaysDate", JSON.stringify(exactToday));
    }
    handleData(completed);
  }, []);

  useEffect(() => {
    window.addEventListener("storage", () => {
        handleData(completed)
    });
    return () => {
      window.removeEventListener("storage", () => {
        handleData(completed)
    });
    };
  }, []);

  const onSave = (task, selectedDays) => {
    let allData = JSON.parse(localStorage.getItem("allData"));
    selectedDays?.map((item) => {
      allData[item].push({
        id: `${task} + ${new Date()}`,
        task: task,
      });
    });
    localStorage.setItem("allData", JSON.stringify(allData));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Header
        text="Manage tasks"
        sideComponent={
          <EllipsisVertical
            color="white"
            onClick={() => {
              document.dispatchEvent(new Event("mousedown"));
              setIsOpenMeanuBar(!openMeanubar);
            }}
          />
        }
      />
      <div
        style={{
          fontFamily: "Fantasy",
          fontWeight: "bold",
          fontSize: 24,
          margin: "20px 0",
        }}
      >
        {`${days[today.getDay()]} - ${today.getDate()} ${months[
          today.getMonth()
        ].slice(0, 3)} ${today.getFullYear()}`}
      </div>
      <br />
      <br />
      <section>
        <span style={{ fontFamily: "Monospace", fontSize: 20, fontStyle: "" }}>
          <u>Your today's Task</u>
        </span>
        {todaysData.length===0 ? <h1 style={{marginTop: 20}}>Start adding your tasks below</h1> : null}
        {todaysData?.map((item, index) => {
          return (
            <AnimatedCheckbox
              item={item}
              handleCheckboxChange={handleCheckboxChange}
              isChecked={item.isChecked}
            />
          );
        })}
      </section>
      <Modal
        title="Add New Task"
        isOpen={issModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onSave}
      />
      <div style={{ position: "absolute", right: 230, top: 40 }}>
        <MenuBar
          onViewAllTasks={() => {
            navigate("/allTask");
          }}
          onClearEverything={() => {
            localStorage.clear();
            window.dispatchEvent(new Event("storage"))
          }}
          onChangeTheme={{}}
          isOpen={openMeanubar}
          setIsOpen={setIsOpenMeanuBar}
        />
      </div>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        style={{
          position: "absolute",
          bottom: 20,
          right: "20px",
          backgroundColor: "#3b82f6",
          borderRadius: "50%",
          fontWeight: 700,
          color: "#fff",
          width: 60,
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Plus style={{ strokeWidth: 3 }} />
      </button>
    </div>
  );
};

export default Homepage;
