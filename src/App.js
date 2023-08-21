import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import backendUrls from './backendConfig';

const MODEL_ID = 'face-detection';

// In a more serious project would move the Clarifai information to the backend for security purposes
const returnClarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '298d5e953fdc4cbd928e39eef3e55334';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'ferrumcorum';       
    const APP_ID = 'face-recognition';
    // Change these to whatever model and image URL you want to use  
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions
}

/////////////////////////////////////////////

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({id: '', name: '', email: '', entries:0, joined:''})

  const resetState = () => {
    setInput('');
    setImageUrl('');
    setBox({});
    //setRoute('signin);
    setIsSignedIn(false);
    setUser({id: '', name: '', email: '', entries:0, joined:''});
  }


  const loadUser = (data) => {
    setUser({id: data.id, name: data.name, email: data.email, entries: data.entries, joined:data.joined})
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  const displayFaceBox = box => {
    setBox(box);
  }

  const onInputChange = event => {
    setInput(event.target.value);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);
    // app.models.predict('face-detection', input)
      fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(input))
      .then(response => response.json())
      .then(response => {
        displayFaceBox(calculateFaceLocation(response));
        // fetch('http://localhost:3001/image', {
        fetch(backendUrls.apiUrl + "/image", {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          setUser({...user, entries: count})
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
      resetState();
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} color="#5c18f0" className="particles"/>
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
      { route === 'home' 
      ?
      <div>
      <Logo/>
      <Rank name={user.name} entries={user.entries}/>
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
      <FaceRecognition imageUrl={imageUrl} box={box} />
      </div>
      
      : (route === 'signin'
      ?<SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
      : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>)
      }
    </div>
  );
}

// https://www.npmjs.com/package/particles-bg

export default App;
