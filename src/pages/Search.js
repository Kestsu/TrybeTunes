import React from 'react';
import Header from '../components/Header';
import Loading from '../components/loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import SingerCard from '../components/singerCard';
import '../components/style.css';

class Search extends React.Component {
  state = {
    NomeDoArtista: '',
    Estado: true,
    NomeDoArtistaPesquisar: '',
    album: [],
    isLoading: false,
    apperPlaylist: false,
    notPlaylist: false,
    resultado: false,
  }

handleChange = ({ target }) => {
  const { value } = target;
  this.setState({
    NomeDoArtista: value,
    NomeDoArtistaPesquisar: value,
    resultado: false,
  }, () => this.handleButton());
}

handleLength = () => {
  const { NomeDoArtista } = this.state;
  if (NomeDoArtista.length >= 2) {
    return false;
  } return true;
}

handleButton = () => {
  const resultado = this.handleLength();
  if (resultado) {
    return this.setState({
      Estado: true,
    });
  } return this.setState({
    Estado: false,
  });
}

handleSearch = async () => {
  const { NomeDoArtistaPesquisar } = this.state;
  this.setState({
    NomeDoArtista: '',
    isLoading: true,
    apperPlaylist: true,
    resultado: true,
  });
  const arrayObject = await searchAlbumsAPI(NomeDoArtistaPesquisar);
  if (arrayObject.length === 0) {
    this.setState({
      notPlaylist: true,
    });
  }
  if (arrayObject !== {}) {
    this.setState({
      album: arrayObject,
      isLoading: false,
      apperPlaylist: true,
      resultado: true,
    });
    console.log(arrayObject);
  }
}

render() {
  const {
    Estado, resultado,
    isLoading, NomeDoArtista, apperPlaylist, NomeDoArtistaPesquisar, album, notPlaylist,
  } = this.state;
  return (
    <div data-testid="page-search">
      <Header />
      <form>
        { (isLoading) ? (<Loading />)
          : (
            <div>
              <input
                nome="input"
                type="text"
                data-testid="search-artist-input"
                value={ NomeDoArtista }
                placeholder="Nome do Artista"
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ Estado }
                onClick={ this.handleSearch }
              >
                Pesquisar
              </button>
            </div>
          )}
      </form>
      <div>
        {
          (resultado) ? (
            <h3>
              Resultado de álbuns de:
              {' '}
              { NomeDoArtistaPesquisar }
            </h3>
          ) : (
            ''
          )
        }
      </div>
      <main>
        <div>
          {
            (notPlaylist) ? (
              <h2>Nenhum álbum foi encontrado</h2>
            ) : ''
          }
        </div>
        <div className="items">
          {
            (apperPlaylist) ? (
              album.map((item) => (<SingerCard
                key={ item.collectionId }
                artistName={ item.artistName }
                collectionId={ item.collectionId }
                image={ item.artworkUrl100 }
                collectionName={ item.collectionName }
              />))
            ) : ''
          }
        </div>
      </main>
    </div>
  );
}
}

Search.propTypes = {
};

export default Search;
