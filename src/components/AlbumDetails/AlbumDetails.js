import React from "react";
import './AlbumDetails.css';

const AlbumDetails = props => (
    <div className="selected-card">
      <div className="selected-img-container">
        <img className="selected-img" alt={props.name} src={props.image} />
      </div>
      <div className="selected-card-content">
          <div className="titles">
            <p><strong>Album Name:</strong></p>
            <p><strong>Artist:</strong></p>
            <p><strong>Category:</strong></p>
            <p><strong># of Songs:</strong></p>
            <p><strong>Price:</strong></p>
            <p><strong>Release:</strong></p>
          </div>
          <div className="details">
            <p><a href={props.link} target="_blank">{props.name}</a></p>
            <p>{props.artist}</p>
            <p>{props.category}</p>
            <p>{props.songCount}</p>
            <p>{props.price}</p>
            <p>{props.release}</p>
          </div>
      </div>
<div>{props.showfavebtn(props.id)}</div>


    </div>
  );

  export default AlbumDetails; 