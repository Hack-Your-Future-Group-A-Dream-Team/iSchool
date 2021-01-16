import React, { Component, Fragment} from 'react';
import './filterSchool.css'

const btnStyle = {
  width: '150px',
  background: '#B71C1C',
  border: "none",
  borderRadius:"10px",
  fontSize: "1.1rem",
  padding: "8px 25px",
  margin:"10px",
  color: "#fff"
}


export default class Filters extends Component {

  constructor(props) {
    super(props)

    this.state = {
      languageClasses: false,
      rating: 0,
      network: '',
      areas: ''
    }

    this.addFilter = this.addFilter.bind(this)
    this.removeFilters = this.removeFilters.bind(this)
  };

  addFilter (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  removeFilters() {

    this.setState({
      languageClasses: false,
      rating: 0,
      network: '',
      areas: ''
    })
  }
  
  

  render() {
    return (
      <Fragment>
        {console.log(this.state)}
        <div className="filterContainer">
            <h1>Filters</h1>
            
              {/* LANGUAGE */}
              <div className="filterItem">
                <input name="languageClasses" type="radio" value="true"
                checked={(this.state.languageClasses == true)}
                onChange={this.addFilter}
                ></input>
                <label for="languageClasses">Reception classes</label>
              </div>
              {/* RATING */}
              <div className="filterItem">
                <fieldset>
                  <legend>Rating</legend>
                    <div className="starRating">
                      <input className="inputStar" id="r1" type="radio" name="rating" value="5"
                      checked={(this.state.rating == 5)}
                      onChange={this.addFilter}></input>
                      <label className="labelStar far fa-star" for="r1"></label>
                      <input className="inputStar" id="r2" type="radio" name="rating" value="4"
                      checked={(this.state.rating == 4)}
                      onChange={this.addFilter}></input>
                      <label className="labelStar far fa-star" for="r2"></label>
                      <input className="inputStar" id="r3" type="radio" name="rating" value="3"
                      checked={(this.state.rating == 3)}
                      onChange={this.addFilter}></input>
                      <label className="labelStar far fa-star" for="r3"></label>
                      <input className="inputStar" id="r4" type="radio" name="rating" value="2"
                      checked={(this.state.rating == 2)}
                      onChange={this.addFilter}></input>
                      <label className="labelStar far fa-star" for="r4"></label>
                      <input className="inputStar" id="r5" type="radio" name="rating" value="1"
                      checked={(this.state.rating == 1)}
                      onChange={this.addFilter}></input>
                      <label className="labelStar far fa-star" for="r5"></label>
                    </div>
                </fieldset>
              </div>
              {/* NETWORK */}
              <div className="filterItem">
                <fieldset>
                  <legend>School Network</legend>
                  <input name="network" type="radio" value="Catholic Network" 
                  checked={(this.state.network == "Catholic Network")}
                  onChange={this.addFilter}></input>
                  <label for="network">Catholic Network</label><br></br>

                  <input name="network" type="radio" value="Municipality Schools" 
                  checked={(this.state.network == "Municipality Schools")}
                  onChange={this.addFilter}></input>
                  <label for="network">Municipality Schools</label><br></br>

                  <input name="network" type="radio" value="Private schools" 
                  checked={(this.state.network == "Private schools")}
                  onChange={this.addFilter}></input>
                  <label for="network">Private schools</label><br></br>

                  <input name="network" type="radio" value="GO Network" 
                  checked={(this.state.network == "GO Network")}
                  onChange={this.addFilter}></input>
                  <label for="network">GO Network</label>
                </fieldset>
              </div>
              {/* AREAS */}
              <div className="filterItem">
                <fieldset>
                  <legend>School Field</legend>
                  <input name="areas" type="radio" value="General" 
                  checked={(this.state.areas == "General")}
                  onChange={this.addFilter}></input>
                  <label for="areas">General</label><br></br>

                  <input name="areas" type="radio" value="Technical" 
                  checked={(this.state.areas == "Technical")}
                  onChange={this.addFilter}></input>
                  <label for="areas">Technical</label><br></br>

                  <input name="areas" type="radio" value="Vocational" 
                  checked={(this.state.areas == "Vocational")}
                  onChange={this.addFilter}></input>
                  <label for="areas">Vocational</label><br></br>

                  <input name="areas" type="radio" value="Art Secondary Education" 
                  checked={(this.state.areas == "Art Secondary Education")}
                  onChange={this.addFilter}></input>
                  <label for="areas">Art Secondary Education</label>
                </fieldset>

                <button style={btnStyle} onClick={() => { this.props.updateFilter(this.state) }}>Search</button>
                <button style={btnStyle} onClick={ this.removeFilters }>Reset filters</button>
              </div>

        </div>
      </Fragment>
      
    )
  }
}



