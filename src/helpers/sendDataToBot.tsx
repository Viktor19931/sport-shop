import axios from 'axios';

const sendDataToBot = (text: string) => {
  const token = process.env.GATSBY_TELEGRAM_BOT_TOKEN;
  const chatIds = JSON.parse(process.env.GATSBY_TELEGRAM_CHAT_IDS || '');
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  chatIds.forEach((chat_id: string) => {
    axios.post(url, { text, chat_id }).catch(console.log);
  });
};

export default sendDataToBot;
