import { useGlobalContext } from "../context";
import React, { useState } from 'react'

const Search = () => {

    const [text, setText] = useState('')
    const {setSearchTerm, fetchRandomMeal} = useGlobalContext()


    const handlechange = (e) =>{
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text){
            setSearchTerm(text)
            setText('')
        } 
    }
    const handleRandomMeal = () =>{
        setSearchTerm('')
        setText('')
        fetchRandomMeal('')
    }

    return (
        <header className="search-container">
            <form onSubmit={handleSubmit}>
                <input onChange={handlechange} value={text} className="form-input" type="text" placeholder="type favorite meal" />
                <button className="btn" type="submit">Search</button>
                <button className="btn btn-hipster" type="btn" onClick={handleRandomMeal}>Surprise Me!</button>
            </form>
        </header>
    )
}

export default Search