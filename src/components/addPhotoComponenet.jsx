import React, { Component } from 'react';
import PhotoService from '../services/PhotoService';
import RestaurantService from '../services/RestaurantService';
import Swal from 'sweetalert2'
class addPhotoComponenet extends Component {
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
            tablefh:[],
            dataTh:[],

        }
            
            this.changeUrlHandler=this.changeUrlHandler.bind(this);
            this.savephoto=this.savephoto.bind(this);
            this.deletephoto=this.deletephoto.bind(this);
            this.changeRestaurantHandler=this.changeRestaurantHandler.bind(this);
            this.updatephoto=this.updatephoto.bind(this);
            this.editephoto=this.editephoto.bind(this);
            this.changeSerchRestaurantHandler=this.changeSerchRestaurantHandler.bind(this);
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
              console.log(this.state.serchRestaurant)

        
        
      }else{
        let filetrTable=this.state.tablefh.filter(k=> k.restaurant["nom_restaurant"].toLowerCase().includes(e.target.value.toLowerCase()))
        this.setState({dataTh:filetrTable})
              
           }
           this.setState({serchRestaurant:e.target.value})

    }
      editephoto(photo_id){
            this.props.history.push(`/photo/${photo_id}`)
            window.location.reload(true);
    
        }
    
        deletepholto(photo_id){
            this.props.history.push(`/photo/${photo_id}`);
            console.log("e n t")
            window.location.reload(true);
    
        }


        deletephoto(photo_id){
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
            PhotoService.deletePhoto(photo_id).then((res)=>{
                  this.props.history.push("/photo");
                  window.location.reload(true);
              }),
          )
        }
      })
        
       
    }


        componentDidMount(){
          PhotoService.getPhoto().then((res)=>{
              this.setState({photos:res.data,
                tablefh:res.data,
                dataTh:res.data
            });
              console.log(this.state.photos)
          
          });
          RestaurantService.getRestaurant().then((res)=>{
            this.setState({restaurants:res.data});
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
            
          <label className="col-sm-2 form-label" htmlFor="basic-icon-default-select">Restaurant</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
            <div className="input-group">
            <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-buildings" /></span>

            <select className="form-select" onChange={this.changeRestaurantHandler} id="basic-icon-default-select">
           { this.optionList()}
                                    {
                                    this.state.restaurants.map(restaurant=>
                                    <option key={restaurant.restaurant_id}  value={restaurant.restaurant_id}>{restaurant.nom_restaurant} </option>
                                    ) }
            </select>
            </div></div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 form-label" htmlFor="basic-icon-default-message">Photo</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
            <input className="form-control" type="file" name='url'  onChange={(event)=> this.setState({url:event.target.files[0]})} id="formFile" />

          </div>
          </div>
        </div>
        <div className="row justify-content-end">
          {this.getBtneUp()}
        </div>
      </form>

    </div>
  </div>
</div>


    {/*/ Transactions */}
  </div>

  <div className="row">
 

                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">List des images</h5>
                    
                    {/* Search */}
                        <div className="navbar-nav align-items-center">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item active">Recherche par Restaurant</li>
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
                        <th scope="col">Photo</th>
                        <th scope="col">Restaurant</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                {
                        this.state.dataTh.map(photo=>   
                        <tr className=' align-middle'  key={photo.photo_id}>
                        <td>
                            <div className="col-md-4 col-lg-6 mb-3" key={photo.photo_id}>
                                <div className="card h-100">
                            <img className="card-img-top" src={'data:image/jpeg;base64,' + photo.url} alt="Card" height="150" width="150"/> 
                         </div>
                            </div></td>
                        <td>{photo.restaurant["nom_restaurant"]} </td>
                        <td><div className="dropdown">
                  <button className="btn p-0" type="button" id="cardOpt{photo.photo_id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="bx bx-dots-vertical-rounded" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                 
                    <a className="dropdown-item" onClick={()=>this.editephoto(`${photo.photo_id}`)} href><i className=" ri-edit-box-line" /> Edite</a>
                    <a className="dropdown-item" onClick={()=>this.deletephoto(`${photo.photo_id}`)} href><i className="ri-delete-bin-5-line" /> Delete</a>
                    
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
        );
    }
}

export default addPhotoComponenet;