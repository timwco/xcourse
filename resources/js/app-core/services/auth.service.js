let AuthService = function($http) {

  this.verify = () => {
    return $http.get('/auth/verify');
  }

};

AuthService.$inject = ['$http'];
export default AuthService;
