import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { googleSearchApi } from '../utils/constants';
import { cacheResults } from '../redux/searchSlice';
import { throttle } from 'lodash';



const Home = () => {
    const [searchResults , setSearchResults] = useState([]);
    const [showSuggestions , setShowSuggestions] = useState(false);
    const [searchWord , setSearchWord] = useState('');
    const cachedResults = useSelector(store => store.searchSuggestion);
    const dispatch = useDispatch();
    // console.log(cachedResults , 'cach');
    
    useEffect(()=>{
           
          generateSearchResults();
        
    },[searchWord])

    /*debouncing*/
    //if the search word changed => make an api call after 300 ms
    // useEffect(()=>{
    //     const timer = setTimeout(() => {
    //         if(cachedResults[searchWord]){
    //             setSearchResults(cachedResults[searchWord]);
    //         }else{
    //             generateSearchResults();
    //         }
    //     }, 300);
    //     return () =>{
    //         clearTimeout(timer);
    //       }
    // },[searchWord]);

    /*throttling */
    //if the search word changed => make an api call every 300 ms
    // useEffect(() => {
    //     const throttledGenerateSearchResults = throttle(() => {
    //         if (cachedResults[searchWord]) {
    //             setSearchResults(cachedResults[searchWord]);
    //         } else {
    //             generateSearchResults();
    //         }
    //     }, 300);
    
    //     const interval = setInterval(throttledGenerateSearchResults, 4000);
    
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [searchWord]);
    

    const generateSearchResults = async()=>{
        const response = await fetch(googleSearchApi+searchWord);
        const jsonData = await response.json();
        console.log(searchResults , 'results')
        setSearchResults(jsonData[1]);
        dispatch(cacheResults({[searchWord]: searchResults}));
    }
  return (
    <div>
      <input className='searchbox' type='search'
          placeholder='Search' value={searchWord}
  
          onFocus={()=> setShowSuggestions(true)}
          onBlur={()=> setShowSuggestions(false)}
          onChange={(e) => setSearchWord(e.target.value)} />
    </div>
  )
}

export default Home
