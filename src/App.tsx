import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Station from './components/Station';
import { StationContextProvider } from './components/StationContextProvider';
import StationsPage from './components/StationsPage';
import UserPrompt from './components/UserPrompt';

const App = () => (
    <BrowserRouter>
        <div className = "App">
            <Routes>
                <Route index element = { <UserPrompt/> }/>
                <Route path = "/stations">
                    <Route path = ":id" element = { <Station/> }/>
       
                    <Route index element = { <StationsPage/> }/>
                </Route>
            </Routes>
            <footer>
                <Link to = "/">Home</Link>
                <div></div>
                <Link to = "/stations">Stations</Link>
            </footer>
        </div>
    </BrowserRouter>
);

export default App;

//<StationContextProvider></StationContextProvider>