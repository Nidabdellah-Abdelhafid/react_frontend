import React, { Component } from 'react'

 class HeaderComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render() {
    return (
      <div>
  {/* ======= Header ======= */}
  <header id="header" className="header fixed-top d-flex align-items-center">
    <div className="d-flex align-items-center justify-content-between">
      <a href="/" className="logo d-flex align-items-center">
        <img src="assets/img/ins_Icon.gif" alt="" />
        <span className="d-none d-lg-block">Restaurants</span>
      </a>
      <i className="bi bi-list toggle-sidebar-btn" />
    </div>{/* End Logo */}
    <div className="search-bar">
      <form className="search-form d-flex align-items-center" method="POST" action="/">
        <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
        <button type="submit" title="Search"><i className="bi bi-search" /></button>
      </form>
    </div>{/* End Search Bar */}
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        
        <li className="nav-item dropdown pe-3">
          <a className="nav-link nav-profile d-flex align-items-center pe-0" href="/" data-bs-toggle="dropdown">
            <img src="assets/img/logp.png" alt="Profile" className="rounded-circle" />
            <span className="d-none d-md-block dropdown-toggle ps-2">NMM PROJECT</span>
          </a>{/* End Profile Iamge Icon */}
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li className="dropdown-header">
              <h6>NIDABDELLAH</h6>
              <h6>MOUKET</h6>
              <h6>MADILI</h6>
              <span>Student</span>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            
            
          </ul>{/* End Profile Dropdown Items */}
        </li>{/* End Profile Nav */}
      </ul>
    </nav>{/* End Icons Navigation */}
  </header>{/* End Header */}
</div>

    )
  }
}
export default HeaderComponent