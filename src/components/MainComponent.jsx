import React, { Component } from 'react';

import axios from 'axios'; 

import ReactApexChart from 'react-apexcharts';
class MainComponent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {


          

          year_mount:[],
          runscore:[],
            serieshouse: [ {
              name: 'Nombre des restaurants  par ville',
              data: []
            }
            
          ],
            optionshouse: {
              chart: {
                height: 350,
                type: 'area'
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              xaxis: {
                type: 'text',
                categories: []
              },
              
            },
            seriescar: [  {
              name: 'Nombre des restaurants par zone',
              data: []
            }
          ],
            optionscar: {
              chart: {
                height: 350,
                type: 'area'
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              xaxis: {
                type: 'text',
                categories: []
              },
              
            },


          
        
        
        };
      }
    
      state = {
        books: []
    }
    async componentDidMount() {
        axios.get("http://localhost:2026/Vill_Zone/DachRVile").then((res) => {
            console.log("hzz a e "+res);
            const ipl = res.data;
            const year_mount=[];
            const  runscore=[];  
            const  nopayed=[];  

            ipl.map((record) => {
              nopayed.push(record[0]);
    
              runscore.push(record[1]);
            })
            console.log(year_mount)
            console.log(runscore)
           this.setState({ serieshouse: [ 
            {
            name: 'Nombre des restaurants par zone',
            data: nopayed
          }
          
        ],
        optionshouse: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'text',
            categories: runscore
          },
          
        },
      })
           
        })
        axios.get("http://localhost:2026/Vill_Zone/DachRZone").then((res) => {
          console.log(res);
          const ipl = res.data;
          const year_mount=[];
          const  runscore=[];  
          const  nopayed=[];  

          ipl.map((record) => {
            year_mount.push(record[0]);
            nopayed.push(record[1]);
          })
          console.log("aa "+year_mount)
          console.log("bb "+nopayed)
         this.setState({ seriescar: [ {
          name: 'Nombre des restaurants  par ville',
          data: year_mount
        }
      ],
      optionscar: {
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'text',
          categories: nopayed
        },
        
      },
    })
         
      })


    }
    
    
    render() {
        return (
            <div>
  <main id="main" className="main">
  <div className="pagetitle">
      <h1>Restaurant Dashboard </h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div>{/* End Page Title */}
    <section className="section dashboard">
      <div className="row">
        {/* Left side columns */}
        <div className="col-lg-12">
          <div className="row">
            {/* Sales Card */}
            <div className=" col-md-6">
              <div className="card info-card sales-card">
                <div className="filter">
                  <a className="icon" href="/" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>
                    <li><a className="dropdown-item" href="/houses">List House Factory</a></li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Par Ville<span>| __</span></h5>
                  <div className="d-flex align-items-center">
                    <div className="ps-3">
                    <div className="spinner-grow text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <ReactApexChart options={this.state.optionshouse} series={this.state.serieshouse} type="bar" height={350} />
                    </div>
                  </div>
                </div>
              </div>
            </div>{/* End Sales Card */}
            {/* Revenue Card */}
            <div className="col-md-6">
              <div className="card info-card revenue-card">
                
                <div className="card-body">
                  <h5 className="card-title">Par Zone <span>| __</span></h5>
                  <div className="d-flex align-items-center">
                    
                    <div className="ps-3">
                    <div className="spinner-grow text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <ReactApexChart options={this.state.optionscar} series={this.state.seriescar} type="bar" height={350} />
                    </div>
                  </div>
                </div>
              </div>
            </div>{/* End Revenue Card */}
            {/* Customers Card */}
           
            {/* Reports */}
            <div className="col-12">
              <div className="card">
                
                <div className="card-body"> 
                  <h5 className="card-title">Reports <span>/Today</span></h5>

                  {/* Line Chart */}
                  <div id="reportsChart" />
                  {/* End Line Chart */}
                </div>
              </div>
            </div>{/* End Reports */}
            
          </div>
        </div>{/* End Left side columns */}
        {/* Right side columns */}
       
      </div>
    </section>
  </main>{/* End #main */}
</div>

        );
    }
}

export default MainComponent;