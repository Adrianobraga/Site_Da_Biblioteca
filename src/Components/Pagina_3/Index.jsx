import React, { useState } from "react";
import Header from "../Home/Header";
import Sidebar from "../Home/SideBar";
import Rentals from "./Rentals";
import Modal from "./Modal";

const Alugueis = () => {
  const [modal, setModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  const openModal = (rental) => {
    setSelectedRental(rental);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedRental(null);
    setModal(false);
  };

  return (
    <>
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex h-screen">
          <Sidebar />
          <main
            className="flex-1 bg-gray-50 p-4 overflow-y-auto"
            style={{ backgroundColor: "#f4e1d2" }}
          >
            <Rentals OpenModal={openModal} />
          </main>
        </div>
      </div>

      <Modal
        showModal={modal}
        closeModal={closeModal}
        rental={selectedRental}
      />
    </>
  );
};

export default Alugueis;
