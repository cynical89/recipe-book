import React from 'react'
import InputField from '../common/InputField'
import TagsInput from 'react-tagsinput'

class NewRecipeForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      author: '',
      isPublic: false,
      ingredients: [],
      directions: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleShare = (e) => {
    const isChecked = e.target.checked
    this.setState({ isPublic: isChecked })
  }

  handleTags = (tags) => {
    this.setState({ ingredients: tags })
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  onKeyPress = (e) => {
    if (e.which === 13 /* Enter */) {
      e.preventDefault();
    }
  }

  render() {
    const { errors } = this.state
    return (
      <form onKeyPress={this.onKeyPress} onSubmit={this.onSubmit}>
        <h1>Add A Recipe</h1>

        <InputField
          label='Recipe Name'
          value={this.state.name}
          field='name'
          onChange={this.onChange}
          error={errors.name}
        />

        <InputField
          label='Recipe Author'
          value={this.state.author}
          field='author'
          onChange={this.onChange}
          error={errors.author}
        />

        <TagsInput 
          value={this.state.ingredients}
          inputProps={{placeholder: 'Add Ingredient', className: 'react-tagsinput-input'}}
          onChange={this.handleTags} 
        />

        <InputField
          label='Share Recipe?'
          type='checkbox'
          value="isPublic"
          field='isPublic'
          checked={this.isPublic}
          onChange={this.handleShare}
          error={errors.isPublic}
        />

        <button type='submit' className='btn btn-primary'>Add Recipe</button>
      </form>
    )
  }
}

export default NewRecipeForm