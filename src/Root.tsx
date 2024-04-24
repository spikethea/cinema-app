import {useEffect, useState, Suspense, useRef} from 'react';
import { MovieData } from './types';
import logo from './logo.svg';
import './App.scss';
import Hero from './components/Hero/Hero';
import MovieThumbnail from './components/MovieThumbnail/MovieThumbnail';

const KEY_ID = '73cadb65ff374fcf789e84b35293b73b';


function getMovies(): Promise<MovieData[]> {
  return fetch(`
  https://api.themoviedb.org/3/movie/popular?api_key=${KEY_ID}&language=en-US&page=1`)
    .then(res => res.json())
    .then(res => {
      return res.results as MovieData[]
    })
}

export default function Root() {

  const title: String = "MyCinema App";

  const [filmList, setFilmList] = useState<MovieData[]>([]);

  useEffect(()=> {
    getMovies()
      .then(movies => {
        console.log(movies);
        setFilmList(movies);
      });
    
  }, []);

  return (
    <div className="root">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{title}</h1>
          <ul className="navigation">
            <li><a href=""></a></li>
          </ul>
      </header>
      <Hero film={filmList[0]}/>
      <main>
        <aside>
          <h3>Filter</h3>
        </aside>
        <section className='movies-container'>
          {filmList ? filmList.map( props => {
            return (
            <MovieThumbnail {...props}/>)
          }): null}
        </section>
      </main>
      
    </div>
  );
}
