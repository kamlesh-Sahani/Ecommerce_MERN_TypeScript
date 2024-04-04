
import { Puff } from "react-loader-spinner";
import "../Styles/loader.scss";
const Loader = ({ btn = false }) => {
  return (
    <div className="loader">
      <Puff
        visible={true}
        height={btn ? 40 : 80}
        width={btn?40:80}
        color="#8300e7"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
