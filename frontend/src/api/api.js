import axios from "axios";

export const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
    'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
  },
};
export const fetchChannelDetails = async (channelId) => {
  const result = await axios.get(`https://youtube-v2.p.rapidapi.com/channel/details?channel_id=${channelId}`, options)
  console.log(`details : ${result.data}`);

  return result.data;
}
export const fetchChannelVideos = async (channelId) => {
  const result = await axios.get(`https://youtube-v2.p.rapidapi.com/channel/videos?channel_id=${channelId}`, options)
  console.log(`videos : ${result.data}`);
  
  return result.data;
}

export const fetchChannelShorts = async (channelId) => {
  const result = await axios.get(`https://youtube-v2.p.rapidapi.com/channel/shorts?channel_id=${channelId}`, options)
  return result.data;
}


