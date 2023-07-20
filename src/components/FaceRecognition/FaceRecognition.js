import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
  if (imageUrl === '') {
    return null;
  }
  return(
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='metro' src={imageUrl} width='500px' height='auto'/>
        <div className='bounding_box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;