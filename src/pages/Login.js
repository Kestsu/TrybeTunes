import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/loading';

class Login extends React.Component {
    state = {
      apelido: '',
      buttonEnter: true,
      isLoading: false,
    };

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      }, () => this.botao());
    };

    button = () => {
      const { apelido } = this.state;
      const tres = 3;
      if (apelido.length >= tres) {
        return false;
      } return true;
    };

    botao = () => {
      const resultado = this.button();
      this.setState({
        buttonEnter: resultado,
      });
    }

    handleClick = async () => {
      this.setState({
        isLoading: true,
      });
      const { apelido } = this.state;
      await createUser({ name: apelido });

      const { history } = this.props;
      history.push('/search');
    }

    render() {
      const { isLoading } = this.state;
      const { apelido, buttonEnter } = this.state;

      return (
        <div>
          {
            isLoading ? (
              <Loading />
            ) : (
              <div data-testid="page-login">
                <form>
                  <h2>Insira seu nome</h2>
                  <input
                    name="apelido"
                    type="text"
                    value={ apelido }
                    data-testid="login-name-input"
                    placeholder="Digite seu nome"
                    onChange={ this.handleChange }
                  />
                  <button
                    type="button"
                    data-testid="login-submit-button"
                    disabled={ buttonEnter }
                    onClick={ this.handleClick }
                  >
                    Entrar
                  </button>
                </form>
              </div>
            )
          }
        </div>
      );
    }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};
export default Login;
