import React, { Component, Fragment } from "react";
import "./filterSchool.css";

const btnStyle = {
  width: "150px",
  background: "#B71C1C",
  border: "none",
  borderRadius: "10px",
  fontSize: "1.1rem",
  padding: "8px 25px",
  margin: "10px",
  color: "#fff",
  outline: "none"
};

export default class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageClasses: false,
      rating: 0,
      network: [],
      areas: [],
      collapse: true
    }

    this.addLanguageFilter = this.addLanguageFilter.bind(this)
    this.addRatingFilter = this.addRatingFilter.bind(this)
    this.addNetworkFilter = this.addNetworkFilter.bind(this)
    this.addAreasFilter = this.addAreasFilter.bind(this)
    this.removeFilters = this.removeFilters.bind(this)
  };

  addLanguageFilter(e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  addRatingFilter (e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addNetworkFilter (e) {
    let networkValue = e.target.value;

    if(e.target.checked) {
      if(!this.state.network.includes(networkValue)) {
        this.setState(prevState => ({
          network: [...prevState.network, networkValue]
        }))
      } 
    } else {
      this.setState(prevState => ({
        network: prevState.network.filter(type => type != networkValue)
      }))
    }
  };

  addAreasFilter(e) {
    let areasValue = e.target.value;

    if(e.target.checked) {
      if(!this.state.areas.includes(areasValue)) {
        this.setState(prevState => ({
          areas: [...prevState.areas, areasValue]
        }))
      } 
    } else {
      this.setState(prevState => ({
        areas: prevState.areas.filter(type => type != areasValue)
      }))
    }
  }

  removeFilters() {
    // reset state
    this.setState({
      languageClasses: false,
      rating: 0,
      network: [],
      areas: []
    })
    // remove checkboxes
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
    document.querySelectorAll('input[type=radio]').forEach( el => el.checked = false );
  }

  render() {
    return (
      <Fragment>
        {console.log(this.state)}
        <div style={{minHeight:"75vh"}} className="container-filter">
       <div id="accordion" style={{margin: "60px auto"}}>
        <div className="card" style={{background:"#000051", color:"#ffff !important"}}>
          <div className="card-header collapsed rounded-top" id="headingOne" style={{background:"#000051", color:"#ffff !important" }}>
            <h5 className="mb-0">
              <button className="btn btn-link hided" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{color:"#ffff !important"}}>
              <h1 style={{color:"#ffff"}} className="filter-header">Filters</h1>
              </button>
              <h2 className="hidden" style={{color:"#ffff"}}>Filters</h2>
            </h5>
          </div>
  
    <div id="collapseOne" className="collapse show rounded-bottom " aria-labelledby="headingOne" data-parent="#accordion" style={{background:"#000051", color:"#ffff"}}>
      <div className="card-body">
        {/* LANGUAGE */}
        <div className="filterItem">
                <fieldset>
                  <legend>Reception classes for Dutch learners</legend>
                    <input name="languageClasses" type="checkbox" id="LC-true"
                    checked={this.state.languageClasses}
                    onChange={this.addLanguageFilter}
                    ></input>
                    <label className="labelCheckbox" for="LC-true">Yes</label><br></br>
                </fieldset>
              </div>
              {/* RATING */}
              <div className="filterItem">
                <fieldset>
                  <legend>Rating</legend>
                    <div className="starRating">
                      <input className="inputStar" id="r1" type="radio" name="rating" value="5"
                      onChange={this.addRatingFilter}></input>
                      <label className="labelStar far fa-star" for="r1"></label>
                      <input className="inputStar" id="r2" type="radio" name="rating" value="4"
                      onChange={this.addRatingFilter}></input>
                      <label className="labelStar far fa-star" for="r2"></label>
                      <input className="inputStar" id="r3" type="radio" name="rating" value="3"
                      onChange={this.addRatingFilter}></input>
                      <label className="labelStar far fa-star" for="r3"></label>
                      <input className="inputStar" id="r4" type="radio" name="rating" value="2"
                      onChange={this.addRatingFilter}></input>
                      <label className="labelStar far fa-star" for="r4"></label>
                      <input className="inputStar" id="r5" type="radio" name="rating" value="1"
                      onChange={this.addRatingFilter}></input>
                      <label className="labelStar far fa-star" for="r5"></label>
                    </div>
                </fieldset>
              </div>
              {/* NETWORK */}
              <div className="filterItem">
                <fieldset>
                  <legend>School Network</legend>
                  <input name="network" type="checkbox" data="Catholic Network" value="Catholic Network" id="networkCatholic"
                  onChange={this.addNetworkFilter}
                  ></input>
                  <label className="labelCheckbox" for="networkCatholic">Catholic Network</label><br></br>

                  <input name="network" type="checkbox" data="Municipality Schools" value="Municipality Schools" id="networkMunicipality"
                  onChange={this.addNetworkFilter}></input>
                  <label className="labelCheckbox" for="networkMunicipality">Municipality Schools</label><br></br>

                  <input name="network" type="checkbox" data="Private schools" value="Private schools" id="networkPrivate"
                  onChange={this.addNetworkFilter}></input>
                  <label className="labelCheckbox" for="networkPrivate">Private schools</label><br></br>

                  <input name="network" type="checkbox" data="GO Network" value="GO Network" id="networkGo"
                  onChange={this.addNetworkFilter}></input>
                  <label className="labelCheckbox" for="networkGo">GO Network</label>
                </fieldset>
              </div>
              {/* AREAS */}
              <div className="filterItem">
                <fieldset>
                  <legend>School Field</legend>
                  <input name="areas" type="checkbox" value="General" id="areasGeneral"
                  onChange={this.addAreasFilter}></input>
                  <label className="labelCheckbox" for="areasGeneral">General</label><br></br>

                  <input name="areas" type="checkbox" value="Technical" id="areasTechnical"
                  onChange={this.addAreasFilter}></input>
                  <label className="labelCheckbox" for="areasTechnical">Technical</label><br></br>

                  <input name="areas" type="checkbox" value="Vocational" id="areasVocational"
                  onChange={this.addAreasFilter}></input>
                  <label className="labelCheckbox" for="areasVocational">Vocational</label><br></br>

                  <input name="areas" type="checkbox" value="Art Secondary Education" id="areasArt"
                  onChange={this.addAreasFilter}></input>
                  <label className="labelCheckbox" for="areasArt">Art Secondary Education</label>
                </fieldset>

                <div className="filterItem" style={{marginTop: "30px"}}>
                  <fieldset>
                  <button style={btnStyle} onClick={() => { this.props.updateFilter(this.state); this.setState({collapse: false}) }} >Search</button>
                  <button style={btnStyle} onClick={ this.removeFilters }>Reset filters</button>
                </fieldset>
                </div>

               
              </div>
      </div>
    </div>
  </div>
</div>
</div>
      </Fragment>
    );
  }
}
