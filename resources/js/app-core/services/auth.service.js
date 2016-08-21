let AuthService = function($http) {

  this.verify = () => {
    return $http.get('/auth/verify');
  }

  this.genURL = () => {
    return $http.get('/auth/url');
  }

};

AuthService.$inject = ['$http'];
export default AuthService;
