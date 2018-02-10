import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <progress value={this.props.uploadValue} max="100" >
          {this.props.uploadValue} %
        </progress>
        <br />
        <input type="file" onChange={this.props.onUpload} />


      </div>
    );
  }
}

FileUpload.propTypes = {
  uploadValue: PropTypes.number,
  onUpload: PropTypes.func.isRequired
};
FileUpload.defaultProps = {
  uploadValue: 0
};

export default FileUpload;
