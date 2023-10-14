import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import { Main } from "./components/details/Main";
import { CardFooter } from "@chakra-ui/react";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/main" element={<Main/>} />
      </Routes>
    <Footer/>
    </Router>
  );
}

export default App;
