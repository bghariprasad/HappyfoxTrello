import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import TrelloAction from '../../actions/trello';

const Ticket = props => {
  const {
    id, title, description, comments
  } = props.ticket;
  return (
    <Draggable draggableId={String(id)} index={props.index}>
      {provided => (
        <section
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          id={id}
        >
          <div
            role="presentation"
            onClick={() => {
              $('#ticketModal').modal('show');
              props.onChooseList();
            }}
            className="ticketContainer card m-2"
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className="px-2 pt-1 title">{title}</span>
              <i
                role="presentation"
                className="far fa-trash-alt p-2 text-secondary pointer trash"
                onClick={e => {
                  e.stopPropagation();
                  props.deleteTicket(props.listId, id);
                }}
              />
            </div>
            {description && <span className="px-2 pt-1 description">{description}</span>}
            {comments.length > 0 &&
            <div
              className="comments pointer p-2"
              data-toggle="tooltip"
              data-placement="right"
              title={`Ticket has ${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`}
            >
              <i className="far fa-comment pr-1" />
              <span>{comments.length}</span>
            </div>}
          </div>
        </section>
      )}
    </Draggable>
  );
};

Ticket.propTypes = {
  onChooseList: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  ticket: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  deleteTicket: (listId, ticketId) => dispatch(TrelloAction.deleteTicket(listId, ticketId))
});

export default connect(null, mapDispatchToProps)(Ticket);
