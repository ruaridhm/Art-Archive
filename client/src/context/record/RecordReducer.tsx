import { AxiosResponse } from 'axios';
import { RecordInterface } from '../../components/records/RecordItem/RecordItem';
import { ImgInterface } from '../../components/records/RecordItem/RecordItemDialog';
import {
  GET_RECORDS,
  ADD_RECORD,
  DELETE_RECORD,
  DELETE_CLOUDINARY_IMAGE,
  BULK_DELETE_CLOUDINARY_IMAGE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_RECORD,
  FILTER_RECORDS,
  FILTER_RECORDS_ALL,
  FILTER_RECORDS_ARRAY,
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
      type: 'DELETE_CLOUDINARY_IMAGE';
      payload: string;
    }
  | {
      type: 'BULK_DELETE_CLOUDINARY_IMAGE';
      payload: string[];
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
      type: 'FILTER_RECORDS_ALL';
      payload: { text: string; searchBy: string };
    }
  | {
      type: 'FILTER_RECORDS_ARRAY';
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

const RecordReducer = (state: any, action: Actions) => {
  const getEachItem = (
    records: RecordInterface[],
    action: {
      type: 'FILTER_RECORDS_ALL' | 'FILTER_RECORDS_ARRAY';
      payload: { text: string; searchBy: string };
    }
  ) => {
    let result: string[] = [];
    const searchItem = (
      record: RecordInterface,
      _id: string,
      searchBy: string
    ) => {
      let searchAsRegEx = new RegExp(action.payload.text, 'gi');

      if (searchBy === 'all') {
        Object.keys(record).forEach((key) => {
          if (typeof record[key] === 'object') {
            if (record[key] === null) {
            } else {
              searchItem(record[key], _id, searchBy);
            }
          }
          if (
            typeof record[key] === 'string' &&
            record[key].hasOwnProperty(searchBy)
          ) {
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
      } else {
        let searchArray: string = '';
        switch (searchBy) {
          case 'exhibitionsTitle':
          case 'exhibitionsAddress':
            searchArray = 'exhibitions';
            break;
          case 'submissionsTitle':
          case 'submissionsAddress':
            searchArray = 'submissions';
            break;
          case 'title':
          case 'link':
            searchArray = 'mediaLinks';
            break;
          case 'soldTo':
          case 'soldBy':
            searchArray = 'sales';
            break;
          default:
            console.error('hit default case,something went wrong.....');
            break;
        }
        if (record[searchArray][searchBy].match(searchAsRegEx)) {
          result.push(_id!);
        }
      }

      // Object.keys(record).forEach((key) => {
      //   if (typeof record[key] === 'object') {
      //     if (record[key] === null) {
      //       return;
      //     } else {
      //       searchItem(record[key], _id, searchBy);
      //     }
      //   }
      //   if (
      //     typeof record[key] === 'string' &&
      //     record[key].hasOwnProperty(searchBy)
      //   ) {

      //     if (record[key].match(searchAsRegEx)) {
      //       result.push(_id!);
      //     }
      //   }

      // });
    };
    records.forEach((record: RecordInterface) => {
      searchItem(record, record._id!, action.payload.searchBy);
    });
    // @ts-ignore
    let uniqueResults = [...new Set(result)];
    let computedResult = uniqueResults.map((_id) => {
      return records.find((record: RecordInterface) => record._id === _id);
    });
    return computedResult;
  };

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
    case DELETE_CLOUDINARY_IMAGE:
      return {
        ...state,

        loading: false,
      };
    case BULK_DELETE_CLOUDINARY_IMAGE:
      return {
        ...state,

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
    case FILTER_RECORDS_ALL:
      return {
        ...state,
        filtered: [...getEachItem(state.records, action)],
      };

    case FILTER_RECORDS_ARRAY:
      return {
        ...state,
        filtered: [...getEachItem(state.records, action)],
      };
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
