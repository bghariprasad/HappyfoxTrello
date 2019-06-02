import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import EditableContent from '../../components/EditableContent';
import Ticket from '../Ticket';
import TrelloAction from '../../actions/trello';
import TicketModal from '../TicketModal';
import '../../../assets/styles/TaskList.scss';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: { id: '', title: '', ticket: {} }
    };
  }

  chooseList = (id, title, ticket = {}) => {
    this.setState({ selectedList: { id, title, ticket } });
  }

  render() {
    const { selectedList } = this.state;
    return (
      <div className="ListWrapperContainer d-flex">
        <TicketModal selectedList={selectedList} />
        {this.props.board.lists.map(list => (
          <Droppable key={list.id} droppableId={String(list.id)}>
            {provided => (
              <section
                {...provided.draggableProps}
                ref={provided.innerRef}
                id={list.id}
              >
                <section className="ListContainer mr-3">
                  <div className="d-flex justify-content-between align-items-center px-2">
                    <h6 className="m-0">
                      <EditableContent className="my-2" editedText={value => this.changeTitle(value)}>
                        {list.title}
                      </EditableContent>
                    </h6>
                    <i
                      role="presentation"
                      onClick={() => this.props.deleteList(list.id)}
                      className="far fa-trash-alt pr-2 text-secondary pointer delete"
                    />
                  </div>
                  {list.tickets.map((ticket, index) =>
                    (<Ticket
                      key={`ticker-${ticket.id}`}
                      listId={list.id}
                      index={index}
                      ticket={ticket}
                      onChooseList={() => this.chooseList(list.id, list.title, ticket)}
                    />))}
                  <span
                    className="p-1 pb-2 mt-2 addAnotherCard"
                    role="presentation"
                    onClick={() => this.props.addNewCard(list.id)}
                  >
                    <i className="fas fa-plus-circle mr-1" />
                    <span>Add card</span>
                  </span>
                  {provided.placeholder}
                </section>
              </section>
            )}
          </Droppable>
        ))}
      </div>
    );
  }
}

TaskList.propTypes = {
  board: PropTypes.object.isRequired,
  deleteList: PropTypes.func.isRequired,
  addNewCard: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  board: state.trello.board
});

const mapDispatchToProps = dispatch => ({
  deleteList: listId => dispatch(TrelloAction.deleteList(listId)),
  addNewCard: listId => dispatch(TrelloAction.addNewCard(listId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
