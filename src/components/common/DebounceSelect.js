import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import React, { useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import API from '../../service/Api';

export default function DebounceSelect({
  debounceTimeout = 1000,
  mapper = (v) => ({ value: v.id, label: v.name }),
  url,
  selectedValue,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  const fetchOptions = useMemo(
    () => async (searchQuery) => {
      const { data } = await API.post(url, {
        query: searchQuery,
        isActive: true,
      });
      return data.model.map(mapper);
    },
    [url, mapper]
  );

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  useEffect(() => {
    debounceFetcher();
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
      value={selectedValue}
    />
  );
}
