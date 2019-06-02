import trelloActions from '../constants/trelloAction';

const initialState = {
  board: {
    title: 'Board-Title',
    lists: [
      {
        id: String(Math.random()),
        title: 'list-1',
        tickets: [
          {
            id: String(Math.random()),
            title: 'list-1-cardTitle-1',
            description: 'list-1-description-1',
            comments: ['comments-1', 'comments-2']
          },
          {
            id: String(Math.random()),
            title: 'list-1-cardTitle-2',
            description: 'list-1-description-2',
            comments: ['comments-1', 'comments-2']
          },
          {
            id: String(Math.random()),
            title: 'list-1-cardTitle-3',
            description: 'list-1-description-3',
            comments: ['comments-1', 'comments-2']
          },
          {
            id: String(Math.random()),
            title: 'list-1-cardTitle-4',
            description: 'list-1-description-4',
            comments: ['comments-1', 'comments-2']
          },
          {
            id: String(Math.random()),
            title: 'list-1-cardTitle-5',
            description: 'list-1-description-5',
            comments: ['comments-1', 'comments-2']
          }
        ]
      },
      {
        id: String(Math.random()),
        title: 'list-2',
        tickets: [
          {
            id: String(Math.random()),
            title: 'list-2-cardTitle-1',
            description: 'list-2-description-1',
            comments: ['comments-1', 'comments-2']
          },
          {
            id: String(Math.random()),
            title: 'list-2-cardTitle-2',
            description: 'list-2-description-2',
            comments: ['comments-1', 'comments-2']
          },
          {
            id: String(Math.random()),
            title: 'list-2-cardTitle-3',
            description: 'list-2-description-3',
            comments: ['comments-1', 'comments-2']
          },
          {
            id: String(Math.random()),
            title: 'list-2-cardTitle-4',
            description: 'list-2-description-4',
            comments: ['comments-1', 'comments-2', 'comments-3']
          }
        ]
      },
      {
        id: String(Math.random()),
        title: 'list-3',
        tickets: [
          {
            id: String(Math.random()),
            title: 'list-3-cardTitle-1',
            description: 'list-3-description-1',
            comments: ['comments-1', 'comments-2']
          },
          {
            id: String(Math.random()),
            title: 'list-3-cardTitle-2',
            description: 'list-3-description-2',
            comments: ['comments-1', 'comments-2']
          },
          {
            id: String(Math.random()),
            title: 'list-3-cardTitle-3',
            description: 'list-3-description-3',
            comments: ['comments-1', 'comments-2']
          },
          {
            id: String(Math.random()),
            title: 'list-3-cardTitle-4',
            description: 'list-3-description-4',
            comments: ['comments-1', 'comments-2', 'comments-3']
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
