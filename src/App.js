import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';

function App() {
  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} color="#5c18f0" className="particles"/>
      <Navigation />
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
      {/* 
      <FaceRecognition/> */}
    </div>
  );
}

export default App;
