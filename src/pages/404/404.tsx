import { useNavigate } from "react-router-dom";
import Error from "../../components/error/Error";

import "./pageNotFound.scss";

const PageNotFound = () => {
  const navigate = useNavigate(); // for getting to the previous page
  return (
    <div className="page-not-found">
      <Error />
      <h1>This page was not found</h1>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default PageNotFound;
