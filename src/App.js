import React, { Component }  from 'react';
import './App.css';
import albums from './top-albums';
import AlbumCard from './components/AlbumCard';
import CardWrapper from "./components/CardWrapper";
import AlbumDetails from './components/AlbumDetails';


class Apps extends Component{
  state = {  
    topAlbums: [],
    favorites: [],
    selectedAlbumDets: []
  };

  componentDidMount(){
    albums().then(value => 
      {
        this.setState({topAlbums: value.feed.entry})
        console.log(value);
      });
      var fave = [1, 2, 3,];
      this.addToFavorites(fave);
      

  }
  
  showSelectedAblum = (id) =>{
    var selected = this.state.topAlbums.filter(album => album.id.attributes['im:id'] == id);
    this.setState({selectedAlbumDets: selected});
    window.scrollTo(0, 0)
  }


  addToFavorites(id){
    //localStorage.setItem("favoriteAlbums", JSON.stringify(arr) )

  }

 render(){
   return(
     <div>
    {this.state.selectedAlbumDets.map(album =>(
      <AlbumDetails
      id = {album.id.attributes['im:id']}
      name = {album['im:name'].label}
      artist = {album['im:artist'].label}
      image = {album['im:image'][2].label}
      category = {album.category.attributes.label}
      songCount = {album['im:itemCount'].label}
      price = {album['im:price'].label}
      yearPub = {album.rights.label}
      link = {album.id.label}
      release = {album['im:releaseDate'].label}
      />
      ))}

     <CardWrapper>
       
     {this.state.topAlbums.map(album => (
       <AlbumCard
          id = {album.id.attributes['im:id']}
          name = {album['im:name'].label}
          artist = {album['im:artist'].label}
          image = {album['im:image'][2].label}
          addToFavorites = {this.addToFavorites}
          showSelectedAlbum = {this.showSelectedAblum}
       />
       ))} 
       </CardWrapper>
       </div>
   );
 } 
}



export default Apps;