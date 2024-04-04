import { ReactElement } from "react";
import {Navigate} from 'react-router-dom'

interface PropsType{
    isAdmin?:boolean;
    isAuthentication:boolean;
    children?:ReactElement;
    redirect?:string;
}
const ProtectedRoutes = ({isAdmin,isAuthentication,children,redirect="/"}:PropsType) => {
  if(!isAuthentication){
    return <Navigate to={redirect}/>
  }
  return children;
}

export default ProtectedRoutes