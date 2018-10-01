import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="tc ph5 lh-copy">
    <h1 className="f1 f-headline-l db code mb3 fw9 dib tracked-tight mooveItNavy">4<span role="img" aria-label="frown">😔</span>4</h1>
    <h2 className="f1-l fw1">We are unable to find that page.</h2>
    <Link to="/" className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white mooveItNavybg">
      Home
    </Link>
  </div>
);

export default NotFound;
