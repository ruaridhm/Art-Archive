import React, { useReducer } from 'react';
import RecordContext from './RecordContext';
import RecordReducer from './RecordReducer';
import { RecordInterface } from '../../components/records/RecordItem/RecordItem';
import { ImgInterface } from '../../components/records/RecordItem/RecordItemDialog';
import axios from 'axios';
import {
  GET_RECORDS,
  ADD_RECORD,
  DELETE_RECORD,
  DELETE_CLOUDINARY_IMAGE,
  BULK_DELETE_CLOUDINARY_IMAGE,
  SET_CURRENT,
  SET_MOVE_RECORD,
  CLEAR_CURRENT,
  UPDATE_RECORD,
  FILTER_RECORDS,
  FILTER_RECORDS_ALL,
  FILTER_RECORDS_ARRAY,
  CLEAR_RECORDS,
  CLEAR_FILTER,
  RECORD_ERROR,
} from '../types';

const RecordState: React.FC = ({ children }) => {
  const initialState = {
    records: null,
    current: null,
    moveRecord: null,
    filtered: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(RecordReducer, initialState);

  // Get Records
  const getRecords = async () => {
    try {
      const res = await axios.get('/api/collection');
      dispatch({ type: GET_RECORDS, payload: res.data });
    } catch (err) {
      dispatch({
        type: RECORD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Record
  const addRecord = async (record: RecordInterface) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/collection', record, config);
      dispatch({ type: ADD_RECORD, payload: res.data });
    } catch (err) {
      dispatch({
        type: RECORD_ERROR,
        payload: err.response.msg,
      });
    }
  };
  //Delete Record
  const deleteRecord = async (id: string) => {
    try {
      await axios.delete(`/api/collection/${id}`);
      dispatch({
        type: DELETE_RECORD,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: RECORD_ERROR,
        payload: err.response.msg,
      });
    }
  };
  //Delete Image from Cloudinary
  const deleteCloudinaryImage = async (public_Id: string) => {
    try {
      await axios.delete(`/api/cloudinary/${public_Id}`);
      dispatch({
        type: DELETE_CLOUDINARY_IMAGE,
        payload: public_Id,
      });
    } catch (err) {
      dispatch({
        type: RECORD_ERROR,
        payload: err.response.msg,
      });
    }
  };
  const bulkDeleteCloudinaryImage = async (public_Id_Arr) => {
    console.log('bulkDeleteCloudinaryImage recordState.tsx reached');
    try {
      await axios.delete(`/api/cloudinary/bulk/${public_Id_Arr}`);
      dispatch({
        type: BULK_DELETE_CLOUDINARY_IMAGE,
        payload: public_Id_Arr,
      });
    } catch (err) {
      console.log('error');
      dispatch({
        type: RECORD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Update Record
  const updateRecord = async (record: RecordInterface) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/collection/${record._id}`,
        record,
        config
      );
      dispatch({
        type: UPDATE_RECORD,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: RECORD_ERROR,
        payload: err.response.msg,
      });
    }
  };
  //Clear Records
  const clearRecords = () => {
    dispatch({ type: CLEAR_RECORDS });
  };
  //Set Current Record
  const setCurrent = (record: RecordInterface) => {
    dispatch({ type: SET_CURRENT, payload: record });
  };
  //Set Move Record
  const setMoveRecord = (record: RecordInterface) => {
    dispatch({ type: SET_MOVE_RECORD, payload: record });
  };
  //Clear Current Record
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //Filter Records
  const filterRecords = (text: string, searchBy: string) => {
    dispatch({
      type: FILTER_RECORDS,
      payload: { text: text, searchBy: searchBy },
    });
  };
  //Filter Records All
  const filterRecordsAll = (text: string, searchBy: string) => {
    dispatch({
      type: FILTER_RECORDS_ALL,
      payload: { text: text, searchBy: searchBy },
    });
  };
  //Filter Records All
  const filterRecordsArray = (text: string, searchBy: string) => {
    dispatch({
      type: FILTER_RECORDS_ARRAY,
      payload: { text: text, searchBy: searchBy },
    });
  };
  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <RecordContext.Provider
      value={{
        records: state.records,
        current: state.current,
        moveRecord: state.moveRecord,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addRecord,
        deleteRecord,
        deleteCloudinaryImage,
        bulkDeleteCloudinaryImage,
        setCurrent,
        setMoveRecord,
        clearCurrent,
        updateRecord,
        filterRecords,
        filterRecordsAll,
        filterRecordsArray,
        clearFilter,
        getRecords,
        clearRecords,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
};

export default RecordState;
