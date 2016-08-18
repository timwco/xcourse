let RoomService = function($http) {


  this.create = (data) => {
    return $http.post('/room', data);
  };

  this.get = (id) => {
    return $http.get('/room/' + id);
  };

  this.getRooms = () => {
    return $http.get('/room');
  };

  this.destroy = (id) => {
    return $http.put('room/' + id)
  }

};

RoomService.$inject = ['$http'];
export default RoomService ;
