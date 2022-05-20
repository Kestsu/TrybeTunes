import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    NomeDoArtista: '',
    Estado: true,
  }

handleChange = ({ target }) => {
  const { value } = target;
  this.setState({
    NomeDoArtista: value,
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

render() {
  const { Estado } = this.state;
  return (
    <div data-testid="page-search">
      <Header />
      <form>
        <input
          type="text"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ Estado }
        >
          Pesquisar
        </button>
      </form>
    </div>
  );
}
}

export default Search;
