import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, onClick } = this.props;
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
        <label>
          Favorita
          <input
            type="checkbox"
            id="Favorita"
            name={ trackName }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ onClick }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MusicCard;
