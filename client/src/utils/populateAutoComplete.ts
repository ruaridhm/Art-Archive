import { useContext } from 'react';
import RecordContext from '../context/record/RecordContext';

interface ValueInterface {
  title: string[] | [];
  collectionName: string[] | [];
  size: string[] | [];
  medium: string[] | [];
  currentLocation: string[] | [];
  exhibited: { title: string[] | []; address: string[] | [] };
  submission: { title: string[] | []; address: string[] | [] };
  sales: { soldTo: string[] | []; soldBy: string[] | [] };
  mediaLinks: { title: string[] | []; address: string[] | [] };
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

  const populate = (item: string, subItem: string = 'noItem'): void => {
    records.forEach((record) => {
      if (Array.isArray(record[item])) {
        //item is an Array of Objects
        //eg: Exhibited, Submission, MediaLinks

        record[item].forEach((element: { title: string; address: string }) => {
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
        });
      } else if (typeof record[item] === 'object') {
        //item is  an Objects
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
        //item is  a String
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
        console.log(item, 'hits else');
      }
    });
  };

  populate('title');
  populate('collectionName');
  populate('size');
  populate('medium');
  populate('currentLocation');
  populate('exhibited', 'title');
  populate('exhibited', 'address');
  populate('submission', 'title');
  populate('submission', 'address');
  populate('sales', 'soldTo');
  populate('sales', 'soldBy');
  populate('mediaLinks', 'title');
  populate('mediaLinks', 'address');

  return values;
};
export default PopulateAutoComplete;
