import React from 'react'
import { IndexLink, Link } from 'react-router'
import { logout, loggedIn } from './actions'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (sessionStorage.token && !this.props.auth)
      this.props.dispatch(loggedIn(sessionStorage.userId, sessionStorage.token))
  }
  
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
              <a href="/" className="brand-logo">Drinks</a>
              <ul className="right">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li>
                  {this.props.auth ? (
                    <a href="#"
                      onClick= { e => {
                        {
                          e.preventDefault()
                          this.props.dispatch(logout())
                          this.props.history.push('/login')
                        }
                      }}
                    >
                      Log out
                    </a>
                  ) : (<Link to="/login">Sign in</Link>)}
                </li>
              </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth.isAuthenticated }
}

export default connect(mapStateToProps, null)(App)
