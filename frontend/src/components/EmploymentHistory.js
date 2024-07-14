import React from 'react';

const EmploymentHistory = ({ history }) => {
    return (
        <div className="employment-history">
            <h2>Employment History</h2>
            <ul>
                {history.map((job, index) => (
                    <li key={index}>{job}</li>
                ))}
            </ul>
        </div>
    );
};

export default EmploymentHistory;