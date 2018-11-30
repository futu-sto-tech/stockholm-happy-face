import styled from "styled-components";
import media from "styled-media-query";

import Button from "./Button";

const NameLabel = styled.h3``;

const WeekLabel = styled.div`
  > .dates {
    display: none;
    font-size: 14px;
  }

  &:hover {
    > .dates {
      display: block;
    }

    > .week {
      display: none;
    }
  }
`;

const Header = styled.div`
  padding: ${props => props.theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: ${props =>
    `0 0 ${props.theme.borderRadius.small} ${props.theme.borderRadius.small}`};
  overflow: hidden;

  > video {
    max-width: 100%;
    height: auto;
  }
`;

const TextContent = styled.p`
  text-align: center;
  font-size: 80px;
  padding: ${props => props.theme.spacing.large};

  ${media.greaterThan("medium")`
    font-size: 100px;
  `};
`;
const LinkContent = styled.img``;
const VideoContent = ({ src }) => (
  <video autoPlay loop>
    <source src={src} type="video/mp4" />
  </video>
);

const SmileyCard = styled.div`
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const SmileyCardWrapper = ({ className, entry, onDelete, loading }) => {
  const weekStart = entry.createdAt.startOf("isoWeek").format("YYYY-MM-DD");
  const weekEnd = entry.createdAt.endOf("isoWeek").format("YYYY-MM-DD");

  return (
    <SmileyCard className={className}>
      <Header>
        <NameLabel>{entry.user.name}</NameLabel>
        <WeekLabel>
          <div className="week">Week {entry.week}</div>
          <div className="dates">
            {weekStart} - {weekEnd}
          </div>
        </WeekLabel>
      </Header>

      <Content>
        {entry.text ? (
          <TextContent>{entry.text}</TextContent>
        ) : entry.link.endsWith("mp4") ? (
          <VideoContent src={entry.link} />
        ) : (
          <LinkContent src={entry.link} />
        )}
      </Content>

      {onDelete && (
        <div className="delete-button">
          <Button shadow onClick={onDelete} loading={loading}>
            Delete
          </Button>
        </div>
      )}
    </SmileyCard>
  );
};

const StyledSmileyCardWrapper = styled(SmileyCardWrapper)`
  position: relative;

  .delete-button {
    display: none;

    position: absolute;
    bottom: ${props => props.theme.spacing.small};
    left: ${props => props.theme.spacing.small};
    right: ${props => props.theme.spacing.small};
    margin-left: auto;
    margin-right: auto;
    max-width: 320px;
  }

  &:hover {
    .delete-button {
      display: block;
    }
  }
`;

export default StyledSmileyCardWrapper;
