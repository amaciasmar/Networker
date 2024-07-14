import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <header className="home-header">
                <div className="search-container">
                    <input type="text" placeholder="Search" className="search-bar" />
                    <button className="sign-in">Sign In</button>
                    <button className="sign-up">Sign Up</button>
                </div>
                <nav className="home-menu">
                    <button className="menu-button">Explore Individuals</button>
                    <button className="menu-button">Explore Groups</button>
                    <button className="menu-button">Explore Topics</button>
                </nav>
            </header>
            <section className="intro-section">
                <h1>Make connections that matter.</h1>
                <p>As a mentor, mentee, or just looking to expand your network, NetWorker helps you connect with people and groups of similar interests!</p>
            </section>
            <section className="card-section">
                <div className="card">
                    <img src="path/to/Grace-Aguilar.png" alt="Grace Aguilar" />
                    <h2>Grace Aguilar</h2>
                    <p>Graphic Designer</p>
                    <p>Brooklyn, NY</p>
                    <button className="learn-more">Learn More</button>
                </div>
                <div className="card">
                    <img src="path/to/Mike-Crewe.png" alt="Mike Crewe" />
                    <h2>Mike Crewe</h2>
                    <p>Junior Software Engineer</p>
                    <p>San Francisco, CA</p>
                    <button className="learn-more">Learn More</button>
                </div>
                <div className="card">
                    <img src="path/to/Wang-Liuli.png" alt="Wang Liuli" />
                    <h2>Wang Liuli</h2>
                    <p>Creative Consultant</p>
                    <p>Los Angeles, CA</p>
                    <button className="learn-more">Learn More</button>
                </div>
                {/* Add more cards as needed */}
            </section>
        </div>
    );
};

export default Home;