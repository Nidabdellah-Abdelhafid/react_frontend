import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainComponent from './components/MainComponent';
import AsideComponent from './components/AsideComponent';
import addPhotoComponenet from './components/addPhotoComponenet';
import AddSerieComponent from './components/AddSerieComponent';
import AddSpecialiteComponent from './components/AddSpecialiteComponent';
import AddVilleComponent from './components/AddVilleComponent';
import AddZoneComponent from './components/AddZoneComponent';
import ListRestaurantComponent from './components/ListRestaurantComponent';
import ViewRestaurantComponenet from './components/ViewRestaurantComponenet';


function App() {
  return (
    <div>
    
      <Router>
          <HeaderComponent/>
          <AsideComponent/>
            <Switch>

              <Route path='/' exact component={MainComponent}></Route>
              
              <Route path='/photo' exact component={addPhotoComponenet}></Route>
              <Route path='/photo/:id' exact component={addPhotoComponenet}></Route>

              <Route path='/serie' exact component={AddSerieComponent}></Route>
              <Route path='/serie/:id' exact component={AddSerieComponent}></Route>

              <Route path='/specialite' exact component={AddSpecialiteComponent}></Route>
              <Route path='/specialite/:id' exact component={AddSpecialiteComponent}></Route>

              <Route path='/ville' exact component={AddVilleComponent}></Route>
              <Route path='/ville/:id' exact component={AddVilleComponent}></Route>

              <Route path='/zone' exact component={AddZoneComponent}></Route>
              <Route path='/zone/:id' exact component={AddZoneComponent}></Route>

              <Route path='/restaurant' exact component={ListRestaurantComponent}></Route>
              <Route path='/restaurant/:restaurant_id' exact component={ViewRestaurantComponenet}></Route>

            </Switch>
          <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
