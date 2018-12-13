import React from "react";

import withAuth from "../src/containers/withAuth";
import StyledPresentPage from "../src/components/PresentPage";

const PresentPage = () => <StyledPresentPage />;

export default withAuth(PresentPage);
