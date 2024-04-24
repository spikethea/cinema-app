import { useEffect, useState } from 'react';
import placeholderImage from '../../assets/images/placeholder.png';
import { MovieData } from '../../types';

interface HeroProps {
    film: MovieData
}

const Hero = ({ film }: HeroProps) => {

    const [heroImage, setHeroImage] = useState(placeholderImage);

    useEffect(()=> {
        if (film) {
            setHeroImage(`https://image.tmdb.org/t/p/original/${film.backdrop_path}`);
        }

    }, [film])

    return (
        <section className='hero-container'>
          <img 
            src={heroImage}
            alt=""
          />
        <div className='caption'>
          <h2>{film ? film.title : 'Highlight Movie'}</h2>
          <a className='cta cta-watch-trailer' href="">watch trailer</a>
        </div>
      </section>
    )
}

export default Hero;