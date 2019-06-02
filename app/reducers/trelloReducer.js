import trelloActions from '../constants/trelloAction';

const initialState = {
  board: {
    title: 'Happy Fox',
    lists: [
      {
        id: String(Math.random()),
        title: 'Agile Development template',
        tickets: [
          {
            id: String(Math.random()),
            title: 'Give Notice',
            description: 'Move fast without losing sight by adopting an agile workflow that gives your team perspective during any project management situation',
            comments: ['Agile', 'Development']
          },
          {
            id: String(Math.random()),
            title: 'Keep All codes',
            description: 'Keep all code, spec, and plans easily accessile in one location for more organized producr development',
            comments: ['All code', 'develpoment']
          },
          {
            id: String(Math.random()),
            title: 'Collaboration',
            description: 'Collaborrate seamlessly with engineers, product and scrum masters.',
            comments: ['Collaboration', 'scrum masters']
          }
        ]
      },
      {
        id: String(Math.random()),
        title: 'Sprint Backlog',
        tickets: [
          {
            id: String(Math.random()),
            title: 'New Team/ board tab',
            description: 'Clicking the collection beneath a aboard should filter by collection, not open collections pop-over',
            comments: ['Bugs', 'Error to be fixed soon']
          },
          {
            id: String(Math.random()),
            title: 'Team board page',
            description: 'BC3 team boards page: Show other provate boards',
            comments: ['team Board', 'Private']
          }
        ]
      }
    ]
  }
};

const trelloReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case trelloActions.HANDLE_TICKET_SORT: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd
      } = action.data;
      const DraggedList = newState.board.lists.find(list => list.id === droppableIdStart);
      const ticket = DraggedList.tickets.splice(droppableIndexStart, 1);
      if (droppableIdStart === droppableIdEnd) {
        DraggedList.tickets.splice(droppableIndexEnd, 0, ...ticket);
      } else {
        const DroppedList = newState.board.lists.find(list => list.id === droppableIdEnd);
        DroppedList.tickets.splice(droppableIndexEnd, 0, ...ticket);
      }
      return newState;
    }
    case trelloActions.CHANGE_BOARD_TITLE: {
      newState.board.title = action.value;
      return newState;
    }
    case trelloActions.ADD_ANOTHER_LIST: {
      const list = {
        id: String(Math.random()),
        title: 'New List',
        tickets: []
      };
      newState.board.lists.push(list);
      return newState;
    }
    case trelloActions.DELETE_LIST: {
      const newList = newState.board.lists.filter(list => list.id !== action.listId);
      newState.board.lists = newList;
      return newState;
    }
    case trelloActions.CHANGE_TICKET_DETAILS: {
      const { data, listId } = action;
      const newList = newState.board.lists.find(list => list.id === listId);
      const newTicket = newList.tickets.find(ticket => ticket.id === data.id);
      newList.tickets.splice(newList.tickets.indexOf(newTicket), 1, data);
      return newState;
    }
    case trelloActions.ADD_NEW_CARD: {
      const { listId } = action;
      const newList = newState.board.lists.find(list => list.id === listId);
      newList.tickets.push({
        id: String(Math.random()),
        title: 'New Card',
        description: '',
        comments: []
      });
      return newState;
    }
    case trelloActions.DELETE_TICKET: {
      const { listId, ticketId } = action;
      const selectedList = newState.board.lists.find(list => list.id === listId);
      const newTickets = selectedList.tickets.filter(ticket => ticket.id !== ticketId);
      selectedList.tickets = newTickets;
      return newState;
    }
    default:
      return state;
  }
};

export default trelloReducer;
