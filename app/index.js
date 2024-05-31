import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Login from "./login";
import DrawerMenu from '../components/DrawMenu';
import MapScreen from "./map";
import PrivacyPolicyScreen from "./policy";
import CreditsScreen from "./credits";
import AdminHomeScreen from "./adminhome";
import GestionClasesScreen from "./gestionaclasses";
import Register from "./register";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Classes") {
            iconName = "calendar-outline";
          } else if (route.name === "More") {
            iconName = "ellipsis-horizontal-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={AdminHomeScreen} />
      <Tab.Screen name="Classes" component={GestionClasesScreen} />
      <Tab.Screen name="More" component={DrawerMenu} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Map" 
          component={MapScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PrivacyPolicy" 
          component={PrivacyPolicyScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Credits" 
          component={CreditsScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    
  );
}
