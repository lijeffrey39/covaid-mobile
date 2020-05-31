import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import TabBarIcon from "./components/TabBarIcon.js";
import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { homeURL, storage_keys } from "./constants";

import LoginScreen from "./screens/LoginScreen/LoginScreen.js";
import EditProfileScreen from "./screens/EditProfileScreen/EditProfileScreen.js";
import RequestsScreen from "./screens/RequestsScreen/RequestsScreen.js";

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [auth, setAuth] = useState(false);
  const [userID, setUserID] = useState();

  /**
   * Only runs if auth changes
   * Currently the token is commented out but will be needed in the RequestsScreen
   */
  useEffect(() => {
    console.log("ran");
    AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => {
      console.log("GETTING USER ID " + data);
      setUserID(data);
    });

    // AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
    //   console.log("GETTING TOKEN " + data)
    //   fetchRequests(volunteer_status.PENDING, setPendingRequests, data);
    //   fetchRequests(volunteer_status.IN_PROGRESS, setActiveRequests, data);
    //   fetchRequests(volunteer_status.COMPLETE, setCompletedRequests, data);
    // });
  }, [auth]);

  if (!isLoadingComplete) {
    return null;
  } else if (auth) {
    return (
      <View style={styles.container}>
        <LoginScreen setAppAuth={setAuth} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen
              name="Covaid"
              component={BottomTabNavigator}
              initialParams={{ userID: userID }}
              options={{
                headerRight: () => (
                  <TouchableOpacity
                    style={{ margin: 10 }}
                    onPress={() => alert("This is will trigger settings")}
                  >
                    <TabBarIcon name="md-settings" />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
