import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Splash from "./app/screens/splash";
import Mains from "./app/screens/mains";
import Login from "./app/screens/moduls/login/login";
import CourseDetail from "./app/screens/moduls/course/detailCourse";
import CartCourse from "./app/screens/moduls/course/cartCourse";
import UpdateAccount from "./app/screens/moduls/account/updateAccount";
import FreeCourse from "./app/screens/moduls/course/freeCourse";
import Payment from "./app/screens/moduls/user/paymentCourse";
import MainAdmin from "./app/screens/mainAdmin";
import MainUser from "./app/screens/mainUser";
import AddCourse from "./app/screens/moduls/admin/addCourse";
import MyCourse from "./app/screens/moduls/course/myCourse";
import UpdatePassword from "./app/screens/moduls/account/updatePassword";
import HistoryPayment from "./app/screens/moduls/user/historyPayment";
import ManageCourse from "./app/screens/moduls/admin/manageCourse";
import AccountUser from "./app/screens/moduls/user/accountUser";
import AccountAdmin from "./app/screens/moduls/admin/accountAdmin";
import UpdateCourse from "./app/screens/moduls/admin/updateCourse";
import ListCourse from "./app/screens/moduls/course/listCourse";
import Transaksi from "./app/screens/moduls/admin/transaksi";
import PaymentCart from "./app/screens/moduls/user/paymentCart";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Mains" component={Mains} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CourseDetail" component={CourseDetail} />
        <Stack.Screen name="CartCourse" component={CartCourse} />
        <Stack.Screen name="UpdateAccount" component={UpdateAccount} />
        <Stack.Screen name="FreeCourse" component={FreeCourse} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="MainAdmin" component={MainAdmin} />
        <Stack.Screen name="MainUser" component={MainUser} />
        <Stack.Screen name="AddCourse" component={AddCourse} />
        <Stack.Screen name="MyCourse" component={MyCourse} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        <Stack.Screen name="HistoryPayment" component={HistoryPayment} />
        <Stack.Screen name="ManageCourse" component={ManageCourse} />
        <Stack.Screen name="AccountUser" component={AccountUser} />
        <Stack.Screen name="AccountAdmin" component={AccountAdmin} />
        <Stack.Screen name="UpdateCourse" component={UpdateCourse} />
        <Stack.Screen name="ListCourse" component={ListCourse} />
        <Stack.Screen name="Transaksi" component={Transaksi} />
        <Stack.Screen name="PaymentCart" component={PaymentCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
