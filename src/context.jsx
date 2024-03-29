import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";



const getFavoritesFromLocalStorage = () =>{
  let favorites = localStorage.getItem("favorites");
  if(favorites){
    favorites = JSON.parse(localStorage.getItem('favorites'))
  }
  else{
    favorites= []
  }

  return favorites
}


//Todo lo que context proveera a los demas componentes
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  //para search component
  const [searchTerm, setSearchTerm] = useState('')

  //para model component
  const[showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(false)

  //para favorites component
  const [favorites,setFavorites] = useState(getFavoritesFromLocalStorage())

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  //SOlo para el boton de surprise ME! de search component
  const fetchRandomMeal =() =>{
    fetchMeals(randomMealUrl)
  }

  const fetchMealsHome = () => {
    fetchMeals(allMealsUrl)
  }


  const selectMeal = (idMeal, favoriteMeal) =>{
    let meal;

    if(favoriteMeal){
      meal = favorites.find((meal) => meal.idMeal === idMeal)
    }else{
      meal = meals.find((meal) => meal.idMeal === idMeal)
    }
    setSelectedMeal(meal)
    setShowModal(true)
  }

  
  const closeModal = () =>{
    setShowModal(false)
  }

  const addToFavorites = (idMeal) =>{
    const meal = meals.find((meal) => meal.idMeal === idMeal) //para que no recorra dos veces siempre
    const alreadyFavorite = favorites.find((meal)=> meal.idMeal === idMeal)
    if(alreadyFavorite) return  
    const updatedFavorites = [...favorites,meal];
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites",JSON.stringify(updatedFavorites))
  }
  const removeFromFavorites = (idMeal) =>{
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal)
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites",JSON.stringify(updatedFavorites))
    
  }

  useEffect(() => {
    fetchMeals(allMealsUrl);
    
  }, []);

  useEffect(() => {
    if(!searchTerm) return 
    fetchMeals(`${allMealsUrl}${searchTerm}`);

  }, [searchTerm]);

  return (
    <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal,fetchMealsHome, showModal, selectedMeal, selectMeal, closeModal, addToFavorites,removeFromFavorites , favorites }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
