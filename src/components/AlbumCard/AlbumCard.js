import React from "react";
import './AlbumCard.css';

const AlbumCard = props => (
    <div className="card">
      <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div>
      <div className="card-content">
        <h4>
            <strong>{props.name}</strong>
        </h4>
        <h4>
            {props.artist}
        </h4>

      </div>

    </div>
  );

  export default AlbumCard; 