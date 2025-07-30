import React from "react";
import ScreenContainer from "../../components/screen-container";
import ButtomNavigation from "../../components/conversation/buttom_navigation";
import { StyleSheet, View } from "react-native";

import ConversationSettings from "../../components/conversation/conversation-settings";
import useMessangerNavigationStore from "../../stores/messanger-navigation-store";
import Conversations from "../../components/conversation/conversations";

const ConversationIndex = () => {
  const { screen, setScreen } = useMessangerNavigationStore();

  return (
    <ScreenContainer>
      <View style={styles.content}>
        {screen === "chat" ? <Conversations /> : <ConversationSettings />}
      </View>

      <ButtomNavigation setScreen={setScreen} />
    </ScreenContainer>
  );
};

export default ConversationIndex;
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 65,
  },
});
