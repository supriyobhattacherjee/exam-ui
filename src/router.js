import { createRouter, createWebHistory } from "vue-router";

import Login from "./components/Login/Login.vue";
import UserInfo from "./components/User/UserInfo.vue";
import UserRegister from "./components/User/UserRegistration.vue";
import UsersList from "./components/User/UsersList.vue";
import TestList from "./components/TestPapers/TestList.vue";
import TestView from "./components/TestPapers/TestView.vue";
import TheHeader from "./components/Layout/TheHeader.vue";
import TheUserHeader from "./components/Layout/TheUserHeader.vue";

import QuestionList from "./components/TestPapers/QuestionList.vue";
import QuestionView from "./components/TestPapers/QuestionDetail.vue";
import TestSubject from './components/TestPapers/TestSubjects.vue';
import MCQView from "./components/UserTest/McqView.vue";
// import TestHeader from "./components/Layout/TheTestHeader.vue";
import UserTestDashboard from "./components/UserTest/UserTestDashboard.vue";
import QuestionSection from './components/TestPapers/QuestionSection.vue'

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: "/", components: { default: Login, header: TheHeader } },
    {
      path: "/login",
      components: { default: Login, header: TheHeader },
      name: "login",
    },
    {
      path: "/createuser",
      components: { default: UserRegister, header: TheHeader },
    },
    {
      path: "/users",
      components: { default: UsersList, header: TheUserHeader },
      name: "userslist",
    },
    { path: "/users/:userid", component: UserInfo },
    {
      path: "/test",
      components: { default: TestView, header: TheUserHeader },
      children: [
        { path: "all/:sid?", component: TestList, name: "testlink" },
        { path: ":testId", component: QuestionList, name: "questionsbyid" },
        { path: "questions", component: QuestionList, name: "questionslist" },
        {
          path: "questionview/:qId?",
          component: QuestionView,
          name: "questionview",
        },
        {path: "alltopics", component: TestSubject, name:"allsubjects"},
        {path: "qsection", component: QuestionSection , name:"questionsections"},
      ],
    },
    { path: "/student", components: { default: UserTestDashboard, header: TheUserHeader}, name: "usertest" },
    { path: "/student/starttest/:tid?", components: { default: MCQView, header: TheUserHeader}, name: "testbegin" },
  ],
});

export default router;
