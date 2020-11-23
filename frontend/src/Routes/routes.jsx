import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../Components/LoginPage";
import RegisterPage from "../Components/RegisterPage";
import MainPage from "../Components/MainPage";
import TeacherPage from "../Components/TeacherPage";
import ErrorPage from "../Components/ErrorPage";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact render={(props) => <LoginPage {...props} />} />
      <Route path="/login" exact render={(props) => <LoginPage {...props} />} />
      <Route path="/register" exact render={() => <RegisterPage />} />
      <Route
        path="/mainPage"
        exact
        render={(props) => <MainPage {...props} />}
      />
      <Route
        path="/teacherPage/:id"
        exact
        render={(props) => <TeacherPage {...props} />}
      />
      <Route path="/" component={ErrorPage} />
    </Switch>
  );
}
