let RoomService = function($http, $cookies) {

  this.config = () => {
    return { headers: { Authorization: 'Bearer ' + $cookies.get('token') } };
  }

  this.create = (data) => {
    return $http.post('/room', data, this.config());
  };

  this.get = (id) => {
    return $http.get('/room/' + id);
  };

  this.getRooms = () => {
    return $http.get('/room', this.config());
  };

  this.destroy = (id) => {
    return $http.put('room/' + id, this.config())
  }

};

RoomService.$inject = ['$http', '$cookies'];
export default RoomService ;
