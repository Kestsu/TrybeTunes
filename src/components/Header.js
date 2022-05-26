import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './loading';
// import './style.css';

class Header extends React.Component {
state = {
  isLoading: true,
  user: '',
}

// Vai executar quanto tudo tiver carregado
componentDidMount() {
  this.handleName();
}

  handleName = async () => {
    // A função getUser traz de forma assicrona um objeto
    const objeto = await getUser();
    this.setState({
      user: objeto.name,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <header data-testid="header-component" className="header">
        <div className="nome">
          {
            (isLoading)
              ? (
                <Loading />
              ) : (
                <h1 data-testid="header-user-name">{user}</h1>
              )
          }
        </div>
        <div className="links">
          <Link
            className="removeLine"
            data-testid="link-to-search"
            to="/search"
          >
            Search

          </Link>
          <Link
            className="removeLine"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favorites

          </Link>
          <Link
            className="removeLine"
            data-testid="link-to-profile"
            to="/profile"
          >
            Profile

          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
