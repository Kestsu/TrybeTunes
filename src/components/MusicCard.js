import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    estado: false,
  }

  componentDidMount() {
    this.handleDownload();
  }

  handleDownload = async () => {
    const { trackId, trueFalse } = this.props;
    const atualizar = await getFavoriteSongs();
    const numero = JSON.parse(trackId);
    // console.log('numero', numero);
    const retorno = atualizar.some((item) => item.trackId === numero);
    // console.log(retorno);
    if (trueFalse === true) {
      console.log('passou no down');
    }
    if (trueFalse === false) {
      this.setState({
        estado: retorno,
      });
    }
    // return true;
  }

handleAtualizar = () => {
  const { trueFalse } = this.props;
  this.setState({
    estado: trueFalse,
  });
}

render() {
  const { trackName, previewUrl, trackId, apertar } = this.props;
  const { estado } = this.state;
  return (
    <div className="item">
      <h4>{trackName}</h4>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <form>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            name={ trackName }
            checked={ estado }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ async ({ target }) => {
              await apertar(target);
              this.handleAtualizar();
              this.handleDownload();
            } }
          />
        </label>

      </form>
    </div>
  );
}
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  apertar: PropTypes.func.isRequired,
  trueFalse: PropTypes.bool.isRequired,
};

export default MusicCard;
