import styled from "styled-components";
import media from "styled-media-query";

import TextField from "./TextField";
import Loader from "./Loader";

const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 160px;
  grid-column-gap: 8px;
  grid-row-gap: 8px;

  ${media.greaterThan("medium")`
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 240px;
  `};

  ${media.greaterThan("large")`
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  `};
`;

const GifPreview = styled.div`
  display: flex;
  align-items: center;

  > video {
    border: ${props =>
      `3px solid ${props.selected ? "rgb(46, 204, 113)" : "transparent"}`};
    border-radius: ${props => props.theme.borderRadius.small};
    width: 100%;
    max-height: 100%;
  }
`;

const StyledLoader = styled(Loader)`
  margin: ${props => props.theme.spacing.medium} auto;
`;

const GifForm = ({
  onSearch,
  searchQuery,
  onSearchChange,
  onClickGif,
  onConfirmClickGif,
  gifs,
  loading,
  ...props
}) => (
  <div {...props}>
    <form
      onSubmit={event => {
        event.preventDefault();
        onSearch();
      }}
    >
      <TextField
        name="Search GIF"
        required
        value={searchQuery}
        onChange={event => onSearchChange(event.target.value)}
      />
    </form>
    {loading ? (
      <StyledLoader />
    ) : (
      <ResultWrapper>
        {gifs.map((gif, index) => (
          <GifPreview
            key={index}
            selected={gif.selected}
            onClick={() =>
              gif.selected ? onConfirmClickGif(gif) : onClickGif(gif)
            }
          >
            <video autoPlay loop>
              <source src={gif.preview.url} type="video/mp4" />
            </video>
          </GifPreview>
        ))}
      </ResultWrapper>
    )}
  </div>
);

const StyledGifForm = styled(GifForm)`
  ${TextField} {
    margin-bottom: ${props => props.theme.spacing.medium};
  }
`;

export default StyledGifForm;
