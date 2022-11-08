import { useEffect } from "react";

const useClickOutside = (myRef , handler) => {
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  });

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      handler(false)
    } 
  };
  return handleClickOutside;
};

export default useClickOutside;
