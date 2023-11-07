import "./image-product-component-style.css";
import { useState } from "react";
export default function ImageProduct(props) {
  const [show, setShow] = useState(false);

  const showDetails = () => {
    setShow(true);
  };

  const closeDetails = () => {
    setShow(false);
  };

  return (
    <>
      <img
        onClick={showDetails}
        className="product-img"
        src={props.previewURL}
        alt={props.tags}
      />
      {show && (
        <div className="img-modal-box d-flex justify-content-center">
          <div className="img-modal-content ">
            <p>ID : {props.id}</p>
            <p>Views : {props.views}</p>
            <p>Downloads : {props.downloads}</p>
            <p>Likes : {props.likes}</p>
            <p>Comments : {props.comments}</p>
            <p>Collections : {props.collections}</p>
            <p>User : {props.user}</p>
            <button onClick={closeDetails}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
