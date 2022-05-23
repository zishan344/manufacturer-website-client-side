import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "./Loading";

const RequarAuth = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  //   if (!user) {
  //     return <Navigate to="/login" state={{ from: location }} replace />;
  //   }
  //   return children;
  //   const [user, loading] = useAuthState(auth);
  //   const location = useLocation();
  //   if (loading) {
  //     return <Loading />;
  //   }
  return children;
};

export default RequarAuth;
