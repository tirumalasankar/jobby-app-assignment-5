import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    userName: '',
    passWord: '',
    showSubmitError: false,
    errorMsg: '',
  }

  changeUserName = event => {
    this.setState({userName: event.target.value})
  }

  changePassword = event => {
    this.setState({passWord: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userName, passWord} = this.state
    const userDetails = {
      username: userName,
      password: passWord,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      const message = data.error_msg
      this.setState({showSubmitError: true, errorMsg: message})
    }
  }

  render() {
    const {userName, passWord, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-login-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            <label className="label" htmlFor="input1">
              USER NAME
            </label>
            <input
              type="text"
              id="input1"
              placeholder="Username"
              className="input-element"
              value={userName}
              onChange={this.changeUserName}
            />
            <label className="label" htmlFor="input2">
              PASSWORD
            </label>
            <input
              type="password"
              id="input2"
              placeholder="Password"
              className="input-element"
              value={passWord}
              onChange={this.changePassword}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
