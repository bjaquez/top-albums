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
    selectedAlbumDets: [],
    favoriteAlbums: []
  };

  componentDidMount(){
    albums().then(value => 
      {
        this.setState({topAlbums: value.feed.entry})
        console.log(value);
      });

    var storedFaves = JSON.parse(localStorage.getItem("favoriteAlbums"));
    //var parsedFaves = JSON.parse(storedFaves);
    var currentFaves = this.state.favoriteAlbums;  
    console.log(currentFaves)  
    console.log(storedFaves)
    if(storedFaves != null){
      //this.state.favoriteAlbums.push(parsedFaves);
      this.setState({favoriteAlbums: this.state.favoriteAlbums.concat(storedFaves)});  
    }

  }
  
  showSelectedAblum = (id) => {
    var selected = this.state.topAlbums.filter(album => album.id.attributes['im:id'] == id);
    this.setState({selectedAlbumDets: selected});
    window.scrollTo(0, 0)
  }


  addToFavorites = (id) => {
    var newFaves = this.state.favoriteAlbums.concat(id);
    this.setState({favoriteAlbums: newFaves});
    localStorage.setItem("favoriteAlbums", JSON.stringify(newFaves) )

  }

  showHeart(id){
    var storedfaves = JSON.parse(localStorage.getItem("favoriteAlbums"));    
    if(storedfaves.includes(id)){
      return (<p className="red-heart">&hearts;</p>)
    }else {
      return(<p onClick = {() => this.addToFavorites(id)} className="white-heart">&hearts;</p>)
    }
  }

  showAddToFaveBtn(id){
    var storedfaves = JSON.parse(localStorage.getItem("favoriteAlbums"));    
    if(!storedfaves.includes(id)){
      return(<button onClick = {() => this.addToFavorites(id)} className="fave-btn"> Add To Favorites</button>)
    }else{
      return(<p className="red-heart" >&hearts;</p>)

    }
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
      showfavebtn = {this.showAddToFaveBtn}
      addToFavorites = {this.addToFavorites}
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
          showHeart = {this.showHeart}
       />
       ))} 
       </CardWrapper>
       </div>
   );
 } 
}



export default Apps;