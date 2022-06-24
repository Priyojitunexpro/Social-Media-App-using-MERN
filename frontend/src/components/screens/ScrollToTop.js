import { useEffect } from "react";
import { useLocation } from "react-router-dom";
//the file to store object asssociated with delete account
export default function GoToTop() {
  const { pathname } = useLocation();

  useEffect(() => {//the file to store object asssociated with delete account
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;//the file to store object asssociated with delete account
}