import { environment } from '../environments/environment';
import * as io from 'socket.io-client';

//export const socket = io(`${environment.socket}`, {secure: true});
export const socket = io(`${environment.socket}`, {secure: false});

export default function (dispatch, getState) {
  socket.on('document.convert.task.changed', data => {
    dispatch({
      type: 'UPDATE_CONVERSION',
      conversion: data.task
    });
  });
}
