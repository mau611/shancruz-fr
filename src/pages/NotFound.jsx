import React from "react";
import NavBar from "../Components/estructura/NavBar";

const NotFound = () => {
  return (
    <NavBar>
      <div className="text-center">
        <img
          alt="Imagen de pagina no encontrada"
          width={"100%"}
          src="https://i.ytimg.com/vi/KSA7t6qgImY/maxresdefault.jpg"
        />
      </div>
    </NavBar>
  );
};

export default NotFound;
