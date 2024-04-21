import { useEffect, useState } from 'react';
import { MovieData } from '../../types';
import placeholder from '/assets/placeholder.png';

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
        getPosterImage(data.id)
            .then((imageData) => {
                console.log(imageData)
                //setPosterURL(image);
            });
    }, [])

    return (
        <div id={'movie-thumbnail_' + data.id} key={data.id} className='film'>
            <img src={posterURL}/>
            <h2>{data.title}</h2>
            <h4>{data.release_date}</h4>
            <p></p>
          </div>
    )
}

export default MovieThumbnail;