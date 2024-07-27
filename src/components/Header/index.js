import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <img
        src="https://imagetolink.com/ib/0JJvpMap3E.png"
        alt="login website logo"
        className="website-logo"
      />
      <button
        type="button"
        className="logout-btn-large"
        onClick={onClickLogout}
      >
        Logout
      </button>
      <button
        type="button"
        className="logout-btn-small"
        onClick={onClickLogout}
      >
        <img
          src="https://imagetolink.com/ib/vzNykpskhs.png"
          className="log-out-img"
          alt="logout"
        />
      </button>
    </nav>
  )
}

export default withRouter(Header)
