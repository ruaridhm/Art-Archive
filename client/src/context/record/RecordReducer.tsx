import { AxiosResponse } from 'axios';
import { RecordInterface } from '../../components/records/RecordItem/RecordItem';
import {
  GET_RECORDS,
  ADD_RECORD,
  DELETE_RECORD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_RECORD,
  FILTER_RECORDS,
  FILTER_RECORDS_NEW,
  CLEAR_FILTER,
  RECORD_ERROR,
  CLEAR_RECORDS,
  SET_MOVE_RECORD,
} from '../types';

type Actions =
  | {
      type: 'GET_RECORDS';
      payload: Array<any>;
    }
  | {
      type: 'ADD_RECORD';
      payload: AxiosResponse<any>;
    }
  | {
      type: 'DELETE_RECORD';
      payload: string;
    }
  | {
      type: 'SET_CURRENT';
      payload: RecordInterface;
    }
  | {
      type: 'CLEAR_CURRENT';
    }
  | {
      type: 'UPDATE_RECORD';
      payload: { _id: string };
    }
  | {
      type: 'FILTER_RECORDS';
      payload: { text: string; searchBy: string };
    }
  | {
      type: 'FILTER_RECORDS_NEW';
      payload: { text: string; searchBy: string };
    }
  | {
      type: 'CLEAR_FILTER';
    }
  | {
      type: 'RECORD_ERROR';
      payload: string;
    }
  | {
      type: 'CLEAR_RECORDS';
    }
  | {
      type: 'SET_MOVE_RECORD';
      payload: RecordInterface;
    };

// interface Record {
//   records: Array<RecordInterface> | null;
//   current: RecordInterface | null;
//   moveRecord: RecordInterface | null;
//   filtered: Array<RecordInterface> | null;
//   error: string | null;
//   loading: boolean;
// }

// type State = Record;

const RecordReducer = (state: any, action: Actions) => {
  switch (action.type) {
    case GET_RECORDS:
      return {
        ...state,
        records: action.payload,
        loading: false,
      };
    case ADD_RECORD:
      return {
        ...state,
        records: [action.payload, ...state?.records],
        loading: false,
      };
    case UPDATE_RECORD:
      return {
        ...state,
        records: state?.records?.map((record: RecordInterface) =>
          record._id === action.payload._id ? action.payload : record
        ),
        loading: false,
      };
    case DELETE_RECORD:
      return {
        ...state,
        records: state?.records?.filter(
          (record: RecordInterface) => record._id !== action.payload
        ),
        loading: false,
      };
    case CLEAR_RECORDS:
      return {
        ...state,
        records: null,
        filtered: null,
        error: null,
        current: null,
        moveRecord: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case SET_MOVE_RECORD:
      return {
        ...state,
        moveRecord: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_RECORDS_NEW:
      const getEachItem = (records: RecordInterface[], searchBy: string) => {
        let result: string[] = [];
        const searchItem = (
          record: RecordInterface,
          _id: string,
          searchBy: string
        ) => {
          Object.keys(record).forEach((key) => {
            if (typeof record[key] === 'object') {
              if (record[key] === null) {
                return;
              } else {
                searchItem(record[key], _id, searchBy);
              }
            }
            console.log(
              'searchBy =',
              searchBy,
              'record[key] =',
              record[key],
              'keyName =',
              record[key].hasOwnProperty(searchBy)
            );
            if (
              typeof record[key] === 'string' &&
              record[key].hasOwnProperty(searchBy)
            ) {
              let searchAsRegEx = new RegExp(action.payload.text, 'gi');
              if (record[key].match(searchAsRegEx)) {
                result.push(_id!);
              }
            } else if (typeof record[key] === 'string' && searchBy === 'all') {
              let searchAsRegEx = new RegExp(action.payload.text, 'gi');
              if (record[key].match(searchAsRegEx)) {
                result.push(_id!);
              }
            }
          });
        };
        records.forEach((record: RecordInterface) => {
          searchItem(record, record._id!, searchBy);
        });
        // @ts-ignore
        let uniqueResults = [...new Set(result)];
        let computedResult = uniqueResults.map((_id) => {
          return records.find((record: RecordInterface) => record._id === _id);
        });
        return computedResult;
      };

      return {
        ...state,
        filtered: [...getEachItem(state.records, action.payload.searchBy)],
      };

    // case FILTER_RECORDS_NEW_ORIGINAL:
    //   const getEachItem = (records: RecordInterface[]) => {
    //     let result: string[] = [];
    //     const searchItem = (record: RecordInterface, _id: string) => {
    //       Object.keys(record).forEach((key) => {
    //         if (typeof record[key] === 'object') {
    //           if (record[key] === null) {
    //             return;
    //           } else {
    //             searchItem(record[key], _id);
    //           }
    //         }
    //         if (typeof record[key] === 'string') {
    //           let searchAsRegEx = new RegExp(action.payload.text, 'gi');
    //           if (record[key].match(searchAsRegEx)) {
    //             result.push(_id!);
    //           }
    //         }
    //       });
    //     };
    //     records.forEach((record: RecordInterface) => {
    //       searchItem(record, record._id!);
    //     });
    //     // @ts-ignore
    //     let uniqueResults = [...new Set(result)];
    //     let computedResult = uniqueResults.map((_id) => {
    //       return records.find((record: RecordInterface) => record._id === _id);
    //     });
    //     return computedResult;
    //   };

    //   return {
    //     ...state,
    //     filtered: [...getEachItem(state.records)],
    //   };
    case FILTER_RECORDS:
      return {
        ...state,
        filtered: state?.records?.filter((record: RecordInterface) => {
          const regex = new RegExp(`${action.payload.text}`, 'gi');
          switch (action.payload.searchBy) {
            case 'title':
              return record?.title?.match(regex);

            case 'artist':
              return record?.artist?.match(regex);

            case 'reference':
              return record?.reference?.match(regex);

            case 'collectionName':
              return record?.collectionName?.match(regex);

            case 'size':
              return record?.size?.match(regex);

            case 'medium':
              return record?.medium?.match(regex);

            case 'currentLocation':
              return record?.currentLocation?.match(regex);

            case 'notes':
              return record?.notes?.match(regex);

            default:
              return [];
          }

          //TODO add functionality to search by price and date?
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case RECORD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default RecordReducer;
