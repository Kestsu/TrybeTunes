import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, apertar, isChecked } = this.props;
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
              checked={ isChecked }
              data-testid={ `checkbox-music-${trackId}` }
              onClick={ apertar }
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
  isChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
