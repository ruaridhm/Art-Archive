import { useContext } from 'react';
import { RecordInterface } from '../components/records/RecordItem/RecordItem';
import RecordContext from '../context/record/RecordContext';

// interface SalesValueInterface {
//   soldTo: string[] | [];
//   soldBy: string[] | [];
// }

interface ValueArraysInterface {
  title: string[] | [];
  address: string[] | [];
}
interface ValueInterface {
  title: string[] | [];
  collectionName: string[] | [];
  size: string[] | [];
  medium: string[] | [];
  currentLocation: string[] | [];
  exhibited: ValueArraysInterface;
  submission: ValueArraysInterface;
  // sales: SalesValueInterface;
  mediaLinks: ValueArraysInterface;
  [item: string]: any;
}

const PopulateAutoComplete = (): ValueInterface => {
  const recordContext = useContext(RecordContext);
  const { records } = recordContext;

  const values: ValueInterface = {
    title: [],
    collectionName: [],
    size: [],
    medium: [],
    currentLocation: [],
    exhibited: { title: [], address: [] },
    submission: { title: [], address: [] },
    sales: { soldTo: [], soldBy: [] },
    mediaLinks: { title: [], address: [] },
  };

  const populate = (
    records: RecordInterface[] | null,
    item: string,
    subItem: string = 'noItem'
  ): void => {
    records?.forEach((record: RecordInterface) => {
      if (Array.isArray(record[item])) {
        //item is an Array of Objects
        //eg: Exhibited, Submission, MediaLinks

        record[item].forEach(
          (element: {
            title: string;
            address: string;
            [subItem: string]: any;
          }) => {
            if (element[subItem] !== undefined && element[subItem] !== '') {
              if (
                !values[item][subItem].some(
                  (value: { [x: string]: any }) =>
                    value[subItem] === element[subItem]
                )
              ) {
                values[item][subItem].push({ title: element[subItem] });
              }
            }
          }
        );
      } else if (typeof record[item] === 'object') {
        //item is an Object
        //eg: Sales

        if (
          !values[item][subItem].some(
            (value: { title: string }) => value.title === record[item][subItem]
          ) &&
          record[item][subItem] !== ''
        ) {
          values[item][subItem].push({ title: record[item][subItem] });
        }
      } else if (typeof record[item] === 'string') {
        //item is a String
        //eg: Title, CollectionName, Size, Medium, CurrentLocation,

        if (
          !values[item].some(
            (value: { title: string }) => value.title === record[item]
          ) &&
          record[item] !== ''
        ) {
          values[item].push({ title: record[item] });
        }
      } else {
        //Handle Error
        console.error(item, 'PopulateAutoComplete hits else (line 81)');
      }
    });
  };

  populate(records, 'title');
  populate(records, 'collectionName');
  populate(records, 'size');
  populate(records, 'medium');
  populate(records, 'currentLocation');
  populate(records, 'exhibited', 'title');
  populate(records, 'exhibited', 'address');
  populate(records, 'submission', 'title');
  populate(records, 'submission', 'address');
  // populate(records, 'sales', 'soldTo');
  // populate(records, 'sales', 'soldBy');
  populate(records, 'mediaLinks', 'title');
  populate(records, 'mediaLinks', 'address');

  return values;
};
export default PopulateAutoComplete;
