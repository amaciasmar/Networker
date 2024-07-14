import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/HomePage';
import Profile from './pages/Profile';
import ExploreIndividuals from './pages/ExploreIndividuals';
import ExploreGroups from './pages/ExploreGroups';
import DiscussionTopics from './pages/DiscussionTopics';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/explore-individuals" element={<ExploreIndividuals />} />
                        <Route path="/explore-groups" element={<ExploreGroups />} />
                        <Route path="/discussion-topics" element={<DiscussionTopics />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;