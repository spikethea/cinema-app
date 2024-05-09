import {useEffect, useState } from 'react';
import { useGetAllRecentMoviesQuery } from 'services/movies';
import Hero from 'components/Hero/Hero';
import MovieThumbnail from 'components/MovieThumbnail/MovieThumbnail';
import { MovieData } from 'types';
import './Home.scss';


function App() {

  const title: String = "MyCinema App";

  const { data, error, isLoading } = useGetAllRecentMoviesQuery();

  const [filmList, setFilmList] = useState<MovieData[]>([]);

  useEffect(()=> {
    console.log(data);
    if (data?.results) 
      setFilmList(data.results)
  }, [data]);

  return (
    <div className="landing-page">
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

export default App;


