import React from 'react';
import './Header.css';
import logo from '../assets/B75B30.png'; // Assuming this is the logo
import searchIcon from '../assets/magnifying-glass-circle--circle-glass-search-magnifying.png';
import userIcon from '../assets/user-circle-single--circle-geometric-human-person-single-user.png';
import calendarIcon from '../assets/blank-calendar--blank-calendar-date-day-month-empty.png';
import logoutIcon from '../assets/Logout.png';
import exploreIndividuals from '../assets/Explore Individuals.png';
import exploreGroups from '../assets/Explore Groups.png';
import discussionTopics from '../assets/Discussion Topics.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <img src={logo} alt="NETWorker" className="logo" />
                <nav className="main-menu">
                    <a href="#">
                        <img src={exploreIndividuals} alt="Explore Individuals" className="menu-item" />
                    </a>
                    <a href="#">
                        <img src={exploreGroups} alt="Explore Groups" className="menu-item" />
                    </a>
                    <a href="#">
                        <img src={discussionTopics} alt="Discussion Topics" className="menu-item" />
                    </a>
                </nav>
            </div>
            <div className="header-right">
                <div className="search-container">
                    <input type="text" placeholder="Search" className="search-bar" />
                    <img src={searchIcon} alt="Search" className="search-icon" />
                </div>
                <a href="#"><img src={logoutIcon} alt="Logout" className="icon" /></a>
                <a href="#"><img src={calendarIcon} alt="Calendar" className="icon" /></a>
                <a href="#"><img src={userIcon} alt="User" className="icon" /></a>
            </div>
        </header>
    );
};

export default Header;
