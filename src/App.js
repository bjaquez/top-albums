import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';
import albums from './top-albums';
import AlbumCard from './components/AlbumCard';
import Wrapper from "./components/Wrapper";


class Apps extends Component{
  state = {  
    topAlbums: [],
  };

  componentDidMount(){
    albums().then(value => 
      {
        this.setState({topAlbums: value.feed.entry})
        console.log(value);
      });
  }
  

 render(){
   return(
     <Wrapper>

     {this.state.topAlbums.map(album => (
       <AlbumCard
          id = {album.id.attributes['im:id']}
          name = {album['im:name'].label}
          artist = {album['im:artist'].label}
          image = {album['im:image'][2].label}
       />
       ) )} 
       </Wrapper>
   );
 } 
}



export default Apps;