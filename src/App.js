import React,{useState,useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Main from './components/main';

function App() {
  const [item,setItem]=useState('');
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    const fetchItems=async (e)=>{
      e.preventDefault();
      try{
        const result= await Axios.get('https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=51eb63a4bcd24e4799b87c09af08d3dc');
        setItem(result.data);
      }
      catch (error){
        console.log(error)
        setError(true);
      }
    }
  }, [])
  console.log(item)
  
  return (
    <div className="App">
      <Main></Main>
    </div>
  );
}

export default App;
