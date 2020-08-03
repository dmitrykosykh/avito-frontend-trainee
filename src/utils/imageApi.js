import axios from 'axios'
import Image from '../models/image'
import BigImage from '../models/bigImage'
import 'regenerator-runtime/runtime'

const getImages = async () => {
  try {
    const response = await axios.get('https://boiling-refuge-66454.herokuapp.com/images')
    return response.data.map((element) => new Image(element.id, element.url))
  } catch (error) {
    throw new Error('Fail to fetch images')
  }
}

const getBigImage = async (image) => {
  try {
    const responce = await axios.get(['https://boiling-refuge-66454.herokuapp.com/images/', image.id].join(''))
    return new BigImage(responce.data.id, responce.data.url, responce.data.comments)
  } catch (error) {
    throw new Error('Fail to fetch an image')
  }
}

export { getImages, getBigImage }
