import React from 'react';

const Endorsements = ({ endorsements }) => {
    return (
        <div className="endorsements">
            <h2>Endorsements</h2>
            <ul>
                {endorsements.map((endorsement, index) => (
                    <li key={index}>{endorsement}</li>
                ))}
            </ul>
        </div>
    );
};

export default Endorsements;