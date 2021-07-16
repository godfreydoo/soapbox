
export const getTwitterMetricsConfig = function() {
  return {
    method: 'get',
    url: '/twitter/metrics',
    params: {
      userId: 20702956,
      maxResults: 50
    }
  };
};

export const getTwitterPostsConfig = function(token) {
  return {
    method: 'get',
    url: '/twitter/home-timeline',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};