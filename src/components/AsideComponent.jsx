import React, { Component } from 'react';

class AsideComponent extends Component {
    render() {
        return (
            <div>
  {/* ======= Sidebar ======= */}
  <aside id="sidebar" className="sidebar">
    <ul className="sidebar-nav" id="sidebar-nav">
      <li className="nav-item">
        <a className="nav-link collapsed" href="/">
          <i className="bi bi-grid" />
          <span>Dashboard</span>
        </a>
      </li>{/* End Dashboard Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="/restaurant">
          <i className="ri-restaurant-line" />
          <span>Restaurants</span>
        </a>
      </li>{/* End Dashboard Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="/photo">
          <i className="ri-image-add-fill" />
          <span>Photo</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" href="/ville">
          <i className="ri-map-pin-line" />
          <span>Ville</span>
        </a>
      </li>{/* End Dashboard Nav */}{/* End Dashboard Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="/zone">
          <i className="ri-map-pin-add-line" />
          <span>Zone</span>
        </a>
      </li>{/* End Dashboard Nav */}
      
      <li className="nav-item">
        <a className="nav-link collapsed" href="/serie">
          <i className="ri-links-fill" />
          <span>Serie</span>
        </a>
      </li>{/* End Dashboard Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="/specialite">
          <i className="ri-restaurant-2-fill" />
          <span>Specialite</span>
        </a>
      </li>{/* End Dashboard Nav */}


    </ul>
  </aside>{/* End Sidebar*/}  
</div>

        );
    }
}

export default AsideComponent;