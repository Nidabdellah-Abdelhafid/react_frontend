import React, { Component } from 'react'


import ZoneService from '../services/ZoneService';
import VilleService from '../services/VilleService';
import Swal from 'sweetalert2'

export default class AddZoneComponent extends Component {
  constructor(props){
          super(props)
          this.state={
            zone_id:this.props.match.params.id,
            nom_zone:"",
            zones:[], 
            villes:[],
            nomVille:"",
            ville_id:'',
            serchRestaurant:"",
            tablefh:[],
            dataTh:[],

      }
        this.editezone=this.editezone.bind(this);
        this.changeNomHandler=this.changeNomHandler.bind(this);
        this.changeVilleHandler=this.changeVilleHandler.bind(this);
        this.deletezone=this.deletezone.bind(this);
            this.changeSerchRestaurantHandler=this.changeSerchRestaurantHandler.bind(this);
        }
      savezone=(e)=>{
            e.preventDefault();
            let zone={nom_zone:this.state.nom_zone,
              ville_id:this.state.ville_id,
            };
          
            if(!this.state.zone_id){
              ZoneService.addZone(zone.ville_id,zone).then(res=>{
               Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your zone has been saved',
                showConfirmButton: false,
                timer: 3000
              })
              setTimeout(()=>{ 
                this.props.history.push("/zone");
              
                window.location.reload(true);
              },2000)
            })
              }else{
                ZoneService.updateZone(this.state.ville_id,
                  this.state.zone_id,zone).then(res=>{
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your item has been updated',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  setTimeout(()=>{ 
                    this.props.history.push("/zone");
                  
                    window.location.reload(true);
                  },2000)

                })   
            }
            

        }
   editezone(zone_id){
        this.props.history.push(`/zone/${zone_id}`)
        window.location.reload(true);

    }
    changeSerchRestaurantHandler=(e)=>{
      if(e.target.value ==""){
       this.setState({
        dataTh:this.state.tablefh})
              console.log(this.state.serchRestaurant)

        
        
      }else{
        let filetrTable=this.state.tablefh.filter(k=> k.ville["nom_ville"].toLowerCase().includes(e.target.value.toLowerCase()))
        this.setState({dataTh:filetrTable})
              
           }
           this.setState({serchRestaurant:e.target.value})

    }
componentDidMount(){
      ZoneService.getZone().then((res)=>{
          this.setState({zones:res.data,
            tablefh:res.data,
            dataTh:res.data});
      
      });
      VilleService.getVille().then((res)=>{
        this.setState({villes:res.data});
        console.log(this.state.villes)
    
    });
      if(this.state.zone_id==-1){
            return
      }else{
        ZoneService.getZoneById(this.state.zone_id).then((res)=>{
            let zone=res.data;
            this.setState({
              nom_zone:zone.nom_zone,
              ville_id:zone.ville["ville_id"],
              nomVille:zone.ville["nom_ville"]
               
            });
        
        });
      }
  }
 deletezone(zone_id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
            ZoneService.deleteZone(zone_id).then((res)=>{
                  this.props.history.push("/zone");
                  window.location.reload(true);
              }),
          )
        }
      })
        
       
    }

    changeVilleHandler=(event)=>{
      this.setState({ville_id:event.target.value})
  }
 changeNomHandler=(event)=>{
        this.setState({nom_zone:event.target.value})
    }
getTiltleUp(){
      if(!this.state.zone_id){
       
        return <h5 className="text-center mt-3"><i className="bx bx-plus"></i><i className="ri-map-pin-add-line" /> Zone</h5>
      }else{
       return <h5 className="text-center mt-3"><i className="bi bi-pencil-square"></i><i className="ri-map-pin-add-line" /> Zone</h5>
      
      }
     }
     getBtneUp(){
      if(!this.state.zone_id){
       
        return <div className="col-sm-10">
        <button type="submit" onClick={this.savezone} className="btn btn-outline-success">Save</button>
        <button type="reset" className="btn btn-outline-danger" style={{marginLeft:"20px",color:"black"}}>Cancel</button>
        </div>
        
      }else{
       return  <div className="col-sm-10">
       <button type="submit" onClick={this.savezone} className="btn btn-outline-warning"><i className="bx bx-refresh" /> Update</button>
       </div>
      }
     }

     
optionList(){
  if(!this.state.zone_id){
 
      return  <option></option>
      
    }else{
     return   <option value={this.state.ville_id}>{this.state.nomVille}</option>
    }
}


  render() {
    return (
      <div>

<main id="main" className="main">
<div className="content-wrapper">
              {/* Content */}
<div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        {/* Order Statistics */}
        <div className="col-xxl">
      <div className="card mb-4">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5 className="mb-0"> </h5>
          <small className="text-muted float-end"></small>
        </div>
        <div className="card-body mt-4">
        <div className='text-center mb-5'>
            {this.getTiltleUp()}  </div>
          <form encType="multipart/form-data">
             <div className="row mb-3">
              <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-company">Zone</label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-company2" className="input-group-text"><i className="ri-map-pin-add-line" /></span>
                  <input type="text" name='nom' id="basic-icon-default-company" value={this.state.nom_zone} onChange={this.changeNomHandler} className="form-control" placeholder="Enter Company Name." aria-label="ACME Inc." aria-describedby="basic-icon-default-company2" />
                </div>
              </div>
            </div>

            <div className="row mb-3">
            
            <label className="col-sm-2 form-label" htmlFor="basic-icon-default-select">Ville</label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
              <div className="input-group">
              <span id="basic-icon-default-fullname2" className="input-group-text"><i className="ri-map-pin-line" /></span>
  
              <select className="form-select" onChange={this.changeVilleHandler} id="basic-icon-default-select">
             { this.optionList()}
                                      {
                                      this.state.villes.map(ville=>
                                      <option key={ville.ville_id}  value={ville.ville_id}>{ville.nom_ville} </option>
                                      ) }
              </select>
              </div></div>
            </div>
          </div>
            
           
           
            <div className="row justify-content-end">
              {this.getBtneUp()}
            </div>
          </form>
    
        </div>
      </div>
    </div>
    
    </div>
        {/*/ Transactions */}
      
        <div className="row">
 

 <div className="card">
 <div className="card-body">
     <h5 className="card-title">List des Zones</h5>
     
     {/* Search */}
         <div className="navbar-nav align-items-center">
         <ol className="breadcrumb">
         <li className="breadcrumb-item active">Recherche par Ville</li>
         </ol>
         <div className="nav-item d-flex align-items-center">
             
             <i className="bx bx-search fs-4 lh-0" />
             <input type="text" 
             className="form-control border-0 shadow-none"
             value={this.state.serchRestaurant} onChange={this.changeSerchRestaurantHandler}  placeholder="Search..." aria-label="Search..." />
         </div>
         </div>
         {/* /Search */}
     {/* Default Table */}
     <table className="table align-middle">
     <thead>
         <tr>
         <th scope="col">Zone</th>
         <th scope="col">Ville</th>
         <th scope="col">Action</th>
         </tr>
     </thead>
     <tbody>
 {
         this.state.dataTh.map(zone=>   
         <tr className=' align-middle'  key={zone.zone_id}>
         
         <td>{zone.nom_zone} </td>
         <td>{zone.ville["nom_ville"]} </td>
         <td><div className="dropdown">
   <button className="btn p-0" type="button" id="cardOpt{zone.zone_id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
     <i className="bx bx-dots-vertical-rounded" />
   </button>
   <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
  
     <a className="dropdown-item" onClick={()=>this.editezone(`${zone.zone_id}`)} href><i className=" ri-edit-box-line" /> Edite</a>
     <a className="dropdown-item" onClick={()=>this.deletezone(`${zone.zone_id}`)} href><i className="ri-delete-bin-5-line" /> Delete</a>
     
   </div>
 </div> </td>
         </tr>
         ) }
     </tbody>
     </table>
     {/* End Default Table Example */}
 </div>
 </div>

</div>


      </div>
{/* / Content */}




          </div>
                </main>
      </div>
    )
  }
}
