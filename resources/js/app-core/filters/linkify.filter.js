import Autolinker from 'autolinker';

let linkifyFilter = function($sce) {

  return function (input) {
    return $sce.trustAsHtml(Autolinker.link(input));
  };

};

linkifyFilter.$inject = ['$sce'];
export default linkifyFilter;
