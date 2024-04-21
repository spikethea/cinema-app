import {useEffect, useState, Suspense, useRef} from 'react';
import { MovieData } from './types';
import logo from './logo.svg';
import placeholderImage from './assets/images/placeholder.png';
import './App.scss';

const KEY_ID = '73cadb65ff374fcf789e84b35293b73b';


function getMovies(): Promise<MovieData[]> {
  return fetch(`
  https://api.themoviedb.org/3/movie/popular?api_key=${KEY_ID}&language=en-US&page=1`)
    .then(res => res.json())
    .then(res => {
      return res.results as MovieData[]
    })
}

function App() {

  const title: String = "MyCinema App";
  const imgRef = useRef(null);

  const [filmList, setFilmList] = useState<MovieData[]>([]);
  const [heroImage, setHeroImage] = useState(placeholderImage);

  useEffect(()=> {
    getMovies()
      .then(movies => {
        console.log(movies);
        setFilmList(movies);
        setHeroImage(`https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}`);
      });
    
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{title}</h1>
          <ul className="navigation">
            <li><a href=""></a></li>
          </ul>
      </header>
      <section className='hero-container'>
          <img 
            src={heroImage}
            ref={imgRef}
            alt=""
          />
        <div className='caption'>
          <h2>Movie Highlight</h2>
          <a className='cta cta-watch-trailer' href="">watch trailer</a>
        </div>
      </section>
      <section className='movies-container'>
        {filmList ? filmList.map( movie => {
          return (
          <div id={'movie-thumbnail_' + movie.id} key={movie.id} className='film'>
            <img src={movie.image}/>
            <h2>{movie.title}</h2>
            <h4>{movie.release_date}</h4>
            <p></p>
          </div>)
        }): null}
      </section>
      
    </div>
  );
}

export default App;
