import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {MdHome, MdWork} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const removeAccess = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <div className="lg-container">
        <ul className="lg-list">
          <li className="header-item">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="header-item">
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-button" onClick={removeAccess}>
          Logout
        </button>
      </div>
      <ul className="sm-container">
        <li className="sm-list-item">
          <Link className="l" to="/">
            <MdHome className="icon" />
          </Link>
        </li>
        <li className="sm-list-item">
          <Link className="l" to="/jobs">
            <MdWork className="icon" />
          </Link>
        </li>
        <li className="sm-list-item">
          <button type="submit" className="button-icon" onClick={removeAccess}>
            <FiLogOut className="icons" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
