import styled from "styled-components";

import MainLayout from "./MainLayout";
import WeeklyEntriesContainer from "../containers/WeeklyEntries";

const PresentPage = ({ className }) => (
  <MainLayout className={className}>
    <WeeklyEntriesContainer />
  </MainLayout>
);

export default PresentPage;
