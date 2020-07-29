import React from 'react';
import {Card, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Tippy from '@tippyjs/react';

const MovieCard = (props) => {

  const handleClick = () => { 
    props.changeValue(props.movie.imdbID)
  }
  return (
  <div className="movieCard">
  <Card>
    <CardMedia className="imgContainer">
      <img className="imgMovie" src={props.movie.Poster === 'N/A' ? 'https://higipratic.com.br/site/wp-content/uploads/2017/12/indisponivel.jpg' : props.movie.Poster} alt="Movie Poster" />
    </CardMedia>
      <Tippy className="extra tooltip-content" content={
        <div className="content-props">
            <h3 className="title-card">{props.movie.Title}</h3>
           <p className="year">{props.movie.Year}</p>
      <FlatButton className="btn-details" label="+ Info" onClick={() => handleClick()} style={{backgroundColor : '#1890ff', color: '#fff'}}/>
        </div>
      } delay={[200, 4000]} placement="bottom">
    <a className="tooltip"><img src="https://icon-library.com/images/more-icon-png/more-icon-png-27.jpg" style={{backgroundColor : 'transparent', width : '32px', height : '32px', marginTop : '10px'  }} alt="icon-tip"/></a>
  </Tippy>
  </Card> 
  </div>
  )
}

export default MovieCard;