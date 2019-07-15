import React, { useContext } from "react";

import Context from "../../context/Context";
import User from "./styled/User";

const UserContainer = () => {
  let { state } = useContext(Context);

  return (
    <User>
      <User.Badge>
        <User.BadgeName>{state.user.name}</User.BadgeName>
      </User.Badge>
    </User>
  );
};

export default UserContainer;
