import React from "react";
import './AlbumCard.css';

const AlbumCard = props => (
    <div className="card" onClick={() => props.showSelectedAlbum(props.id)}>
      <div className="img-container">
        <img className="album-img" alt={props.name} src={props.image} />
      </div>
      <div className="card-content">
        <h4>
            <strong>{props.name}</strong>
        </h4>
        <h4>
            {props.artist}
        </h4>
        {/* <span onClick={() => props.addToFavorites(props.id)} className="remove">
      &hearts;
    </span> */}
      </div>

    </div>
  );

  export default AlbumCard; 