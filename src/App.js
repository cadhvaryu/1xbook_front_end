import React from "react";
import { Routes, Route } from "react-router-dom";
import { SingleNav, WithNav, WithoutFooter } from "./components";
import {
  NewsPage,
  SingleNews,
  Home,
  Signin,
  Register,
  ForgotPassword,
  Category,
  ShowAll,
  Profile,
  Search,
  Quiz,
  ThankYou,
  StaticPage,
  PageNotFound,
  ResetPassword,
  QuizAll,
} from "./screens";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact={"*"} path="*" element={<PageNotFound />} />
        <Route element={<WithNav />}>
          <Route exact={"/"} path="/" element={<Home />} />
          <Route path="/:category" element={<NewsPage category="Cricket" />} />

          {/* Category */}
          <Route path="/:category/series/:slug" element={<Category />} />

          {/* Static Pages */}
          <Route path="/page/:slug" element={<StaticPage />} />
          <Route path="/quiz" element={<QuizAll />} />
          <Route path="/quiz/:slug" element={<Quiz />} />
        </Route>

        <Route path="/:category/:id" element={<SingleNews />} />

        <Route element={<WithoutFooter />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route element={<SingleNav />}>
          <Route path="/all/:slug" element={<ShowAll />} />
          <Route path=":category/all/:slug" element={<ShowAll />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Route>
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </>
  );
};

export default App;
