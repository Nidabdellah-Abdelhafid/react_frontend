import React, { Component } from 'react'
import L from "leaflet"
import { MapContainer,Marker,Popup, TileLayer } from "react-leaflet";

import PhotoService from '../services/PhotoService';
import RestaurantService from '../services/RestaurantService';
function GetIcon(_iconSize){
  return L.icon({
    iconUrl:require("../Static/Icons/plogo.png"),
    iconSize:_iconSize
  })
}

export default class ViewRestaurantComponenet extends Component {
    constructor(props){
        super(props)
        this.state={
            position: [33.59173269748419,-7.647485051745465],
              restaurant_id:this.props.match.params.restaurant_id,
              restaurants:[],
              restaurantById:[],
              lats:0,
              longs:0,
              zone_name:"",
              ville_name:"",
              serie_name:"",
              spesialite_name:"",
              photosR:[],
              nomRes:"",
              photoRs:[],
              dataTh:[],
              tablefh:[]
        }
      
      
        
    }
  componentDidMount(){
      //console.log(this.state.restaurant_id)
          RestaurantService.getRestaurantById(this.state.restaurant_id).then((res)=>{
            this.setState({restaurantById:res.data,
            });
            //console.log(" byid :: "+this.state.restaurantById.nom_restaurant)
            let poslg=[];
            poslg.push(this.state.restaurantById.lat)
            poslg.push(this.state.restaurantById.log)

           this.setState({lats:this.state.restaurantById.lat.toString(),
                          longs:this.state.restaurantById.log.toString(),
           });
           
            //this.state.restaurantById.map( r =>  console.log("zone mp "+ r.zone["nom_zone"] ))
             
            //console.log("lat "+parseFloat(this.state.lats))
        
        });
          PhotoService.getPhoto().then((res)=>{
              this.setState({photos:res.data,
                
               
            });
            
              
          
          });

          RestaurantService.getRestaurant().then((res)=>{
            this.setState({restaurants:res.data,
              tablefh:res.data,
            
            });
            // let zoneID=this.state.restaurantById.zone["nom_zone"];
            // console.log(" zoneId :: "+zoneID)
            // let filetrTable=this.state.tablefh.filter(k=> k.zone["nom_zone"].toLowerCase().includes("".toLowerCase()))
            // this.setState({dataTh:filetrTable})
           
            //console.log("haniiiii "+this.state.restaurants[this.state.restaurant_id].zone["ville"].nom_ville)
            
            this.setState({
              zone_name:this.state.restaurants[(this.state.restaurant_id)-1].zone["nom_zone"],
              ville_name:this.state.restaurants[(this.state.restaurant_id)-1].zone["ville"].nom_ville,
              serie_name:this.state.restaurants[(this.state.restaurant_id)-1].serie["nom_serie"],
              spesialite_name:this.state.restaurants[(this.state.restaurant_id)-1].specialite["nom_specialite"],
              });
              console.log("id hani  "+this.state.restaurant_id)
        
        });
          

            PhotoService.getRestaurantPhotoById(this.state.restaurant_id).then((res)=>{
              this.setState({photosR:res.data,
               
                  
              });
              
  
              this.state.photosR.map((record) => {
                  this.state.photoRs.push(record[1]);
      
              })
             // console.log("phr ..... "+this.state.photoRs.length);
          
          });
         
      }
    render() {
    return (
      <div><main id="main" className="main">
<div className="content-wrapper">
              {/* Content */}
<div className="container-xxl flex-grow-1 container-p-y d-flex">
  <div className="row " style={{marginRight:"10px"}}>
 

<div className="card">
  <div className="card-body">
    <h5 className="card-title">Galerie</h5>
    {/* Slides with indicators */}
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-label="Slide 1" aria-current="true" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" className />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" className />
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={'data:image/jpeg;base64,' + this.state.photoRs[0]} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={'data:image/jpeg;base64,' + this.state.photoRs[1]} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
         <img src={'data:image/jpeg;base64,' + this.state.photoRs[2]} className="d-block w-100" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>{/* End Slides with indicators */}
  </div>
</div>

  </div>

 <div className="row col-lg-7 " style={{marginLeft:"20px"}}>
<MapContainer
      className="map"
      center={[31.628674, -7.99204]}
      zoom={5}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
          position={[this.state.lats,this.state.longs]}
          icon={GetIcon(50)} 
          > 
          <Popup>
          {this.state.restaurantById.nom_restaurant}

          </Popup>
          
        </Marker>

    </MapContainer>
    </div>  </div>  </div>  

  

          <div className="container-xxl flex-grow-1 container-p-y mt-5">
  <div className="row " style={{marginRight:"10px"}}>
  
  {
         this.state.dataTh.map(restaurant=>   
                                   
    <div className="col-md-6 col-lg-4 mb-5" key={restaurant.restaurant_id}>
  <div className="card h-100">
    <img className="card-img-top" src={'data:image/jpeg;base64,' + this.state.restaurantRs[1]} alt="Card" height="200px" width="200px"/>
    <div className="card-body">
      <h5 className="card-title">{restaurant.nom_restaurant}</h5>
      <p className="card-text">
      <i className="ri-map-pin-2-fill" /> {restaurant.addresse}
      </p>
      <div className="dropdown">
                  <button className="btn p-0" type="button" id="cardOpt{restaurant.restaurant_id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="bx bx-dots-vertical-rounded" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                    <a className="dropdown-item" onClick={()=>this.viewrestaurant(`${restaurant.restaurant_id}`)} href>View more</a>
                    <a className="dropdown-item" onClick={()=>this.editerestaurant(`${restaurant.restaurant_id}`)} href>Choiser l'etat de validation</a>
                    
                    
                  </div>
                </div>
      </div>
  </div>
</div>
) }
  </div>
{/* / Content */}


{/* / Content */}<div className="card">
  <div className="card-body">
    <h5 className="card-title">{this.state.restaurantById.nom_restaurant}</h5>
    <nav style={{bsBreadcrumbDivider: '">"'}}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href>Adresse</a></li>
        <li className="breadcrumb-item active"><i className="ri-map-pin-line" />  {this.state.restaurantById.addresse}</li>
      </ol>
    </nav>
    <nav style={{bsBreadcrumbDivider: '"|"'}}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href>Ville</a></li>
        <li className="breadcrumb-item active">{this.state.ville_name}</li>
      </ol>
    </nav>
    <nav style={{bsBreadcrumbDivider: '"-"'}}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href>Zone</a></li>
        <li className="breadcrumb-item active">{this.state.zone_name}</li>
      </ol>
    </nav>
    <nav style={{bsBreadcrumbDivider: '"•"'}}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href>Latitude</a></li>
        <li className="breadcrumb-item active">{this.state.restaurantById.lat}</li>
      </ol>
    </nav>
    <nav style={{bsBreadcrumbDivider: '""'}}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href>Longitude</a></li>
        <li className="breadcrumb-item active">{this.state.restaurantById.log}</li>
      </ol>
    </nav>
    <nav style={{bsBreadcrumbDivider: '""'}}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href>Serie</a></li>
        <li className="breadcrumb-item active">{this.state.serie_name}</li>
      </ol>
    </nav>
    <nav style={{bsBreadcrumbDivider: '""'}}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href>Spesialite</a></li>
        <li className="breadcrumb-item active">{this.state.spesialite_name}</li>
      </ol>
    </nav>
    <nav style={{bsBreadcrumbDivider: '""'}}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href>Houre d'ouverture</a></li>
        <li className="breadcrumb-item active">{this.state.restaurantById.heure_open}</li>
      </ol>
    </nav>
    <nav style={{bsBreadcrumbDivider: '""'}}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href>Houre de fermeture</a></li>
        <li className="breadcrumb-item active">{this.state.restaurantById.heure_close}</li>
      </ol>
    </nav>
  </div>
</div>

{/* / fin Content */}




          </div>
                </main>
      </div>
    )
  }
}
