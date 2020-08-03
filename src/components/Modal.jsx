import React from 'react'
import './Modal.css'
import PropTypes from 'prop-types'
import axios from 'axios'
import Comment from '../models/comment'
import moment from 'moment'

export default class Modal extends React.Component {
  state = {
    name: '',
    comment: '',
    comments: []
  }

  formatCommentDate = (date) => {
    return moment(date).format('DD.MM.YYYY')
  }

  renderComments = () => {
    return (
      this.state.comments.map((comment) => {
        return (
          <div key={comment.id} className="Modal__Comment">
            <div className="Modal__Comment-date">{this.formatCommentDate(comment.date)}</div>
            <div className="Modal__Comment-description">{comment.description}</div>
          </div>
        )
      })
    )
  }

  validateInputs = () => {
    return this.state.name.length !== 0 && this.state.comment.length !== 0
  }

  addComment = () => {
    if (this.validateInputs()) {
      axios.post(['https://boiling-refuge-66454.herokuapp.com/images/', this.props.bigImage.id, '/', 'comments'].join(''),
        {
          id: this.props.bigImage.id,
          date: new Date(),
          name: this.state.name,
          comment: this.state.comment
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.error(error)
        })
      this.setState((prevState) => {
        return {
          name: '',
          comment: '',
          comments: [...prevState.comments, new Comment(this.state.name, this.state.comment)]
        }
      })
    }
  }

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleChangeComment = (event) => {
    this.setState({
      comment: event.target.value
    })
  }

  render = () => {
    if (this.props.show === false) {
      return null
    } else {
      return (
        <div className="Modal">
          <div className="Modal__Content">
            <div className="Modal_Block-image">
              {this.props.bigImage !== null
                ? <img src={this.props.bigImage.url} className="Modal__Image"/>
                : null}
            </div>
            {this.state.comments.length !== 0
              ? (<div className="Modal__Block-comments">
                {this.renderComments()}
              </div>)
              : null}

            <div className="Modal__Block-add-comment__Inputs">
              <input
                type="text" placeholder="Ваше имя" className="Modal__Input-name"
                onChange={this.handleChangeName}
                value={this.state.name} />
              <input
                type="text" placeholder="Ваш комментарий" className="Modal__Input-comment"
                onChange={this.handleChangeComment}
                value={this.state.comment} />
              <button className="Modal__Button" onClick={this.addComment}>Оставить комментарий</button>
            </div>
            <div className="Modal__Block-close">
              <a href="#" className="Modal__Close" onClick={this.props.onClose}>X</a>
            </div>
          </div>
        </div>
      )
    }
  }
}

Modal.propTypes = {
  bigImage: PropTypes.object,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  comments: PropTypes.array
}
