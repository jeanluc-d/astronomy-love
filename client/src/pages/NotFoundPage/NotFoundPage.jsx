/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React from 'react';

function NotFoundPage() {
  return (
    <body className="bg-purple NotFound">

      <div className="stars">
        <div className="custom-navbar" />
        <div className="central-body">
          What you are looking for is out of this world!
          <a href="http://astronomy.love" className="btn-go-home" target="_blank" rel="noreferrer">GO HOME</a>
        </div>
        <div className="objects">
          <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px" />
          <div className="earth-moon">
            <img className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px" />
            <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
          </div>
          <div className="box_astronaut">
            <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px" />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />

        </div>

      </div>

    </body>
  );
}

export default NotFoundPage;
