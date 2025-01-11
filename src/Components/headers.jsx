import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const Header = ({ text, sideComponent, isBack }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: 15,
        backgroundColor: "#2563eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position:'sticky',
        width: '100vw',
        top:0
      }}
    >
      <div style={{ display: "flex", alignItems:'center' }}>
        {isBack && (
          <ChevronLeft
          style={{marginRight: 10}}
            onClick={() => {
              navigate(-1);
            }}
          />
        )}
        <h2 style={{ fontWeight: "500", fontSize: 24, color: "#fff" }}>
          {text}
        </h2>
      </div>
      {sideComponent}
    </div>
  );
};

export default Header;
