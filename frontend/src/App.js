import React from 'react';
import './App.css';
import DataFetcher from './components/DataFetcher';
import ProfilePage from './components/ProfilePage';

function App() {
    return (
        <div className="App">
            <main>
                <ProfilePage />
                <DataFetcher />
            </main>
        </div>
    );
}

export default App;
