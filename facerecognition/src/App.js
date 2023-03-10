import FaceRecognition from "./components/FaceRecognition/FaceRecognition.component";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.component";
import Logo from "./components/Logo/Logo.component";
import Navigation from "./components/Navigation/Navigation.component";
import Rank from "./components/Rank/Rank.component";

import ParticlesBg from "particles-bg";

import "./App.css";
import { useState } from "react";
import SignIn from "./components/Signin/Signin.component";
import Register from "./components/Register/Register.component";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const calculateFaceLocation = (data) => {
    const calrifyFaces = data.outputs[0].data.regions;

    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return calrifyFaces.map((calrifyFace) => {
      const regions = calrifyFace.region_info.bounding_box;
      return {
        leftCol: regions.left_col * width,
        topRow: regions.top_row * height,
        rightCol: width - regions.right_col * width,
        bottomRow: height - regions.bottom_row * height,
      };
    });
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    const raw = JSON.stringify({
      user_app_id: {
        user_id: process.env.REACT_APP_CLARIFAI_USER_ID,
        app_id: process.env.REACT_APP_CLARIFAI_APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + process.env.REACT_APP_CLARIFAI_API_KEY,
      },
      body: raw,
    };

    fetch(process.env.REACT_APP_CLARIFAI_API, requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        const jsonResponse = JSON.parse(response);
        return displayFaceBox(calculateFaceLocation(jsonResponse));
      })
      .catch((error) => console.log("error", error));
  };

  const displayFaceBox = (boxes) => {
    setBoxes(boxes);
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }

    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesBg bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
        </div>
      ) : route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : (
        <Register />
      )}
    </div>
  );
}

export default App;
