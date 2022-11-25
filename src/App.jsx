import Search from "./components/Search";
import Modal from "./components/Modal";
import Meals from "./components/Meals";
import Favorites from "./components/Favorites";
import { useGlobalContext } from "./context";
import "./App.css";

function App() {
  const { showModal , favorites } = useGlobalContext();
  return (
    <div className="App">
      <main>
        <Search />
        {favorites.length > 0 && <Favorites />}
        <Meals />
        {showModal && <Modal />}
      </main>
    </div>
  );
}

export default App;
