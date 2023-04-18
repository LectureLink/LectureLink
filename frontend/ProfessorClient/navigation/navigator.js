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
        <Stack.Screen name="Classes" component={UserClasses} />
        <Stack.Screen name="Class Settings" component={ClassSettings} />
        <Stack.Screen name="Device View" component={DeviceView} />
        <Stack.Screen name="UnauthorizationError" component={Error} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
