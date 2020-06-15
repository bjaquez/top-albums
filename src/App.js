import React, { Component }  from 'react';
import './App.css';
import getAlbums from './top-albums';
import AlbumCard from './components/AlbumCard';
import CardWrapper from "./components/CardWrapper";
import AlbumDetails from './components/AlbumDetails';
import Header from './components/Header';

class Apps extends Component{
  state = {  
    topAlbums: [],
    favorites: [],
    selectedAlbumDets: [],
    favoriteAlbums: [],
    showingFaves: false
  };

  componentDidMount(){
    getAlbums().then(value => 
      {
        this.setState({topAlbums: value.feed.entry})
        console.log(value);
      });
    var storedFaves = JSON.parse(localStorage.getItem("favoriteAlbums"));
    if(storedFaves != null){      
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

  showHeart = (id) => { 
    if(this.state.favoriteAlbums.includes(id)){
      return (<p className="red-heart">&hearts;</p>)
    }else {
      return(<p onClick = {() => this.addToFavorites(id)} className="white-heart">&hearts;</p>)
    }
  }

  showAddToFaveBtn = (id) =>{
    if(!this.state.favoriteAlbums.includes(id)){
      return(<button onClick = {() => this.addToFavorites(id)} className="fave-btn"> Add To Favorites</button>)
    }else{
      return(<p className="red-heart" >&hearts;</p>)
    }
  }

  toggleAlbumList = (showType) =>{
    if(showType == "fave"){
      var faveList = this.state.topAlbums.filter(a => this.state.favoriteAlbums.includes(a.id.attributes['im:id']));
      this.setState({topAlbums: faveList});
      this.setState({showingFaves: true});
    }else if(showType == "all") {
      getAlbums().then(value => 
        {
          this.setState({topAlbums: value.feed.entry})
          console.log(value);
        });
        this.setState({showingFaves:false});
    }
  }

  renderTopOrFavesOption = () =>{
    if(this.state.showingFaves){
      return(<button className="show-all" onClick={() => this.toggleAlbumList("all") }>Show All Albums</button>)
    }else {
      return(<button className="show-faves" onClick={() => this.toggleAlbumList("fave") }>Show Favorites</button>)
    }
  }
  renderTopOrFavesText = () => {
    if(this.state.showingFaves){
      return(<h2 className="top-text">Favorite Albums</h2>)      
    }else {
      return(<h2 className="top-text">Top Albums</h2>)
    }
  } 

 render(){
   return(
     <div>
       <Header
       showFilterOption ={this.renderTopOrFavesOption}      
       showTitleText =  {this.renderTopOrFavesText}
       />
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
      release = {album['im:releaseDate'].attributes.label}
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