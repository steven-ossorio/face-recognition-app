import "./FaceRecognition.styles.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
        />
        {boxes &&
          boxes.map((box) => {
            return (
              <div
                key={box.leftCol + box.topRow}
                style={{
                  top: box.topRow,
                  left: box.leftCol,
                  bottom: box.bottomRow,
                  right: box.rightCol,
                }}
                className="bounding-box"
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default FaceRecognition;
