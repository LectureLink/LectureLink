import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

// Screens
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Error from "../screens/Error";
import StudentClasses from "../screens/StudentClasses";
import Prompt from "../screens/Prompt";

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="StudentClasses" component={StudentClasses} />
        <Stack.Screen name="Prompt" component={Prompt} />
        <Stack.Screen name="UnauthorizationError" component={Error} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
