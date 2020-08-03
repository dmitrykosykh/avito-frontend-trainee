/* globals describe, expect, test */
import { getImages, getBigImage } from './imageApi'
import Image from '../models/image'

describe('API', () => {
  test('getImages', async () => {
    const images = await getImages()
    expect(images[0]).toHaveProperty('id')
    expect(images[0]).toHaveProperty('url')
  })

  test('getBigImage', async () => {
    const bigImage = await getBigImage(new Image(238, 'https://boiling-refuge-66454.herokuapp.com/images/'))
    expect(bigImage).toHaveProperty('id')
    expect(bigImage).toHaveProperty('url')
    expect(bigImage).toHaveProperty('comments')
  })
})
