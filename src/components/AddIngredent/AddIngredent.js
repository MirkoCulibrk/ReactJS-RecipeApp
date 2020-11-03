import React,{useState,useContext} from 'react'
import Autosuggest from 'react-autosuggest';
import topIngredients from '../../topIngredients.json';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import './AddIngredent.scss';
import {GlobalContext} from '../Logic/GlobalState';

const AddIngredent = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestion] = useState([]);
  const { addIngredient } = useContext(GlobalContext);

  const onChange = (e, { newValue }) => {
    e.preventDefault();
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestion(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestion([]);
  };

  const escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const getSuggestions = value => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp(escapedValue, 'i');

    const sortedByLength = topIngredients.sort((a, b) => {
      return a.name.length - b.name.length;
    });

    return sortedByLength.filter(ingredient => regex.test(ingredient.name));
  };

  const onSuggestionSelected = (e, { suggestionValue }) => {
    const newIngredient = {
      id: Math.floor(Math.random() * 100000000),
      value: suggestionValue
    };
    addIngredient(newIngredient);
    setValue('');
  };

  const getSuggestionValue = suggestion => suggestion.name;

  const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);
    return (
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} className="text-gray-900 font-normal">
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} className="text-gray-600 font-normal">
              {part.text}
            </strong>
          );
        })}
      </div>
    );
  };

  const inputProps = {
    placeholder: 'Ex: apples',
    value,
    onChange
  };

  return (
    <form className="form">
      <div className="input-container">
        <Autosuggest
          suggestions={suggestions.slice(0, 5)}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={onSuggestionSelected}
        />
      </div>
    </form>
  );
}

export default AddIngredent
