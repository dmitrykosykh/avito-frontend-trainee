import React from 'react'
import './App.css'
import 'normalize.css'
import { getImages, getBigImage } from '../utils/imageApi'
import Modal from './Modal'

export default class App extends React.Component {
  state = {
    images: [],
    modalIsOpen: false,
    bigImage: null,
    comments: []
  }

  componentDidMount = async () => {
    try {
      const images = await getImages()
      this.setState({
        images: images
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleClickImage = async (image) => {
    try {
      const bigImage = await getBigImage(image)
      this.setState({
        comments: bigImage.comments,
        modalIsOpen: true,
        bigImage: bigImage
      })
    } catch (error) {
      console.error(error)
    }
  }

  renderImages = () => {
    return this.state.images.map((image) => {
      return (
        <div key={image.id}>
          <img src={image.url} className="image" onClick={() => this.handleClickImage(image)} />
        </div>
      )
    })
  }

  handleCloseModal = () => {
    this.setState({
      modalIsOpen: false
    })
  }

  isSmallDeviceScreen = () => {
    const mediaQueryList = window.matchMedia('(max-width: 600px)')
    return mediaQueryList.matches
  }

  render = () => {
    if (this.isSmallDeviceScreen()) {
      if (this.state.modalIsOpen) {
        return <Modal
          onClose={this.handleCloseModal}
          show={this.state.modalIsOpen}
          bigImage={this.state.bigImage}
          comments={this.state.comments}
        />
      } else {
        return (
          <div className="app">
            <div className="block-title">
              <h1 className="app-title">Test App</h1>
            </div>
            <div className="block-images">
              {this.renderImages()}
            </div>
            <div className="block-footer">
              <h2 className="footer-copyright">&copy; 2018-2019</h2>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className="app">
          <div className="block-title">
            <h1 className="app-title">Test App</h1>
          </div>
          <div className="block-images">
            {this.renderImages()}
          </div>
          <div className="block-footer">
            <h2 className="footer-copyright">&copy; 2018-2019</h2>
          </div>
          <Modal
            onClose={this.handleCloseModal}
            show={this.state.modalIsOpen}
            bigImage={this.state.bigImage}
            comments={this.state.comments}
          />
        </div>
      )
    }
  }
}
