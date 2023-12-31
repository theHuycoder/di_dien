import { Navbar } from "@/components/Navbar";
import Header from "@/pages/Home/Header.tsx";
import Intro from "@/pages/Home/Intro.tsx";
import React, { useEffect, useState } from "react";
import Arts from "@/pages/Home/Arts.tsx";
import Artist from "@/pages/Home/Artist.tsx";
import styles from "./Home.module.css";
import Footer from "@/pages/Home/Footer.tsx";
import Contact from "@/pages/Home/Contact.tsx";
import MyThreeJSComponent from "@/pages/Home/Cubes.tsx";
import ScrolledButton from "@/components/ScrolledButton";
import ReactModal from "react-modal";
import TicketForm from "@/pages/Home/TicketForm.tsx";
import { Title } from "@/components/Title";
import Logo1 from "/home/logo-1.png";
import Logo2 from "/home/logo-2.png";
import Logo3 from "/home/logo-3.png";
import Logo4 from "/home/logo-4.png";
import Logo5 from "/home/logo-5.png";
import Logo6 from "/home/logo-6.png";

ReactModal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 0,
  },
  overlay: {
    backgroundColor: "rgba(8, 8, 8, 0.80)",
  },
};

const Logo = ({ logo }: any) => {
  return (
    <div className="flex items-center justify-center py-4 px-8 bg-[#191919] w-[240px] h-[72px]">
      <img src={logo} alt="" />
    </div>
  );
};

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onToggleModal = (show: boolean) => setShowModal(show);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="relative">
      <div className="h-screen absolute top-0 left-0 right-0">
        <MyThreeJSComponent />
      </div>
      <nav
        className={`border-b-neutral-500 border-b fixed top-0 left-0 right-0 ${
          isScrolled ? "bg-black z-50" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto">
          <Navbar />
        </nav>
      </nav>
      <header className="min-h-screen border-b border-neutral-500">
        <Header />
      </header>
      <Intro />
      <section className="mb-[100px] mt-[-500px]">
        <Arts />
      </section>
      <section className="relative mb-[50px]">
        <Artist />
      </section>
      <section className="pb-24">
        <div className="container mx-auto mb-[32px]">
          <Title>Đơn vị tài trợ</Title>
        </div>
        <div className="container mx-auto flex items-center gap-12 h-[64px]">
          <Logo logo={Logo1} />
          <Logo logo={Logo3} />
          <Logo logo={Logo5} />
          <Logo logo={Logo4} />
          <Logo logo={Logo6} />
        </div>
      </section>
      <section className={styles.contact}>
        <Contact onClick={() => onToggleModal(true)} />
      </section>
      <footer>
        <Footer />
      </footer>
      <div className="fixed bottom-[3rem] right-[3rem] z-20">
        <ScrolledButton click={() => onToggleModal(true)} />
      </div>
      <ReactModal
        style={customStyles}
        shouldCloseOnEsc={true}
        onRequestClose={() => onToggleModal(false)}
        isOpen={showModal}
      >
        <TicketForm onPay={() => setShowModal(false)} />
      </ReactModal>
    </div>
  );
};

export default Home;
