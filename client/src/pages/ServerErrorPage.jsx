/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React from 'react';

function ServerErrorPage({ data }) {
    return (
        <div className="flex">
            <div className="m-auto">
                <img alt="error with data request from nasa" src="https://cdn.dribbble.com/users/926537/screenshots/8259812/media/59d9003d13e5a79418b957c366e9d199.png" />
                <div className="text-lg text-center">
                    <p>{data?.msg}</p>
                    <h1>
                        Error code:
                        {data?.code}
                        {' '}
                        from the Nasa APOD API while requesting data
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default ServerErrorPage;
