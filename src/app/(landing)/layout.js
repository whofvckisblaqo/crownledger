import Navbar from "@/components/Navbar";

export default function LandingLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}