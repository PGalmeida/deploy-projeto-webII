import React from "react";

const Footer = () => {
  return (
    <footer
      className="py-3 mt-5 text-center"
      style={{
        backgroundColor: "#3D3D3D",
        color: "white",
      }}
    >
      <p className="fw-bold m-0">
        VetHub-Medicina Veterinária Inteligente{" "}
        <span style={{ color: "#3CB3AB" }}>Todos os direitos reservados</span>
      </p>
    </footer>
  );
};

export default Footer;
