import React from "react";
import './AlbumCard.css';

const AlbumCard = props => (
    <div className="card" onClick={() => props.showSelectedAlbum(props.id)}>
      <div className="img-container">
        <img className="album-img" alt={props.name} src={props.image} />
      </div>
      <div className="card-content">
        <p>
            <strong>{props.name}</strong>
        </p>
        <p>
            {props.artist}
        </p>
        <p>{props.showHeart(props.id)}</p>    
      </div>
    </div>
  );
  export default AlbumCard; 