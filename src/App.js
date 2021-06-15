import React, { useEffect, useState, useRef } from 'react';
import './app.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from "./pages/home";
import ShowcaseItemPage from "./pages/showcaseItemPage";


function Navigation() {
  return(
    <BrowserRouter>
      <Route path="/" exact>
        <Home/>
      </Route>
      <Route path="/showcase/:id">
        <ShowcaseItemPage/>
      </Route>
      <Route path="/admin" component={() => { 
        window.location.href = 'http://localhost:1337/admin/'; 
        return null;
      }}>
      </Route>
    </BrowserRouter>
  )
}


export default Navigation;
