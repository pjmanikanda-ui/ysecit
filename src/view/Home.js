import Shop from "./Shop";
import jsonData from "../data.json";

const Home = () => {
  return (
    <>
      <Shop categories={jsonData.categories} />
    </>
  );
};
export default Home;
