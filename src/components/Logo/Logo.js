import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import transparentLogo from '../../assets/images/Smart Brain-logos_transparent.png'

const Logo = () => {
  return(
    //give the outer div a better name and rules. Its job is to contain the width of the Tilt component
    <div id='basicComp' className='ma4 mt0' > 
    <Tilt tiltMaxAngleX={30} tiltMaxAngleY={30} perspective={1000}>
      <div id='tiltComponent' className='pa3'>
        <img alt='logo' src={transparentLogo} width="200" height="200"></img>
      </div>
    </Tilt>
    </div>
  );
}

// https://www.npmjs.com/package/react-parallax-tilt

export default Logo;