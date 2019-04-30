import styled from "styled-components/macro";

const MessageList = styled.section.attrs({ className: "message-list" })`
  display: flex;
  flex-direction: column;

  max-width: 768px;
  margin: 0 auto;
`;

MessageList.Heading = styled.h2`
  margin-top: 72px;
  margin-bottom: 24px;
  text-align: center;
`;

MessageList.Message = styled.section.attrs({ className: "message" })`
  &.-right {
    align-self: flex-end;
  }

  &.-left {
    align-self: flex-start;
  }
`;

MessageList.Balloon = styled.div.attrs({ className: "nes-balloon" })`
  color: #000;
`;

MessageList.Title = styled.p`
  color: #000;
`;

MessageList.Image = styled.img``;

export default MessageList;
