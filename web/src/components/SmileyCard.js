import styled from "styled-components";

const NameLabel = styled.h3``;

const Header = styled.div`
  padding: ${props => props.theme.spacing.medium};
  border-bottom: 2px solid ${props => props.theme.colors.background};
`;

const Content = styled.div`
  padding: ${props => props.theme.spacing.large};
  font-size: 100px;
  text-align: center;
`;

const TextContent = styled.p``;
const LinkContent = styled.img``;

const SmileyCard = styled.div`
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const SmileyCardWrapper = ({ className, response }) => {
  const weekStart = response.createdAt.startOf("isoWeek").format("YYYY-MM-DD");
  const weekEnd = response.createdAt.endOf("isoWeek").format("YYYY-MM-DD");

  return (
    <SmileyCard className={className}>
      <Header>
        <NameLabel>
          {response.user.name}, week {response.week} ({weekStart} - {weekEnd})
        </NameLabel>
      </Header>

      <Content>
        {response.text ? (
          <TextContent>{response.text}</TextContent>
        ) : (
          <LinkContent src={response.link} />
        )}
      </Content>
    </SmileyCard>
  );
};

export default SmileyCardWrapper;
