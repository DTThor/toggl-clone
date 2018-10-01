const axios = require('axios');

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} = process.env;

const fetchAuthToken = async (code) => {
  const response = await axios({
    method: 'POST',
    headers: { Accept: 'application/json' },
    url: `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
  });

  const { access_token: authToken } = response.data;
  const token = await axios.get(`https://api.github.com/user?access_token=${authToken}`);

  const { name, email, avatar_url: avatarUrl } = token.data;
  return {
    name,
    email,
    avatarUrl,
    token: 'valid',
  };
};

module.exports = fetchAuthToken;
