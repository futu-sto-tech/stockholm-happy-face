import React from "react";
import { connect } from "react-redux";

import {
  toggleEmojiSelection,
  randomizeEmojiSelection,
  saveEntry
} from "../redux/actionCreators";
import EmojiForm from "../components/EmojiForm";

const EmojiFormContainer = props => (
  <EmojiForm
    emojis={props.emojis}
    onClickEmoji={props.toggleEmojiSelection}
    onSave={async () => {
      const selectedEmoji = props.emojis.filter(emoji => emoji.selected);
      await props.saveEntry(selectedEmoji.map(emoji => emoji.value).join(" "));
      await props.randomizeEmojiSelection();
    }}
  />
);

const mapStateToProps = ({ emojis }) => ({ emojis });

const mapDispatchToProps = {
  toggleEmojiSelection,
  randomizeEmojiSelection,
  saveEntry
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmojiFormContainer);
