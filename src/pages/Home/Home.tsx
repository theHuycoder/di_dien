import { Navbar } from "@/components/Navbar";
import Header from "@/pages/Home/Header.tsx";

const Home = () => {
  return (
    <>
      <nav className="border-b-neutral-500 border-b fixed top-0 left-0 right-0">
        <nav className="container mx-auto">
          <Navbar />
        </nav>
      </nav>
      <header className="min-h-[815px] max-h-[815px] pt-[140px]">
        <div className="">
          <Header />
        </div>
      </header>
    </>
  );
};

export default Home;
