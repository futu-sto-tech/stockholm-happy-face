import React from "react";
import { connect } from "react-redux";

import { searchGifs, selectGif, saveEntry } from "../redux/actionCreators";
import GifForm from "../components/GifForm";

class GifFormContainer extends React.Component {
  state = { searchQuery: "" };

  render() {
    return (
      <GifForm
        onSearch={() => this.props.searchGifs(this.state.searchQuery)}
        searchQuery={this.state.searchQuery}
        onSearchChange={newValue => this.setState({ searchQuery: newValue })}
        onClickGif={this.props.selectGif}
        onConfirmClickGif={gif => this.props.saveEntry(gif.original.url)}
        gifs={this.props.gifs}
        loading={this.props.isLoading}
      />
    );
  }
}

const mapStateToProps = ({ isSearchingGifs, gifs, isLoadingNewEntry }) => ({
  isLoading: isSearchingGifs || isLoadingNewEntry,
  gifs
});

const mapDispatchToProps = { searchGifs, selectGif, saveEntry };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GifFormContainer);
