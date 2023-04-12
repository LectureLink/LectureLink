import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

// Screens
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import UserClasses from "../screens/UserClasses";
import ClassSettings from "../screens/ClassSettings";
import DeviceView from "../screens/DeviceView";
import Error from "../screens/Error";

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="UserClasses" component={UserClasses} />
        <Stack.Screen name="ClassSettings" component={ClassSettings} />
        <Stack.Screen name="DeviceView" component={DeviceView} />
        <Stack.Screen name="UnauthorizationError" component={Error} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
