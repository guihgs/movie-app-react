import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie : []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        const key = "4358bd7e";
        fetch(`https://www.omdbapi.com/?i=${this.props.id}&apikey=${key}&plot=full`)
        .then(data => data.json())
        .then(data => { console.log(data)
            this.setState({movie : data})
        })
    }

    handleClick() { 
        this.props.changeValue(this.props.id)
      }

    render() {
        return (
            <div className="movie">
            <h1 className="movie-title">{this.state.movie.Title}</h1>
            <div className="sub-content">
            <p>Genre: {this.state.movie.Genre} {this.state.movie.Year}</p>
            </div>

            <div className="movie-container">
                <div className="poster">
                <img src={this.state.movie.Poster === 'N/A' ? 'https://higipratic.com.br/site/wp-content/uploads/2017/12/indisponivel.jpg' : this.state.movie.Poster} alt={this.state.movie.Title} />
                </div>
                <div className="moviecontent">
                <h6>Director : {this.state.movie.Director}</h6>
                <h6>Type: {this.state.movie.Type}</h6>
                <h6>Rated: {this.state.movie.Rated}</h6>
                <h6>Released: {this.state.movie.Released}</h6>
                <h6>Runtime : {this.state.movie.Runtime}</h6>
                <h6>Country : {this.state.movie.Country}</h6>
                <h6>Language : {this.state.movie.Language}</h6>
                <h6>Actors: {this.state.movie.Actors}</h6>
                <h6>imdb Rating : {this.state.movie.imdbRating} Votes: {this.state.movie.imdbVotes}</h6>
                <h6>Awards: {this.state.movie.Awards}</h6>
                <h6>Metascore : {this.state.movie.Metascore}</h6>
                <p className="plot">{this.state.movie.Plot}</p>
                </div>
            </div>
            <FlatButton label="Voltar" onClick={this.handleClick} style={{backgroundColor : '#1890ff', color: '#fff'}} />
            </div>
        )
    }
}

export default Details;