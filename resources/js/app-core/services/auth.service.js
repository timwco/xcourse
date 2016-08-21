let AuthService = function($http, $cookies) {

  this.verify = (token) => {
    const config = { headers: { Authorization: 'Bearer ' + token } }
    return $http.get('/auth/verify', config);
  }

  this.genURL = () => {
    return $http.get('/auth/url');
  }

};

AuthService.$inject = ['$http', '$cookies'];
export default AuthService;
