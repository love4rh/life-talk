import { updateAppData } from '../app/AppData';


export const actChangeBoard = (boardID) => {
  updateAppData('currentBoardID', boardID);
}
