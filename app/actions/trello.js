import BaseAction from './BaseAction';
import constants from '../constants/trelloAction';

class TrelloAction extends BaseAction {
  constructor() {
    super({
      handleTicketSort: {
        type: constants.HANDLE_TICKET_SORT,
        params: ['data']
      },
      changeBoardTitle: {
        type: constants.CHANGE_BOARD_TITLE,
        params: ['value']
      },
      addAnotherList: {
        type: constants.ADD_ANOTHER_LIST,
        params: []
      },
      deleteList: {
        type: constants.DELETE_LIST,
        params: ['listId']
      },
      changeTicketDetails: {
        type: constants.CHANGE_TICKET_DETAILS,
        params: ['listId', 'data']
      },
      addNewCard: {
        type: constants.ADD_NEW_CARD,
        params: ['listId']
      },
      deleteTicket: {
        type: constants.DELETE_TICKET,
        params: ['listId', 'ticketId']
      }
    });
  }
}

export default new TrelloAction();
