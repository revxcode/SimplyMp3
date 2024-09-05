import axios from 'axios'

export const youtubeMp36 = async (id: string) => {
  if (!id) return null

  const options = {
    method: 'GET',
    url: process.env.YOUTUBEMP36_API_URL,
    params: { id },
    headers: {
      'x-rapidapi-key': process.env.YOUTUBEMP36_API_KEY,
      'x-rapidapi-host': process.env.YOUTUBEMP36_API_HOST
    }
  }

  
  try {
    const response = await axios.request(options)
    
    console.log(response.data.status, ': ', response.data.title || response.data.msg)

    return response.data.status === 'ok' ? {
      code: 200,
      url: response.data.link,
      message: response.data.msg,
      duration: response.data.duration,
      filesize: response.data.filesize,
      title: response.data.title,
      status: response.data.status,
    } : {
      code: response.data.code,
      url: null,
      message: response.data.msg || response.data.error,
      duration: null,
      filesize: null,
      title: null,
      status: response.data.status
    }
  } catch (error) {
    // console.error(error)
    return error
  }
}

