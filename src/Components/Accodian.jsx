import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Delete,
  DeleteIcon,
  Trash,
} from "lucide-react";
import React, { useState } from "react";

const Accordian = ({ title, taskArray, editTask, deleteTask }) => {
  const [isExpand, setIsExpand] = useState(false);
  const height = (taskArray.length + 1) * 50;
  return (
    <div
      style={{
        backgroundColor: "#bfdbfe",
        transition: "max-height 0.5s ease-in-out",
        maxHeight: isExpand ? height + 200 : 50,
        overflow: "hidden",
        margin: "5px",
        borderRadius: 10,
      }}
    >
      <div
        onClick={() => setIsExpand(!isExpand)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#000", fontWeight: "500", fontSize: 20 }}>
          {title} -{" "}
          <span style={{ fontWeight: "500", fontSize: 14, color: "#1e3a8a" }}>
            ({taskArray.length} tasks)
          </span>
        </span>
        {!isExpand ? <ChevronDown /> : <ChevronUp />}
      </div>
      <div style={{ overflowY: "scroll" }}>
        {isExpand && taskArray.length
          ? taskArray.map((item) => {
              return (
                <div
                  style={{
                    backgroundColor: "#eff6ff",
                    padding: 6,
                    fontSize: 18,
                    paddingLeft: 20,
                    border: "1px solid #2563eb",
                    margin: "4px 10px",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.task}
                  <span
                  onClick={() => {
                    deleteTask(item.id, title)
                  }}
                    style={{
                      display: "flex",
                      fontSize: 14,
                      alignItems: "center",
                      color: "#b91c1c",
                      backgroundColor: "#fecaca",
                      padding: "5px 10px",
                      borderRadius: 5,
                    }}
                  >
                    <Trash
                      color="#b91c1c"
                      size={18}
                      style={{ marginRight: 5 }}
                    />
                    Delete
                  </span>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Accordian;
