import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './loading';

class Header extends React.Component {
state = {
  isLoading: true,
  user: '',
}

// const { isLoading, user } = this.state;
componentDidMount() {
  this.handleName();
}

  handleName = async () => {
    const nome = await getUser();
    this.setState({
      user: nome.name,
      isLoading: false,
    });
  }

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

      </header>
    );
  }
}

export default Header;
