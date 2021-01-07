import React, { Component, Fragment, useState } from 'react';
import './filterSchool.css'

export default class Filters extends Component {

  constructor(props) {
    super(props)

    this.state = {
      filterToggle: false,
      language_classes: false,
      rating: 0,
      network: '',
      areas: ''
    }

    this.onValueChange = this.onValueChange.bind(this)
  }

  onValueChange(e) {
    this.setState({
      filterToggle: true,
      [e.target.name]: e.target.value
    }) 
  }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <div className="filterContainer">
            <h1>Filters</h1>
            {/* LANGUAGE */}
            <div className="filterItem">
              <input data-cat="language_classes" name="language_classes" type="radio" value="true"
              checked={this.state.language_classes === true} onChange={this.onValueChange}
              ></input>
              <label for="language_classes">Language classes</label>
            </div>
            {/* RATING */}
            <div className="filterItem">
              <fieldset>
                <legend>Rating</legend>
                  <div className="starRating">
                    <input className="inputStar" id="r1" type="radio" name="rating" data-cat="rating" value="1"
                    checked={this.state.rating === "1"} onChange={this.onValueChange}></input>
                    <label for="r1"><i className="far fa-star"></i></label>
                    <input className="inputStar" id="r2" type="radio" name="rating" data-cat="rating" value="2"
                    checked={this.state.rating === "2"} onChange={this.onValueChange}></input>
                    <label for="r2"><i className="far fa-star"></i></label>
                    <input className="inputStar" id="r3" type="radio" name="rating" data-cat="rating" value="3"
                    checked={this.state.rating === "3"} onChange={this.onValueChange}></input>
                    <label for="r3"><i className="far fa-star"></i></label>
                    <input className="inputStar" id="r4" type="radio" name="rating" data-cat="rating" value="4"
                    checked={this.state.rating === "4"} onChange={this.onValueChange}></input>
                    <label for="r4"><i className="far fa-star"></i></label>
                    <input className="inputStar" id="r5" type="radio" name="rating" data-cat="rating" value="5"
                    checked={this.state.rating === "5"} onChange={this.onValueChange}></input>
                    <label for="r5"><i className="far fa-star"></i></label>
                  </div>
              </fieldset>
            </div>
            {/* NETWORK */}
            <div className="filterItem">
              <fieldset>
                <legend>School Network</legend>
                <input name="network" type="radio" value="Catholic_Network"
                checked={this.state.network === "Catholic_Network"} onChange={this.onValueChange}></input>
                <label for="network">Catholic Network</label><br></br>

                <input name="network" type="radio" value="Municipality_Schools"
                checked={this.state.network === "Municipality_Schools"} onChange={this.onValueChange}></input>
                <label for="network">Municipality Schools</label><br></br>

                <input name="network" type="radio" value="Private_schools"
                checked={this.state.network === "Private_schools"} onChange={this.onValueChange}></input>
                <label for="network">Private schools</label><br></br>

                <input name="network" type="radio" value="GO_Network"
                checked={this.state.network === "GO_Network"} onChange={this.onValueChange}></input>
                <label for="network">GO Network</label>
              </fieldset>
            </div>
            {/* AREAS */}
            <div className="filterItem">
              <fieldset>
                <legend>School Field</legend>
                <input name="areas" type="radio" value="General"
                checked={this.state.areas === "General"} onChange={this.onValueChange}></input>
                <label for="areas">General</label><br></br>

                <input name="areas" type="radio" value="Technical"
                checked={this.state.areas === "Technical"} onChange={this.onValueChange}></input>
                <label for="areas">Technical</label><br></br>

                <input name="areas" type="radio" value="Vocational"
                checked={this.state.areas === "Vocational"} onChange={this.onValueChange}></input>
                <label for="areas">Vocational</label><br></br>

                <input name="areas" type="radio" value="Art_Secondary_Education"
                checked={this.state.areas === "Art_Secondary_Education"} onChange={this.onValueChange}></input>
                <label for="areas">Art Secondary Education</label>
              </fieldset>
            </div>
        </div>
      </Fragment>
      
    )
  }
}


