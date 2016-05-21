import React from 'react'
import Title from 'react-title-component'
import $ from 'jquery'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

    getCocktails(e) {
    e.preventDefault()
    let ingredients = this.refs.ingredients.split(',')
    $.ajax({
      url: '/api/cocktails',
      type: 'GET',
      contentType: 'application/json',
      data: {}
    }).done(cocktails => { 
      this.setState ({ cocktails: cocktails
      }).fail( () => {
        this.props.history.push ('./components/NoMatch')
      }) 
    })
  }

  render() {
    return (
      <div>
        <Title render={prev => `${prev} | Home`}/>
        <h2>Welcome Imbiber</h2>
        <body>
          <form onSubmit={this.getCocktails}>
            <div className="input-field">
              <input required={true} ref="ingredients" id="search" type="search" className="material-icons" placeholder="What ingredients do you have? (comma seperate ingredients)" />
              <a type="submit" className="waves-effect waves-light btn-flat">Submit</a>
            </div>
          </form>
        </body>
      </div>
    )
  }
}

