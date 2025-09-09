import Image from "next/image";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      < Footer />
      {/* <main className="pt-16 px-4">
        <h1 className="text-3xl font-semibold">Welcome to MyApp</h1>
      </main> */}
    </>
  );
}
