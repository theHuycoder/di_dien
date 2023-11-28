import { Navbar } from "@/components/Navbar";
import Header from "@/pages/Home/Header.tsx";
import Intro from "@/pages/Home/Intro.tsx";
import { useEffect, useState } from "react";
import Arts from "@/pages/Home/Arts.tsx";
import Artist from "@/pages/Home/Artist.tsx";
import styles from "./Home.module.css";
import Footer from "@/pages/Home/Footer.tsx";
import Contact from "@/pages/Home/Contact.tsx";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <>
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
      <section className="pt-[76px] mb-[156px]">
        <Intro />
      </section>
      <section className="mb-[100px]">
        <Arts />
      </section>
      <section className="relative mb-[100px]">
        <Artist />
      </section>
      <section className={styles.contact}>
        <Contact />
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
