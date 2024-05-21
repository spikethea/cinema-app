import {useEffect, useState } from 'react';
import { useGetAllRecentMoviesQuery } from 'services/movies';
import Hero from 'components/Hero/Hero';
import MovieThumbnail from 'components/MovieThumbnail/MovieThumbnail';
import { MovieData } from 'types';
import './Home.scss';


function App() {

  const title: String = "MyCinema App";

  const { data, error, isLoading } = useGetAllRecentMoviesQuery();

  return (
    <div className="landing-page">
      {data ? <Hero film={data?.results[0]}/>: null}
      <main>
        <aside>
          <h3>Filter</h3>
        </aside>
        <section className='movies-container'>
          {data && data.results ? data.results.map( (props, id) => {
            return (
            <MovieThumbnail key={id} {...props}/>)
          }): null}
        </section>
      </main>
    </div>
  );
}

export default App;


