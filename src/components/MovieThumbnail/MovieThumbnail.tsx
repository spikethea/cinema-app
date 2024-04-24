import { useEffect, useState } from 'react';
import { MovieData } from '../../types';
import placeholder from '../../assets/images/placeholder.png';
const TMDBURL = "https://image.tmdb.org/t/p/original";

function getPosterImage(MovieID: number): Promise<any> {
    return fetch(`
    https://api.themoviedb.org/3/movie/${MovieID}/images`)
      .then(res => res.json())
      .then(res => {
        return res.results as MovieData[]
      })
}


function MovieThumbnail ( data: MovieData ) {

    const [posterURL, setPosterURL] = useState(placeholder);

    useEffect(()=> {
      console.log(TMDBURL + data.poster_path)
        getPosterImage(data.id)
            .then((imageData) => {
                console.log(imageData)
                //setPosterURL(image);
                
            });
    }, [])

    return (
        <div className={'movie-thumbnail'} id={'movie-thumbnail_' + data.id} key={data.id} >
            <img src={TMDBURL + data.poster_path}/>
            <h5>{data.title}</h5>
            <h4>{data.release_date}</h4>
            <p></p>
          </div>
    )
}

export default MovieThumbnail;