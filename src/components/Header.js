import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './loading';

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
    // console.log(this.props);
  }

  // Search = () => {
  //   const { history } = this.props;
  //   history.push('/search');
  // }

  // Favorites = () => {
  //   const { history } = this.props;
  //   history.push('/favorites');
  // }

  // Profile = () => {
  //   const { history } = this.props;
  //   history.push('/profile');
  // }

  render() {
    const { isLoading, user } = this.state;
    return (
      <header data-testid="header-component">
        {
          (isLoading)
            ? (
              <Loading />
            ) : (
              <h1 data-testid="header-user-name">{user}</h1>
            )

        }
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

// Header.propTypes = {
//   history: PropTypes.func.isRequired,

// };

export default Header;

/* <button
  type="button"
  data-testid="link-to-search"
  onClick={ this.Search }
>
  Search

</button>
<button
  type="button"
  data-testid="link-to-favorites"
  onClick={ this.Favorites }
>
  Favorites

</button>
<button
  type="button"
  data-testid="link-to-profile"
  onClick={ this.Profile }
>
  Profile
</button> */
