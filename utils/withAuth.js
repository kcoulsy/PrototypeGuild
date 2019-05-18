// utils/withAuth.js - a HOC for protected pages
import React, {Component} from 'react'
import Router from 'next/router'
import hoistNonReactStatics from 'hoist-non-react-statics';
import AuthService from './AuthService'

export default function withAuth(AuthComponent) {
    const Auth = new AuthService()
    
    class Authenticated extends Component {
      static getInitialProps(ctx) {
        return AuthComponent.getInitialProps(ctx)
      }

      constructor(props) {
        super(props)
        this.state = {
          isLoading: true
        };
      }

      componentDidMount () {
        if (!Auth.loggedIn()) {
            Router.push('http://localhost:3001/')
        }
        this.setState({ isLoading: false })
      }

      render() {
        const { isLoading } = this.state;
        
        return (
          <div>
          {isLoading ? (
              <div>LOADING....</div>
            ) : (
              <AuthComponent {...this.props}  auth={Auth} />
            )}
          </div>
        )
      }
    }
    return hoistNonReactStatics(Authenticated,AuthComponent);
}