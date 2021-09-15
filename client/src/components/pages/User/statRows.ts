import {
  totalItems,
  totalEditions,
  totalCollections,
  latestEarliestDate,
  avgPrice,
  highLowNumb,
  totalArrTitleCount,
  mostPopularCount,
} from './CollectionStatFunctions';
import { RecordInterface } from '../../records/RecordItem/RecordItem';
import { TableRowInterface } from './StatTable';

const statRows = (records: RecordInterface[]) => {
  const tableRows: TableRowInterface[] = [];

  const createData = (name: string, value: string | number, item?: string) => {
    return { name, value, item };
  };

  tableRows.push(createData('Total Items: ', totalItems(records)));
  tableRows.push(
    createData('Total Items Including Editions:', totalEditions(records))
  );
  tableRows.push(
    createData('Number of Collections: ', totalCollections(records))
  );
  tableRows.push(
    createData(
      'Earliest Item',
      latestEarliestDate(records, 'earliest')!.dateString,
      latestEarliestDate(records, 'earliest')!.title
    )
  );
  // tableRows.push(createData('Earliest Item', 'No Dates Set'));
  // tableRows.push(createData('Latest Item', latestDate()))
  tableRows.push(
    createData(
      'Highest Price',
      `€${highLowNumb(records, 'price').value}`,
      highLowNumb(records, 'price').title
    )
  );
  tableRows.push(
    createData(
      'Lowest Price',
      `€${highLowNumb(records, 'price', true).value}`,
      highLowNumb(records, 'price', true).title
    )
  );
  tableRows.push(createData('Average Price', `€${avgPrice(records)}`));
  tableRows.push(
    createData('Total Exhibitions', totalArrTitleCount(records, 'exhibitions'))
  );
  tableRows.push(
    createData('Total Submissions', totalArrTitleCount(records, 'submissions'))
  );
  tableRows.push(
    createData(
      'Latest Sold',
      latestEarliestDate(records, 'latest').dateString,
      `${latestEarliestDate(records, 'latest').title}  ${
        latestEarliestDate(records, 'latest').edition
      }`
    )
  );
  tableRows.push(
    createData(
      'Most Popular Medium',
      mostPopularCount(records, 'medium').result,
      mostPopularCount(records, 'medium').count.toString()
    )
  );
  tableRows.push(
    createData(
      'Most Popular Size',
      mostPopularCount(records, 'size').result,
      mostPopularCount(records, 'size').count.toString()
    )
  );
  tableRows.push(
    createData(
      'Most Editions',
      highLowNumb(records, 'editions').value,
      highLowNumb(records, 'editions').title
    )
  );

  return tableRows;
};

export default statRows;
