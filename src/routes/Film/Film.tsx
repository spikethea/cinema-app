import {useEffect, useState, Suspense, useRef} from 'react';
import { MovieData } from 'types';
import logo from './logo.svg';
import './Film.scss';
import Hero from 'components/Hero/Hero';
import MovieThumbnail from 'components/MovieThumbnail/MovieThumbnail';
import PerspectiveView from 'components/PerspectiveView/PerspectiveView';

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

  const [film, setFilm] = useState<MovieData>();

  useEffect(()=> {
    getMovies()
      .then(movies => {
        console.log(movies);
        setFilm(movies[0]);
      });
    
  }, []);

  return (
    <div className="film-preview_page">
      
      <main>
        <aside>
          <h3>Filter</h3>
        </aside>
        <div className='film-preview_hero-container'>
          {film ? <Hero film={film}/> : null}
          <div className="film-preview_showtimes">
            <button>7:00PM</button>
            <button>7:00PM</button>
            <button>8:00PM</button>
            <button>11:00PM</button>
          </div>
        </div>
        <div className='film-preview_perspective'>
          <PerspectiveView/>
        </div>
        <section className='movies-container'>
          <h3>Title</h3>
          <h5>Description</h5>
        </section>
      </main>
    </div>
  );
}

export default App;
