import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
state = {
  isLoading: true,
  singer: '',
  albumName: '',
  songs: [],
  favoritando: false,
  favorites: [],
}

async componentDidMount() {
  this.handleMusic();
  this.handleDownload();
}

handleDownload = async () => {
  this.setState({
    favoritando: true,
  });
  const atualizar = await getFavoriteSongs();
  console.log(atualizar);
  this.setState({
    favoritando: false,
    favorites: atualizar,
  });
}

handleSinger = (arrayObject) => arrayObject[0].artistName

handleCollection = (arrayObject) => arrayObject[0].collectionName

handleSongs = (array) => {
  const musicas = array.filter((item) => (item.kind === 'song'));
  return musicas;
}

handleMusic = async () => {
  const { match } = this.props;
  const { id } = match.params;
  const codigo = id;
  const musicas = await getMusics(codigo);
  const cantor = this.handleSinger(musicas);
  const albumNome = this.handleCollection(musicas);
  const Songs = this.handleSongs(musicas);
  this.setState({
    singer: cantor,
    isLoading: false,
    songs: Songs,
    albumName: albumNome,

  });
  // console.log('getMusics', musicas);
}

handleFavorite = (identificador) => {
  const { songs } = this.state;
  const selecionado = songs.filter((item) => (item.trackName === identificador));
  return selecionado;
}

  onClick = async ({ target }) => {
    if (target.checked) {
      // console.log(target);
      // target.checked = true;
      this.setState({ favoritando: true });
      const favorito = await this.handleFavorite(target.name);
      const resultado = await addSong(favorito);
      this.setState({ favoritando: false });
      return resultado;
      // console.log(favorito);
    //  return favorito;
    }
    if (target.checked === false) {
      this.setState({ favoritando: true });
      const favorito = await this.handleFavorite(target.name);
      const resultado = await addSong(favorito);
      this.setState({ favoritando: false });
      return resultado;
    }
  }

  render() {
    const { isLoading, singer, albumName, songs, favoritando } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <main>
          {
            (isLoading) ? (
              <Loading />
            ) : (
              <div>
                <div>
                  <h2 data-testid="artist-name">{ singer }</h2>
                  <h4 data-testid="album-name">{albumName}</h4>
                </div>
                <div>
                  { (favoritando) ? (<Loading />)
                    : ''}
                </div>
                <div>
                  <div>
                    {
                      songs.map((item) => (<MusicCard
                        key={ item.trackId }
                        trackName={ item.trackName }
                        previewUrl={ item.previewUrl }
                        trackId={ item.trackId }
                        apertar={ this.onClick }
                        // checked={ checked }
                      />))
                    }
                  </div>
                </div>
              </div>
            )
          }
        </main>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
};

export default Album;
