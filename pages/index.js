import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard'
import Details from './components/Details'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies : [],
      input : '',
      value : false,
      query: '',
      id : '',
      page: 2,
      error: ''
    }

    this.submitHandler = this.submitHandler.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.display = this.display.bind(this)
  }

  componentDidMount(){
    window.addEventListener('scroll', this.infiniteScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll);
  }

  changeValue(id) {
    this.setState({
      value : !this.state.value,
      id
    })
  }


  infiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight){
       
         const key = "4358bd7e";
         axios.get(
          `https://www.omdbapi.com/?s=${this.state.query}&apikey=${key}&type=movie&page=${this.state.page}`)
          .then((res) => {
          if (res.data.Search) {
            this.setState(
              (state) => ({
                movies: state.movies.concat(res.data.Search),
                page: state.page + 1
              })
            )
          }
      })
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.movieList(this.state.query);
  };

  movieList = async query => {
    const key = "4358bd7e";
    query = this.state.query;
    
    let result = await fetch(`https://www.omdbapi.com/?s=${query}&type=movie&page=1&apikey=${key}`)
      .then(res => res.json())
      .then(this.resultRender);
    if(!this.state.movies) {
      this.setState({
        input: '',
        value: false,
        error: 'Tente novamente com uma busca válida'
      })
    }else{
      this.setState({
        error: ''
      })
      return result;
    }
  };
  resultRender = response =>
  this.setState({
    movies: response.Search,
    input : '',
    value: false
  });

  display = () => {
    if(!this.state.value && this.state.movies) {
      return (this.state.movies.map(movie => 
       <MovieCard movie={movie} changeValue={this.changeValue} key={movie.imdbID} /> 
      ) )
    }
      else 
        if(this.state.id !== '') 
          return <Details id={this.state.id} changeValue={this.changeValue} /> 
  }

  render() { 
    return (  
      <div className="App">
        <Navbar />
        <div className="container">
          <form className={(this.state.movies && this.state.movies.length > 0 ? "top-search":"md-resize")} onSubmit={this.submitHandler}>
          <div className="form-group">
            <input value={this.state.input} onChange={(e) => this.setState({input : e.target.value, query: e.target.value})} type="text" className="search-input" placeholder="Procure seu Filme" required/> 
            <p className="error">{this.state.error}</p> 
          </div>
          <button type="submit" className="btn-submit" id="btn-submit">Buscar</button>
          </form>
          <div className="content" style={{display: this.state.movies ? 'flex' : 'none' }}> 
            {this.display()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
