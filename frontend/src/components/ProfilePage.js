import React from 'react';
import ProfilePic from './ProfilePic';
import Summary from './Summary';
import Endorsements from './Endorsements';
import EmploymentHistory from './EmploymentHistory';
import Schedule from './Schedule';
import MessageButton from './MessageButton';

const ProfilePage = () => {
    const profileData = {
        profilePic: 'path/to/profile-pic.jpg', // Update with actual path
        summary: 'This is the summary of the profile.',
        endorsements: ['Endorsement 1', 'Endorsement 2'],
        employmentHistory: ['Job 1', 'Job 2']
    };

    return (
        <div className="profile-page">
            <header className="profile-header">
                <ProfilePic src={profileData.profilePic} alt="Profile" />
                <MessageButton />
            </header>
            <div className="profile-content">
                <Summary text={profileData.summary} />
                <Endorsements endorsements={profileData.endorsements} />
                <EmploymentHistory history={profileData.employmentHistory} />
                <Schedule />
            </div>
        </div>
    );
};

export default ProfilePage;