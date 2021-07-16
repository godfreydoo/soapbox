
export const getTwitterPostsConfig = function(token) {
  return {
    method: 'get',
    url: '/twitter/home-timeline',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

export const getTwitterHashtagConfig = function(id) {
  return {
    method: 'post',
    url: '/twitter/hashtag-data',
    data: {
      userId: `${id}`,
      maxResults: '50'
    }
  };
};

//Below endpoints are 'paused'

export const getTwitterUserConfig = function (token, id) {
  return {
    method: 'post',
    url: '/twitter/user',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: {
      userId: `${id}`
    }
  };
};

export const getTwitterMetricsConfig = function(id) {
  return {
    method: 'post',
    url: '/twitter/metrics',
    data: {
      userId: `${id}`,
      maxResults: '50'
    }
  };
};
