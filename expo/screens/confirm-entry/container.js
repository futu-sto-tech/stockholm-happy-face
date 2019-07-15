import React, { useState } from "react";

import backend from "../../lib/backend";
import ConfirmEntryScreen from "./screen";

const ConfirmEntryContainer = ({ navigation }) => {
  const [isSaving, setIsSaving] = useState(false);
  const image = navigation.getParam("image");

  async function handlePressSave() {
    setIsSaving(true);
    const user = navigation.getParam("user");
    const { id: giphyId, ...imageData } = image;
    const newEntry = await backend.saveEntry(user, {
      giphyId,
      ...imageData.original
    });

    if (newEntry) {
      navigation.navigate("Profile");
    } else {
      console.warning("entry not saved!");
    }

    setIsSaving(false);
  }

  return (
    <ConfirmEntryScreen
      image={image}
      onPressSave={handlePressSave}
      isSaving={isSaving}
    />
  );
};

export default ConfirmEntryContainer;
