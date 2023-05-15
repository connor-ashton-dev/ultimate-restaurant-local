import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { useSearchBox } from 'react-instantsearch-hooks';

export default function SearchBox(props) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  function setQuery(newQuery) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // We bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  if (query !== inputValue && !inputRef.current?.isFocused()) {
    setInputValue(query);
  }

  return (
    <View>
      <TextInput
        ref={inputRef}
        className='w-52 border-2 my-4 border-white py-2 px-1 text-white'
        placeholder='Restaurant name here'
        placeholderTextColor='white'
        value={inputValue}
        onChangeText={setQuery}
        clearButtonMode='while-editing'
        autoCapitalize='none'
        autoCorrect={false}
        spellCheck={false}
        autoCompleteType='off'
      />
    </View>
  );
}
