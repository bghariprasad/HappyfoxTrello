import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import TopNavBar from '../../components/NavBar/TopNavBar';
import EditableContent from '../../components/EditableContent';
import TaskList from '../TaskList';
import TrelloAction from '../../actions/trello.js';

class HomePage extends React.Component {
  handleDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (destination) {
      this.props.handleTicketSort({
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        draggableId
      });
    }
  }

  render() {
    return (
      <section>
        <TopNavBar />
        <section className="container-fluid">
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <div
              className="d-flex justify-content-between align-items-center border-bottom py-3 px-2"
            >
              <h4 className="m-0">
                <EditableContent className="hover" editedText={value => this.props.changeBoardTitle(value)}>
                  {this.props.board.title}
                </EditableContent>
              </h4>
              <button
                className="btn primary-btn px-4"
                onClick={() => this.props.addAnotherList()}
              >Add Another List
              </button>
            </div>
            <div className="listWrapper-container px-1 py-3">
              <TaskList />
            </div>
          </DragDropContext>
        </section>
      </section>
    );
  }
}

HomePage.propTypes = {
  handleTicketSort: PropTypes.func.isRequired,
  changeBoardTitle: PropTypes.func.isRequired,
  addAnotherList: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  board: state.trello.board
});

const mapDispatchToProps = dispatch => ({
  handleTicketSort: data => dispatch(TrelloAction.handleTicketSort(data)),
  changeBoardTitle: value => dispatch(TrelloAction.changeBoardTitle(value)),
  addAnotherList: () => dispatch(TrelloAction.addAnotherList())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
