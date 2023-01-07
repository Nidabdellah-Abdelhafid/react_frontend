import React, { Component } from 'react';
import PhotoService from '../services/PhotoService';
import VilleService from '../services/VilleService';
import ZoneService from '../services/ZoneService';


import RestaurantService from '../services/RestaurantService';
import Swal from 'sweetalert2'
class ListRestaurantComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            photo_id:this.props.match.params.id,
            url:"",
            photos:[],
            nomRes:"",
            restaurants:[],
            restaurant_id:'',
            serchRestaurant:"",
            serchRestaurantV:"",
            serchRestaurantZ:"",

            tablefh:[],
            dataTh:[],
            restaurantsPhotos:[],
            photoRs:[],
            villes:[],
            zones:[],
            photoByRest:[],
            SchphotoByRest:[],
            gtPH:"",
            id_loc:"",
            tzone:[]

        }
            
            this.changeUrlHandler=this.changeUrlHandler.bind(this);
            this.savephoto=this.savephoto.bind(this);
            this.viewrestaurant=this.viewrestaurant.bind(this);
            this.changeRestaurantHandler=this.changeRestaurantHandler.bind(this);
            this.updatephoto=this.updatephoto.bind(this);
            this.editerestaurant=this.editerestaurant.bind(this);
            this.changeSerchRestaurantHandler=this.changeSerchRestaurantHandler.bind(this);
            this.changeRestaurantVilleHandler=this.changeRestaurantVilleHandler.bind(this);
            this.changeRestaurantZoneHandler=this.changeRestaurantZoneHandler.bind(this);


        }
    
        savephoto=(e)=>{
          e.preventDefault();
          const formData = new FormData();
          formData.append('url', this.state.url);
         
          if(!this.state.photo_id){
            PhotoService.addPhoto(this.state.restaurant_id,formData).then(res=>{
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your photo has been saved',
                showConfirmButton: false,
                timer: 3000
              })
              setTimeout(()=>{ 
                this.props.history.push("/photo");
              
                window.location.reload(true);
              },2000)
          })
            }else{
              PhotoService.updatePhoto(this.state.restaurant_id,
                this.state.photo_id,formData).then(res=>{
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your item has been updated',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  setTimeout(()=>{ 
                    this.props.history.push("/photo");
                  
                    window.location.reload(true);
                  },2000)

                 
              })   
          }
          
    
      }

      changeSerchRestaurantHandler=(e)=>{
      if(e.target.value ==""){
       this.setState({
        dataTh:this.state.tablefh})

        
        
      }else{
        let filetrTable=this.state.tablefh.filter(k=> k.nom_restaurant.toLowerCase().includes(e.target.value.toLowerCase()))
        this.setState({dataTh:filetrTable})
              
           }
           this.setState({serchRestaurant:e.target.value})

    }


    changeRestaurantVilleHandler=(e)=>{
      if(e.target.value ==""){
       this.setState({
        dataTh:this.state.tablefh})

        
        
      }else{
        let filetrTable=this.state.tablefh.filter(k=> k.zone["ville"].nom_ville.toLowerCase().includes(e.target.value.toLowerCase()))
        
        this.setState({dataTh:filetrTable})
           }
           this.setState({serchRestaurantV:e.target.value})

    }

    changeRestaurantZoneHandler=(e)=>{
      if(e.target.value ==""){
       this.setState({
        dataTh:this.state.tablefh})

        
        
      }else{

        let filetrTable=this.state.tablefh.filter(k=> k.zone["nom_zone"].toLowerCase().includes(e.target.value.toLowerCase()))
        this.setState({dataTh:filetrTable})
              
           }
           this.setState({serchRestaurantZ:e.target.value})

    }





      editerestaurant(restaurant_id){
        console.log(restaurant_id)
        let restaurantVd={
          etat:1,
          };
          let restaurantRf={
            etat:2,
            };

            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            })
            
            swalWithBootstrapButtons.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Validée',
              cancelButtonText: 'Refusé',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                  'Validée!',
                  'Votre restaurant a été Validée.',
                  'success'
                )
                setTimeout(()=>{ 
                  RestaurantService.updateRestaurantEtat(restaurant_id,restaurantVd).then(res=>{
                          this.props.history.push(`/restaurant`);
                          window.location.reload(true);
                })
              },2000)
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Refusé',
                  'Votre restaurant a été Refusé',
                  'error'
                )
                setTimeout(()=>{ 
                  RestaurantService.updateRestaurantEtat(restaurant_id,restaurantRf).then(res=>{
                          this.props.history.push(`/restaurant`);
                          window.location.reload(true);
                })
              },2000)
              }
            })
    
        }
    
        viewrestaurant(restaurant_id){
            this.props.history.push(`/restaurant/${restaurant_id}`);
            console.log("e n t")
            window.location.reload(true);
    
        }
        componentDidMount(){
          PhotoService.getRestaurantPhotoPT().then((res)=>{
            this.setState({restaurantsPhotos:res.data,
            });
            this.state.restaurantsPhotos.map((record) => {
            this.state.photoRs.push(record[1]);
            })
            });
            


          PhotoService.getPhoto().then((res)=>{
              this.setState({photos:res.data,

            });
            console.log("haniiiii photo "+this.state.photos[0].url)

          });
          
          VilleService.getVille().then((res)=>{
            this.setState({villes:res.data,
              
          });
            
        
        });
        ZoneService.getZone().then((res)=>{
            this.setState({zones:res.data,
              
          });
            
        
        });

          
          RestaurantService.getRestaurant().then((res)=>{
            this.setState({restaurants:res.data,
                tablefh:res.data,
                dataTh:res.data});
            console.log(this.state.restaurants)
        
        });
          if(this.state.photo_id==-1){
                return
          }else{
            PhotoService.getphotoById(this.state.photo_id).then((res)=>{
                let photo=res.data;
                this.setState({
                    url:photo.url,
                    restaurant_id:photo.restaurant["restaurant_id"],
                    nomRes:photo.restaurant["nom_restaurant"]
                   
                });
            
            });
          }
      }
      getPhRest(id_rs){
        this.state.photos.map(k=>{ 
         if( k.restaurant["restaurant_id"]==id_rs){

           this.state.SchphotoByRest.push(k)


         }else{
          
          console.log("errrr")

         }

         
        })

      };
     async getZ(id_rs){
        
      this.state.SchphotoByRest.map(k=>{
        if(k.restaurant["restaurant_id"]==1){
          this.state.photoByRest.push(k)
        this.SetState({gtPH:k[0].url})
        }

      })
      console.log("hona  p "+this.state.photoByRest)

      }
    
      updatephoto=(h)=>{
            h.preventDefault();
            let photo={
                restaurant_id:this.state.restaurant_id,
                url:this.state.url,
            };
            
            PhotoService.updatephoto(
              this.state.photo_id,photo).then(res=>{
                this.props.history.push("/photo");
                window.location.reload(true);
    
            })
    
        }
        changeRestaurantHandler=(event)=>{
            this.setState({restaurant_id:event.target.value})
        }
        
        changeUrlHandler=(event)=>{
            this.setState({url:event.target.files[0]})
        }
         getTiltleUp(){
          if(!this.state.photo_id){
           
            return <h5 className="text-center mt-3"><i className="bx bx-plus"></i><i className="bi bi-card-image"></i> Photo</h5>
          }else{
           return <h5 className="text-center mt-3"><i className="bi bi-pencil-square"></i><i className="bi bi-card-image"></i> Photo</h5>
          
          }
         }
         getBtneUp(){
          if(!this.state.photo_id){
           
            return <div className="col-sm-10">
            <button type="submit" onClick={this.savephoto} className="btn btn-outline-success">Save</button>
            <button type="reset" className="btn btn-outline-danger" style={{marginLeft:"20px",color:"black"}}>Cancel</button>
            </div>
            
          }else{
           return  <div className="col-sm-10">
           <button type="submit" onClick={this.savephoto} className="btn btn-outline-warning"><i className="bx bx-refresh" /> Update</button>
           </div>
          }
         }

         optionList(){
            if(!this.state.photo_id){
           
                return  <option></option>
                
              }else{
               return   <option value={this.state.restaurant_id}>{this.state.nomRes}</option>
              }
         }
         getEtatState(restaurant){
          if((restaurant.etat)==0){
                  return  <span className="badge border-primary  border-1 text-primary "><strong>EN ATTENTE</strong></span>
            }else if((restaurant.etat)==1){
                  return  <span className="badge border-success border-1 text-success"><strong>VALIDEE</strong></span>
            }else{
              return <span className="badge border-danger border-1 text-danger"><strong>REFUSE</strong></span>

            }
              
            }
            // setI(i){
            //     PhotoService.getRestaurantPhotoById(i).then((res)=>{
            //       this.setState({restaurantsPhotos:res.data,
                      
                  
            //       });
                  
      
            //       this.state.restaurantsPhotos.map((record) => {
            //           this.state.photoRs.push(record[1]);
                      
          
            //       })
            //       console.log("phr ..... "+this.state.photoRs.length);
              
            //   });
              
            // }
    render() {
        return (
            <div>
<main id="main" className="main">
<div className="content-wrapper">
              {/* Content */}
<div className="container-xxl flex-grow-1 container-p-y">
 

  <div className="row">
 

               
                    <h5 className="card-title">List des Restaurant</h5>
                    
                    {/* Search */}
                        <div className=" mb-5 d-flex">
                       

                        <div className="col-lg-6">
            
                        <label className="col-sm-5 form-label" htmlFor="basic-icon-default-select">Recherche par nom de restaurant</label>
                        <div className="col-sm-8">
                            <div className="input-group input-group-merge">
                            <div className="input-group">
                            <span id="basic-icon-default-fullname2" className="input-group-text">
                            <i className="bx bx-search fs-4 lh-0" /></span>
                            <input type="text" 
                            className="form-control border-0 "
                            value={this.state.serchRestaurant} onChange={this.changeSerchRestaurantHandler}  placeholder="Search..." aria-label="Search..." />
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-3">
            
                        <label className="col-sm-1 form-label" htmlFor="basic-icon-default-select">Ville</label>
                        <div className="col-sm-10">
                            <div className="input-group input-group-merge">
                            <div className="input-group">
                            <span id="basic-icon-default-fullname2" className="input-group-text">
                            <i className="bx bx-search fs-4 lh-0" /></span>

                            <select className="form-select" onChange={this.changeRestaurantVilleHandler} id="basic-icon-default-select">
                            <option value={""}></option>
                                                    {
                                                    this.state.villes.map(ville=>
                                                    <option key={ville.ville_id}  value={ville.nom_ville}>{ville.nom_ville} </option>
                                                    ) }
                            </select>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-3">
                        <label className="col-sm-1 form-label" htmlFor="basic-icon-default-select">Zone</label>
                        <div className="col-sm-10">
                            <div className="input-group input-group-merge">
                            <div className="input-group">
                            <span id="basic-icon-default-fullname2" className="input-group-text">
                            <i className="bx bx-search fs-4 lh-0" /></span>

                            <select className="form-select" onChange={this.changeRestaurantZoneHandler} id="basic-icon-default-select">
                        <option value={""}></option>
                                                    {
                                                    this.state.zones.map(zone=>
                                                    <option key={zone.zone_id}  value={zone.nom_zone}>{zone.nom_zone} </option>
                                                    ) }
                            </select>
                            </div>
                            </div>
                        </div>
                        </div>

                       
                        </div>
                        {/* /Search */}
                    {/* Default Table */}
                    {/* Order Statistics */}
  
  {
         this.state.dataTh.map(photo=>   
          
                                   
    <div className="col-md-6 col-lg-4 mb-5" key={photo.restaurant_id}>
      
  <div className="card h-100">
    <img className="card-img-top" src={'data:image/jpeg;base64,' + this.state.restaurantsPhotos[photo.restaurant_id-1]} alt="Card" height="200px" width="200px"/>
    <div className="card-body">
      <h5 className="card-title">{photo.nom_restaurant}</h5>
      <p className="card-text">
      <i className="ri-map-pin-2-fill" /> {photo.addresse}
      </p>
      <div className="dropdown">
                  <button className="btn p-0" type="button" id="cardOpt{photo.photo_id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="bx bx-dots-vertical-rounded" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                    <a className="dropdown-item" onClick={()=>this.viewrestaurant(`${photo.restaurant_id}`)} href>View more</a>
                    <a className="dropdown-item" onClick={()=>this.editerestaurant(`${photo.restaurant_id}`)} href>Changer l'etat de validation</a>
                    {this.getPhRest(`${photo.restaurant_id}`)}
                   
                  </div>
                </div>
      </div>
  </div>
</div>
) }


    {/*/ Transactions  {this.setI(photo.restaurant_id)}*/}

                    {/* End Default Table Example */}
                </div>
                </div>

 <div className="row"><div className="card">
  <div className="card-body">
    <h5 className="card-title">Etat de restaurant</h5>
    {/* Default Tabs */}
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">en attente de
validation</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" tabIndex={-1}>validée</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false" tabIndex={-1}>refusé</button>
      </li>
    </ul>
    <div className="tab-content pt-2" id="myTabContent">
      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
{/* Search */}
<div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <i className="bx bx-search fs-4 lh-0" />
                <input type="text" 
                className="form-control border-0 shadow-none"
                value={this.state.serchRestaurant} onChange={this.changeSerchRestaurantHandler}  placeholder="Search..." aria-label="Search..." />
              </div>
            </div>
            {/* /Search */}
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                <th scope="col">Reference</th>
                      <th scope="col">Serie </th>
                      <th scope="col">Specialite </th>
                      <th scope="col">Zone </th>
                      <th scope="col">Heure open </th>
                      <th scope="col">Heure close</th>
                      
                      <th scope="col">Week</th>
                      <th scope="col">Etat</th>

                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {                   
                                this.state.dataTh.map(
                                  restaurant=>
                                {
                                  if((restaurant.etat)==0){
                                    return(
                                    <tr key={restaurant.restaurant_id }>
                                        <th scope="row">{restaurant.nom_restaurant}</th>

                                        <td>{restaurant.serie["nom_serie"]}</td>
                                        <td>{restaurant.specialite["nom_specialite"]}</td>
                                        <td>{restaurant.zone["nom_zone"]}</td>

                                        <td>{restaurant.heure_open}</td>
                                        <td>{restaurant.heure_close}</td>
                                        <td>{restaurant.week.toString()}</td>
                                        <td>{this.getEtatState(restaurant) }</td>
                                       
                                        
                                    </tr>)
                                  }
                                
                                    }
                                  
                                )
                            }
              </tbody>
            </table>
          </div>  
        </div>
      <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        {/* Search */}
<div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <i className="bx bx-search fs-4 lh-0" />
                <input type="text" 
                className="form-control border-0 shadow-none"
                value={this.state.serchRestaurant} onChange={this.changeSerchRestaurantHandler}  placeholder="Search..." aria-label="Search..." />
              </div>
            </div>
            {/* /Search */}
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                <th scope="col">Reference</th>
                      <th scope="col">Serie </th>
                      <th scope="col">Specialite </th>
                      <th scope="col">Zone_id </th>
                      
                      <th scope="col">Heure open </th>
                      <th scope="col">Heure close</th>
                      <th scope="col">Week</th>
                      <th scope="col">Etat</th>

                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {                   
                                this.state.dataTh.map(
                                  restaurant=>
                                {
                                  if((restaurant.etat)==1){
                                    return(
                                    <tr key={restaurant.restaurant_id }>
                                        <th scope="row">{restaurant.nom_restaurant}</th>

                                        <td>{restaurant.serie["nom_serie"]}</td>
                                        <td>{restaurant.specialite["nom_specialite"]}</td>
                                        <td>{restaurant.zone["nom_zone"]}</td>

                                        <td>{restaurant.heure_open}</td>
                                        <td>{restaurant.heure_close}</td>
                                        <td>{restaurant.week.toString()}</td>
                                        <td>{this.getEtatState(restaurant) }</td>
                                       
                                        
                                    </tr>)
                                  }
                                
                                    }
                                  
                                )
                            }
              </tbody>
            </table>
          </div>  </div>
      <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
       {/* Search */}
<div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <i className="bx bx-search fs-4 lh-0" />
                <input type="text" 
                className="form-control border-0 shadow-none"
                value={this.state.serchRestaurant} onChange={this.changeSerchRestaurantHandler}  placeholder="Search..." aria-label="Search..." />
              </div>
            </div>
            {/* /Search */}
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                <th scope="col">Reference</th>
                      <th scope="col">Serie</th>
                      <th scope="col">Specialite </th>
                      <th scope="col">Zone </th>
                      
                      <th scope="col">Heure open </th>
                      <th scope="col">Heure close</th>
                      <th scope="col">Week</th>
                      <th scope="col">Etat</th>

                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {                   
                                this.state.dataTh.map(
                                  restaurant=>
                                {
                                  if((restaurant.etat)==2){
                                    return(
                                    <tr key={restaurant.restaurant_id }>
                                        <th scope="row">{restaurant.nom_restaurant}</th>

                                        <td>{restaurant.serie["nom_serie"]}</td>
                                        <td>{restaurant.specialite["nom_specialite"]}</td>
                                        <td>{restaurant.zone["nom_zone"]}</td>

                                        <td>{restaurant.heure_open}</td>
                                        <td>{restaurant.heure_close}</td>
                                        <td>{restaurant.week.toString()}</td>
                                        <td>{this.getEtatState(restaurant) }</td>
                                       
                                        
                                    </tr>)
                                  }
                                
                                    }
                                  
                                )
                            }
              </tbody>
            </table>
          </div>  </div>
    </div>{/* End Default Tabs */}
  </div>
</div>

 </div>
{/* / Content */}




          </div>
                </main>
            </div>
        );
    }
}

export default ListRestaurantComponent;