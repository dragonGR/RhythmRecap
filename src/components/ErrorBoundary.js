import React, { Component } from 'react';
import text from '../config/texts';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error">{text.errorBoundary.message}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;