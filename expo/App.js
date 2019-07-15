import React from "react";
import { Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import WelcomeScreen from "./screens/welcome";
import LoginScreen from "./screens/login";
import ProfileScreen from "./screens/profile";
import NewEntryScreen from "./screens/new-entry";
import EntryScreen from "./screens/entry";
import ConfirmEntryScreen from "./screens/confirm-entry";

const AuthenticatedNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam("user", {}).name,
        headerBackTitle: "Profile",
        headerRight: (
          <Button
            onPress={() => navigation.navigate("Welcome")}
            title="Logout"
            color="rgba(255, 255, 255, 0.87)"
          />
        )
      })
    },
    Entry: {
      screen: EntryScreen,
      navigationOptions: ({ navigation }) => ({
        title: `Week ${navigation.getParam("entry").week}`
      })
    },
    NewEntry: {
      screen: NewEntryScreen,
      navigationOptions: {
        title: "How's your week?"
      }
    },
    ConfirmEntry: {
      screen: ConfirmEntryScreen
    }
  },
  {
    initialRouteName: "Profile",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#202020",
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      headerTitleStyle: {
        color: "rgba(255, 255, 255, 0.87)",
        fontSize: 20
      }
    }
  }
);

const MainNavigator = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen
    },
    Authenticated: {
      screen: AuthenticatedNavigator,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    initialRouteName: "Welcome",
    headerMode: "none",
    mode: "modal"
  }
);

const App = createAppContainer(MainNavigator);

export default App;
