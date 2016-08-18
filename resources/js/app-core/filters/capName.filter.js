let capNameFilter = function() {

  return function (input) {
    let className;
    switch (input) {
      case 'rb':
        className = 'Ruby';
      break;
      case 'js':
        className = 'JavaScript';
      break;
      case 'de':
        className = 'Design';
      break;
      case 'ios':
        className = 'iOS';
      break;
      case 'java':
        className = 'Java';
      break;
      case 'net':
        className = '.NET';
      break;
      default:
        className = input;
      break;
    }
    
    return className;
  };

};

capNameFilter.$inject = [];
export default capNameFilter;