import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Station from './components/Station';
import { StationContextProvider } from './components/StationContextProvider';
import Stations from './components/Stations';
import UserPrompt from './components/UserPrompt';

const App = () => (
    <BrowserRouter>
        <link rel = "stylesheet"
            href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"/>
        <div className = "App">
            <h1>Trainboard <span className = "material-symbols-outlined"> train </span></h1>
            <h2>Search for tickets</h2>
            <div className = "cardBackground">
                <StationContextProvider>
                    <UserPrompt/>
                </StationContextProvider>
            </div>
            <Routes>
                <Route path = "/stations">
                    <Route path = ":id" element = { <Station/> }/>

                    <Route index element = { <Stations/> }/>
                </Route>
            </Routes>
            <footer>
                <Link to = "/stations">Stations</Link>
            </footer>
        </div>
    </BrowserRouter>
);

export default App;
