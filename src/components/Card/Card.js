import React, { Component, PropTypes } from 'react';

class Card extends Component {
  
  render() {
    return (
      <div className="card">
        <div className="card-content">
          { this.props.title &&
            (<p className="title">
              {this.props.title}
            </p>)
          }
          {
            this.props.subtitle &&
            (<p className="subtitle">
              {this.props.subtitle}
            </p>
            )
          }
          <div className="content">
          {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  content: 'Default text'
}

Card.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

Card.expectedProps = {
  content: 'string',
  title: 'string',
  subtitle: 'string'
}

export default Card;
