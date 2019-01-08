import * as Sentry from '@sentry/browser';
import React, { Component } from 'react';
// Sentry.init({
//  dsn: "https://7e76b2624bb5477884183c63741af639@sentry.io/1366189"
// });
// should have been called before using it here
// ideally before even rendering your react app 
Sentry.init({ dsn: 'https://7e76b2624bb5477884183c63741af639@sentry.io/1366189' });

class ExampleBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
      this.setState({ error });
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(error);
      });
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return (
              <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}