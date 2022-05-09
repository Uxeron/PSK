import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { t } from "../text";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80" onClick={() => logout({ returnTo: window.location.origin })}>
      {t.common.logOut}
    </button>
  );
};

export default LogoutButton;