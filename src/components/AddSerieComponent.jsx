import React, { Component } from 'react';


import SerieService from '../services/SerieService';
import Swal from 'sweetalert2'

class AddSerieComponent extends Component {
    constructor(props){
          super(props)
          this.state={
            serie_id:this.props.match.params.id,
            nom_serie:"",
            serchRestaurant:"",
            series:[],
            tablefh:[],
            dataTh:[],
      }
        this.editeserie=this.editeserie.bind(this);
          this.changeNomHandler=this.changeNomHandler.bind(this);
          this.changeSerchRestaurantHandler=this.changeSerchRestaurantHandler.bind(this);

 this.deleteserie=this.deleteserie.bind(this);

        }
      saveserie=(e)=>{
            e.preventDefault();
            let serie={nom_serie:this.state.nom_serie,
            };
          
            if(!this.state.serie_id){
              SerieService.addSerie(serie).then(res=>{
               Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your serie has been saved',
                showConfirmButton: false,
                timer: 3000
              })
              setTimeout(()=>{ 
                this.props.history.push("/serie");
              
                window.location.reload(true);
              },2000)
            })
              }else{
                SerieService.updateSerie(
                  this.state.serie_id,serie).then(res=>{
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your item has been updated',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  setTimeout(()=>{ 
                    this.props.history.push("/serie");
                  
                    window.location.reload(true);
                  },2000)

                })   
            }
            

        }
   editeserie(serie_id){
        this.props.history.push(`/serie/${serie_id}`)
        window.location.reload(true);

    }

    changeSerchRestaurantHandler=(e)=>{
        if(e.target.value ==""){
         this.setState({
          dataTh:this.state.tablefh})
                console.log(this.state.serchRestaurant)
  
          
          
        }else{
          let filetrTable=this.state.tablefh.filter(k=> k.nom_serie.toLowerCase().includes(e.target.value.toLowerCase()))
          this.setState({dataTh:filetrTable})
                
             }
             this.setState({serchRestaurant:e.target.value})
  
      }



componentDidMount(){
      SerieService.getSerie().then((res)=>{
          this.setState({series:res.data,
            tablefh:res.data,
            dataTh:res.data});
      
      });
      if(this.state.serie_id==-1){
            return
      }else{
        SerieService.getSerieById(this.state.serie_id).then((res)=>{
            let serie=res.data;
            this.setState({
              nom_serie:serie.nom_serie,
               
            });
        
        });
      }
  }
 deleteserie(serie_id){
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
            SerieService.deleteSerie(serie_id).then((res)=>{
                  this.props.history.push("/serie");
                  window.location.reload(true);
              }),
          )
        }
      })
        
       
    }


 changeNomHandler=(event)=>{
        this.setState({nom_serie:event.target.value})
    }
getTiltleUp(){
      if(!this.state.serie_id){
       
        return <h5 className="text-center mt-3"><i className="bx bx-plus"></i><i className="ri-links-fill" /> Serie</h5>
      }else{
       return <h5 className="text-center mt-3"><i className="bi bi-pencil-square"></i><i className="ri-links-fill" /> Serie</h5>
      
      }
     }
     getBtneUp(){
      if(!this.state.serie_id){
       
        return <div className="col-sm-10">
        <button type="submit" onClick={this.saveserie} className="btn btn-outline-success">Save</button>
        <button type="reset" className="btn btn-outline-danger" style={{marginLeft:"20px",color:"black"}}>Cancel</button>
        </div>
        
      }else{
       return  <div className="col-sm-10">
       <button type="submit" onClick={this.saveserie} className="btn btn-outline-warning"><i className="bx bx-refresh" /> Update</button>
       </div>
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
              <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-company">Serie</label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-company2" className="input-group-text"><i className="ri-links-fill" /></span>
                  <input type="text" name='nom' id="basic-icon-default-company" value={this.state.nom_serie} onChange={this.changeNomHandler} className="form-control" placeholder="Enter Company Name." aria-label="ACME Inc." aria-describedby="basic-icon-default-company2" />
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
    
    </div>
        {/*/ Transactions */}
      
        <div className="row">
 

 <div className="card">
 <div className="card-body">
     <h5 className="card-title">List des Series</h5>
     
     {/* Search */}
         <div className="navbar-nav align-items-center">
         <ol className="breadcrumb">
         <li className="breadcrumb-item active">Recherche par Serie</li>
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
         <th scope="col">Serie</th>
         <th scope="col">Action</th>
         </tr>
     </thead>
     <tbody>
 {
         this.state.dataTh.map(serie=>   
         <tr className=' align-middle'  key={serie.serie_id}>
         
         <td>{serie.nom_serie} </td>
         <td><div className="dropdown">
   <button className="btn p-0" type="button" id="cardOpt{serie.serie_id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
     <i className="bx bx-dots-vertical-rounded" />
   </button>
   <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
  
     <a className="dropdown-item" onClick={()=>this.editeserie(`${serie.serie_id}`)} href><i className=" ri-edit-box-line" /> Edite</a>
     <a className="dropdown-item" onClick={()=>this.deleteserie(`${serie.serie_id}`)} href><i className="ri-delete-bin-5-line" /> Delete</a>
     
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

export default AddSerieComponent;