import { Component, type ErrorInfo, type ReactNode } from 'react'
import { site } from '@/data/site'
import styles from './ErrorBoundary.module.css'

type Props = {
  children: ReactNode
}

type State = {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[desk] render error', error, info.componentStack)
  }

  private recover = () => {
    this.setState({ error: null })
    if (typeof window !== 'undefined') {
      window.location.assign(import.meta.env.BASE_URL || '/')
    }
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className={styles.wrap} role="alert">
        <div className={styles.kicker}>RUNTIME FAULT</div>
        <h1 className={styles.title}>Something failed to render</h1>
        <p className={styles.lead}>
          {site.title} hit an unexpected error. You can reload the archive home
          without losing the rest of the project.
        </p>
        <pre className={styles.detail}>{this.state.error.message}</pre>
        <button type="button" className="btn" onClick={this.recover}>
          Reload home
        </button>
      </div>
    )
  }
}
