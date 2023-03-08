import NavBar from "./Components/NavBar";
import AnimePage from "./Pages/AnimePage";
import Home from './Pages/Home'
import Genres from './Pages/Genres'
import SearchPage from "./Pages/SearchPage";
import { AnimeProvider } from "./store/AnimeContext";
import { Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Favorites from "./Pages/Favorites";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>  
      <div className="App">
        <AnimeProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/anime/:animeId' element={ <AnimePage /> } />
            <Route path='/genres' element={ <Genres /> } />
            <Route path='/search/:anime' element={ <SearchPage /> } />
            <Route path='/favorites' element={ <Favorites /> }/>
          </Routes>
        </AnimeProvider>
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"}/> */}
    </QueryClientProvider>
  );
}

export default App;
