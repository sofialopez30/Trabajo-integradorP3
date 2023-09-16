import React from 'react'
import Tarjeta from '../Tarjeta/Tarjeta'

export default function CardContainer(props) {
    return (
      <div>
        {props.album
          ? props.value.map((album, i) => (
              <div className='tarjeta-container' key={album.id + i} >
                <div className='white-box'>
                  <Tarjeta
                    key={album.id + i}
                    className='cancion'
                    id={album.id}
                    imagen={album.cover}
                    titulo={album.title}
                    artista={album.artist.name}
                    // explicit_lyrics={album.explicit_lyrics.toString()}
                    tipo='album'
                  />
                </div>
              </div>
            ))
          : props.value.map((song, i) => (
              <div className='tarjeta-container'  key={song.id + i}>
                <div className='white-box'>
                  <Tarjeta
                    className='cancion'
                    
                    id={song.id}
                    imagen={song.album.cover}
                    titulo={song.title}
                    artista={song.artist.name}
                    duration={song.duration}
                    rank={song.rank}
                    explicit_lyrics={song.explicit_lyrics.toString()}
                    tipo='cancion'
                  />
                </div>
              </div>
            ))}
      </div>
    );
  }