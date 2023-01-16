import Navigation from "./components/Navigation/Navigation.component";
import Logo from "./components/Logo/Logo.component";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.component";
import Rank from "./components/Rank/Rank.component";

import ParticlesBg from "particles-bg";

import "./App.css";

function App() {
  return (
    <div className="App">
      <ParticlesBg type="lines" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*<FaceRecognition /> */}
    </div>
  );
}

export default App;
