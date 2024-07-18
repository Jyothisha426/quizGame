import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showErrMsg: false,
    errMsg: '',
  }

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onToggleShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showErrMsg: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrMsg, errMsg, showPassword} = this.state
    return (
      <div className="main-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <img
            src="https://imagetolink.com/ib/0JJvpMap3E.png"
            alt="login website logo"
            className="login-quiz-logo"
          />
          <div className="input-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              className="input"
              id="username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="input"
              id="password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="show-password-container">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              checked={showPassword}
              onChange={this.onToggleShowPassword}
            />
            <label id="checkbox" className="show-password" htmlFor="checkbox">
              Show Password
            </label>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {showErrMsg && <p className="err-msg">{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
