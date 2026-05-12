import React from "react";

const ContentArea = () => {
  return (
    <div   
      className="flex flex-col items-center justify-start flex-1 p-6"
      style={{ backgroundColor: "#f4e1d2", height: "100vh", paddingTop: "10rem" }}
    >
      <h2 className="text-5xl font-bold text-gray-800 text-center mb-6">
        Bem-vindo ao seu espaço de trabalho!
      </h2>
      <p className="text-2xl text-gray-700 mb-4 text-center">
      Como posso ajudar você hoje? Aqui você pode acessar ferramentas, gerenciar acervos e acompanhar as atividades da biblioteca. Se precisar de alguma assistência ou informações, estou à disposição para facilitar o seu dia a dia.
      </p>
    </div>
  );
};

export default ContentArea;
