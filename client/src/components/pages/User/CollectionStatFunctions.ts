import { RecordInterface } from '../../records/RecordItem/RecordItem';

export const totalItems = (records: RecordInterface[]): number => {
  return records!.length;
};

export const totalEditions = (records: RecordInterface[]) => {
  let total: number = 0;
  records?.forEach((elem) => {
    if (elem.editions) {
      total += elem.editions;
    }
  });
  return total;
};
export const totalCollections = (records: RecordInterface[]) => {
  let total: string[] = [];
  records?.forEach((elem) => {
    if (elem.collectionName !== '' && elem.collectionName !== undefined) {
      if (!total.includes(elem.collectionName)) {
        total.push(elem.collectionName);
      }
    }
  });
  return total.length;
};

export const latestEarliestDate = (
  records: RecordInterface[],
  range: string
) => {
  interface datesInterface {
    title: string;
    edition: string;
    soldDate: Date;
    dateString?: string;
  }

  const dates: datesInterface[] = [];
  records!.forEach((elem) => {
    elem.sales!.forEach((item) => {
      item.soldDate !== null &&
        item.soldDate !== undefined &&
        dates.push({
          title: elem.title!,
          edition: `edition: ${item.edition}`,
          soldDate: item.soldDate!,
        });
    });
  });
  if (dates.length === 0) {
    return {
      title: '',
      edition: '',
      dateString: 'No dates set',
    };
  } else {
    let latest = dates[0];
    for (let i = 1; i < dates.length; i++) {
      let newDate = new Date(dates[i].soldDate).getTime();
      let latestDate = new Date(latest.soldDate).getTime();
      if (range === 'latest') {
        if (newDate > latestDate) {
          latest = dates[i];
        }
      } else if (range === 'earliest') {
        if (newDate < latestDate) {
          latest = dates[i];
        }
      }
    }
    latest.dateString = `${latest.soldDate
      .toString()
      .substring(8, 10)}/${latest.soldDate
      .toString()
      .substring(5, 7)}/${latest.soldDate.toString().substring(0, 4)}`;

    return latest;
  }
};

export const avgPrice = (records: RecordInterface[]) => {
  const prices = records!.map((elem) => {
    return elem.price;
  });

  let average =
    //@ts-ignore
    prices.reduce((total, prices) => total! + prices!) / prices.length;
  return average.toFixed(2);
};

export const highLowNumb = (
  records: RecordInterface[],
  value: string,
  lowest?: boolean
) => {
  let result: { value: number; title: string } = {
    value: lowest ? 99999999999 : 0,
    title: '',
  };
  records?.forEach((elem) => {
    if (lowest) {
      if (elem[value] < result.value) {
        result = { value: elem[value], title: elem.title! };
      }
    } else {
      if (elem[value] > result.value) {
        result = { value: elem[value], title: elem.title! };
      }
    }
  });
  if (lowest) {
    if (result.value === 99999999999) {
      return { value: 0, title: 'No values set.' };
    } else {
      return result;
    }
  } else {
    if (result.value === 0) {
      return { value: 0, title: 'No values set.' };
    } else {
      return result;
    }
  }
};

export const totalArrTitleCount = (
  records: RecordInterface[],
  value: string
) => {
  const total: string[] = [];
  records?.forEach((record) => {
    record[value].forEach((elem: { title: string }) => {
      if (
        (total.includes(elem.title) && elem) ||
        elem.title === undefined ||
        elem.title === ''
      ) {
        return;
      } else {
        total.push(elem.title);
      }
    });
  });
  return total.length;
};

export const mostPopularCount = (records: RecordInterface[], value: string) => {
  interface totalInterface {
    value: string;
    count: number;
  }
  let total: totalInterface[] = [];
  records?.forEach((elem) => {
    if (elem[value] !== '') {
      const matched = (element: { value: string }) =>
        element.value === elem[value];
      const matchedIndex = total.findIndex(matched);
      if (matchedIndex === -1) {
        total.push({ value: elem[value], count: 1 });
      } else {
        //elem is in array +1 to count
        total[matchedIndex] = {
          value: elem[value],
          count: total[matchedIndex].count + 1,
        };
      }
    }
  });

  let max = Math.max(...total.map((i) => i.count));

  let result: totalInterface[] = [];

  total.forEach((item) => {
    if (item.count === max) {
      result = [...result, item];
    }
  });

  let resultString = '';
  result.forEach((item) => {
    if (resultString.length === 0) {
      resultString = resultString.concat(item.value);
    } else {
      resultString = resultString.concat(`, ${item.value}`);
    }
  });
  if (max < 0) {
    return { result: resultString, count: '' };
  }
  return { result: resultString, count: max };
};
