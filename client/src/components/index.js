import Welcome from "./Welcome";
import Navbar from "./Navbar";
import Loader from "./Loader";
import Services from "./Services";

const index = () => {
  return (
    <>
      <Welcome />
      <Navbar />
      <Loader />
      <Services />
    </>
  );
};

export default index;
