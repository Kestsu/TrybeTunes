import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import './style.css';

class SingerCard extends React.Component {
  render() {
    const { artistName, collectionId, image, collectionName } = this.props;
    return (
      <div>
        {/* className="item" */}
        <h4>{collectionName}</h4>
        <img
          src={ image }
          alt={ `${image}` }
        />
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
          image={ image }
        >
          { artistName }
        </Link>
      </div>
    );
  }
}

SingerCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default SingerCard;
