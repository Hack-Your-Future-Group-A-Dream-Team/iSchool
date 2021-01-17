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
      isCatholicNetwork: false,
      isMunicipalityNetwork: false,
      isPrivateNetwork: false,
      isGoNetwork: false,
      isGeneralAreas: false,
      isTechnicalAreas: false,
      isVocationalAreas: false,
      isArtAreas: false
    }

    this.addFilter = this.addFilter.bind(this)
    this.removeFilters = this.removeFilters.bind(this)
    this.addRatingFilter = this.addRatingFilter.bind(this)
  };

  addFilter (e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  addRatingFilter (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  removeFilters() {

    this.setState({
      languageClasses: false,
      rating: 0,
      isCatholicNetwork: false,
      isMunicipalityNetwork: false,
      isPrivateNetwork: false,
      isGoNetwork: false,
      isGeneralAreas: false,
      isTechnicalAreas: false,
      isVocationalAreas: false,
      isArtAreas: false
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
                <fieldset>
                  <legend>Reception classes for Dutch learners</legend>
                    <input name="languageClasses" type="checkbox" value="true" id="LC-true"
                    checked={(this.state.languageClasses)}
                    onChange={this.addFilter}
                    ></input>
                    <label for="LC-true">Yes</label><br></br>
                </fieldset>
              </div>
              {/* RATING */}
              <div className="filterItem">
                <fieldset>
                  <legend>Rating</legend>
                    <div className="starRating">
                      <input className="inputStar" id="r1" type="radio" name="rating" value="5"
                      checked={(this.state.rating == 5)}
                      onChange={this.addRatingFilter}></input>
                      <label className="labelStar far fa-star" for="r1"></label>
                      <input className="inputStar" id="r2" type="radio" name="rating" value="4"
                      checked={(this.state.rating == 4)}
                      onChange={this.addRatingFilter}></input>
                      <label className="labelStar far fa-star" for="r2"></label>
                      <input className="inputStar" id="r3" type="radio" name="rating" value="3"
                      checked={(this.state.rating == 3)}
                      onChange={this.addRatingFilter}></input>
                      <label className="labelStar far fa-star" for="r3"></label>
                      <input className="inputStar" id="r4" type="radio" name="rating" value="2"
                      checked={(this.state.rating == 2)}
                      onChange={this.addRatingFilter}></input>
                      <label className="labelStar far fa-star" for="r4"></label>
                      <input className="inputStar" id="r5" type="radio" name="rating" value="1"
                      checked={(this.state.rating == 1)}
                      onChange={this.addRatingFilter}></input>
                      <label className="labelStar far fa-star" for="r5"></label>
                    </div>
                </fieldset>
              </div>
              {/* NETWORK */}
              <div className="filterItem">
                <fieldset>
                  <legend>School Network</legend>
                  <input name="isCatholicNetwork" type="checkbox" value="Catholic Network" id="networkCatholic"
                  checked={(this.state.isCatholicNetwork)}
                  onChange={this.addFilter}
                  ></input>
                  <label for="networkCatholic">Catholic Network</label><br></br>

                  <input name="isMunicipalityNetwork" type="checkbox" value="Municipality Schools" id="networkMunicipality"
                  checked={(this.state.isMunicipalityNetwork)}
                  onChange={this.addFilter}></input>
                  <label for="networkMunicipality">Municipality Schools</label><br></br>

                  <input name="isPrivateNetwork" type="checkbox" value="Private schools" id="networkPrivate"
                  checked={(this.state.isPrivateNetwork)}
                  onChange={this.addFilter}></input>
                  <label for="networkPrivate">Private schools</label><br></br>

                  <input name="isGoNetwork" type="checkbox" value="GO Network" id="networkGo"
                  checked={(this.state.isGoNetwork)}
                  onChange={this.addFilter}></input>
                  <label for="networkGo">GO Network</label>
                </fieldset>
              </div>
              {/* AREAS */}
              <div className="filterItem">
                <fieldset>
                  <legend>School Field</legend>
                  <input name="isGeneralAreas" type="checkbox" value="General" id="areasGeneral"
                  checked={(this.state.isGeneralAreas)}
                  onChange={this.addFilter}></input>
                  <label for="areasGeneral">General</label><br></br>

                  <input name="isTechnicalAreas" type="checkbox" value="Technical" id="areasTechnical"
                  checked={(this.state.isTechnicalAreas)}
                  onChange={this.addFilter}></input>
                  <label for="areasTechnical">Technical</label><br></br>

                  <input name="isVocationalAreas" type="checkbox" value="Vocational" id="areasVocational"
                  checked={(this.state.isVocationalAreas)}
                  onChange={this.addFilter}></input>
                  <label for="areasVocational">Vocational</label><br></br>

                  <input name="isArtAreas" type="checkbox" value="Art Secondary Education" id="areasArt"
                  checked={(this.state.isArtAreas)}
                  onChange={this.addFilter}></input>
                  <label for="areasArt">Art Secondary Education</label>
                </fieldset>

                <button style={btnStyle} onClick={() => { this.props.updateFilter(this.state) }}>Search</button>
                <button style={btnStyle} onClick={ this.removeFilters }>Reset filters</button>
              </div>

        </div>
      </Fragment>
      
    )
  }
}



