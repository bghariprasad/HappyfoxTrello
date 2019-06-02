import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class EditableContent extends Component {
  static getDerivedStateFromProps(props, state) {
    if (!state.title) {
      return { title: props.children };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      title: props.children
    };
  }

  handleSetData = () => {
    this.props.editedText(this.state.title);
  }

  handleChange = e => this.setState({ title: e.target.value });

  render() {
    const { title } = this.state;
    return (
      <Fragment>
        <input
          className={`editableInput ${this.props.className}`}
          type="text"
          value={title}
          title={title}
          onChange={e => this.handleChange(e)}
          onBlur={() => this.handleSetData()}
        />
      </Fragment>
    );
  }
}

EditableContent.propTypes = {
  editedText: PropTypes.func,
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

EditableContent.defaultProps = {
  editedText: () => 0
};

export default EditableContent;
