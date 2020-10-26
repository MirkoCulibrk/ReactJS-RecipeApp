import React,{useState} from 'react'
import Autosuggest from 'react-autosuggest';
import ingredents from '../../topIngredients.json';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

const AddIngredent = () => {
    const [value,setValue]=useState('');
    const [suggestions,setSuggestion]=useState([]);
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
    
        const sortedByLength = ingredents.sort((a, b) => {
          return a.name.length - b.name.length;
        });
        console.log(sortedByLength);
        return sortedByLength.filter(ingredient => regex.test(ingredient.name));
      };
    
    //   const onSuggestionSelected = (e, { suggestionValue }) => {
    //     const newIngredient = {
    //       id: Math.floor(Math.random() * 100000000),
    //       value: suggestionValue
    //     };
    //     addIngredient(newIngredient);
    //     setValue('');
    //   };
    
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
        placeholder: 'Ex: eggs',
        value,
        onChange
      };
    return (
        
        <form className="form">
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            >

            </Autosuggest>

        </form>
    )
}

export default AddIngredent
