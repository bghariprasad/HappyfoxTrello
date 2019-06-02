import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TrelloAction from '../../actions/trello';

class TicketModal extends Component {
  static getDerivedStateFromProps(props) {
    if (props.selectedList.id) {
      const selectedList = props.board.lists.find(list => list.id === props.selectedList.id);
      const selectedTicket = selectedList &&
        selectedList.tickets.find(ticket => ticket.id === props.selectedList.ticket.id);
      return {
        id: selectedTicket && selectedTicket.id,
        title: selectedTicket && selectedTicket.title,
        description: selectedTicket && selectedTicket.description,
        comments: selectedTicket && selectedTicket.comments,
        listId: props.selectedList.id
      };
    } return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: '',
      description: '',
      comments: null,
      comment: '',
      listId: null
    };
  }

  handleChange = (key, value) => {
    const {
      id, title, description, comments, listId
    } = this.state;
    const ticketObject = {
      id, title, description, comments
    };
    Object.assign(ticketObject, { [key]: value });
    this.setState({ [key]: value }, () => {
      this.props.changeTicketDetails(listId, {
        id: ticketObject.id,
        title: ticketObject.title,
        description: ticketObject.description,
        comments: ticketObject.comments
      });
    });
  }

  addComment =() => {
    const {
      id, title, description, comments, comment, listId
    } = this.state;
    comments.unshift(comment);
    this.props.changeTicketDetails(listId, {
      id,
      title,
      description,
      comments
    });
    this.setState({ comment: '' });
  }

  render() {
    const {
      title, description, comments, comment
    } = this.state;
    return (
      <div
        className="modal fade ticketModalContainer"
        id="ticketModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ticketModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header p-0">
              <div className="d-flex justify-content-between align-items-center p-3 w-100">
                <div className="w-90 d-flex align-items-center">
                  <h4 className="mb-0"><i className="fas fa-ticket-alt pr-2" /></h4>
                  <h5 className="mb-0 w-90">
                      Ticket Detail
                  </h5>
                </div>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={e => this.handleChange('title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">Description:</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={e => this.handleChange('description', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">Comment:</label>
                  <div className="align-items-center d-flex">
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={comment}
                      onChange={e => this.handleChange('comment', e.target.value)}
                    />
                    <i
                      role="presentation"
                      onClick={this.addComment}
                      className="fas fa-save p-3 pointer"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="d-flex">
                    <i className="fas fa-comments mr-2" />
                    <span>Comments</span>
                  </div>
                  {comments && comments.map(newComment => (
                    <div key={newComment} className="p-3 border-bottom d-flex align-items-center">
                      <i className="far fa-comment mr-2" />
                      <span>{newComment}</span>
                    </div>))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TicketModal.propTypes = {
  changeTicketDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  board: state.trello.board
});

const mapDispatchToProps = dispatch => ({
  changeTicketDetails: (listId, data) =>
    dispatch(TrelloAction.changeTicketDetails(listId, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketModal);
