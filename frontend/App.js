import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Splash from "./apps/screens/Splash";
import Mains from "./apps/screens/Mains";
import DetailCourse from "./apps/screens/moduls/courses/DetailCourse";
import FreeCourse from "./apps/screens/moduls/courses/FreeCourse";
import Cart from "./apps/screens/moduls/accounts/Cart";
import AddCourse from "./apps/screens/moduls/courses/AddCourse";
import ManageCourse from "./apps/screens/moduls/courses/ManageCourse";
import MyCourse from "./apps/screens/moduls/courses/MyCourse";
import UpdateCourse from "./apps/screens/moduls/courses/UpdateCourse";
import OpenCourse from "./apps/screens/moduls/courses/OpenCourse";
import ManageTransactions from "./apps/screens/moduls/accounts/ManageTransactions";
import Payment from "./apps/screens/moduls/accounts/Payment";
import PaymentAll from "./apps/screens/moduls/accounts/PaymentsAll";
import PurchaseHistory from "./apps/screens/moduls/accounts/PurchaseHistory";
import UpdateAccount from "./apps/screens/moduls/accounts/UpdateAccount";
import SignIn from "./apps/screens/moduls/SignIn";
import SignUp from "./apps/screens/moduls/accounts/SignUp";
import Feature from "./apps/screens/Feature";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Mains" component={Mains} />
        <Stack.Screen name="DetailCourse" component={DetailCourse} />
        <Stack.Screen name="FreeCourse" component={FreeCourse} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="AddCourse" component={AddCourse} />
        <Stack.Screen name="ManageCourse" component={ManageCourse} />
        <Stack.Screen name="MyCourse" component={MyCourse} />
        <Stack.Screen name="UpdateCourse" component={UpdateCourse} />
        <Stack.Screen
          name="ManageTransactions"
          component={ManageTransactions}
        />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="PaymentAll" component={PaymentAll} />
        <Stack.Screen name="PurchaseHistory" component={PurchaseHistory} />
        <Stack.Screen name="UpdateAccount" component={UpdateAccount} />
        <Stack.Screen name="OpenCourse" component={OpenCourse} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Feature" component={Feature} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
