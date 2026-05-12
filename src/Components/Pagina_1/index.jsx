import React, { useState } from 'react';
import Header from './Header';
import Sidebar from '../Home/SideBar';
import BookGrid from './BookGrid';
import ContextoProvider from './Contexto';
import Botao from './Botao';
import AddBookModal from './Modal';
import AluguelModal from './ModalAluguel';
function Index() {
  const [showModal, setShowModal] = useState(false);
  const [showModalAluguel, setShowModalAluguel] = useState(false);
  const [bookTitleToRent, setBookTitleToRent] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModalAluguel = (bookTitle) => {
    setBookTitleToRent(bookTitle);  
    setShowModalAluguel(true);
    
  };

  const closeModalAluguel = () => {
    setShowModalAluguel(false);
    setBookTitleToRent(""); 
  };
  
  return (
    <ContextoProvider>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 bg-gray-50 p-4" style={{backgroundColor:"#f4e1d2"}}>
            <Botao openModal={openModal} />
            <BookGrid openModalAluguel={openModalAluguel} />
            <AddBookModal showModal={showModal} closeModal={closeModal} />
            <AluguelModal showModal={showModalAluguel} closeModal={closeModalAluguel} bookTitle={bookTitleToRent}/>
          </main>
        </div>
      </div>
    </ContextoProvider>
  );
}

export default Index;
