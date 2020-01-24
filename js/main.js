var addressApp = angular.module("addressApp", ['ngRoute'])

.config(function ($routeProvider) {
      $routeProvider
            .when('/',{
                  templateUrl: './templates/list.html',
                  controller: 'listController',
                  reloadOnSearch: false,
            })
            .when('/contact',{
                  templateUrl: './templates/contact.html',
                  controller: 'contactController',
                  reloadOnSearch: false,
            })
      
})

.controller("mainController", function ($scope) {
      var datos = localStorage.getItem("addressApp_data");  

      if (datos != null) {
            $scope.contacts = [];
            var raw_contacts = JSON.parse(datos);
            _(raw_contacts).forEach(function (value) {
                  $scope.contacts.push(new Contact(value));
            });            
      }else {

            $scope.contacts = [
                  new Contact({first_name: "Salvador", last_name: "Cuevas", email: "scuevas@outlook.com", country: "DR" }),
                  new Contact({first_name: "Denys", last_name: "Vega", email: "denysvega@outlook.com", country: "CO" }),
                  new Contact({first_name: "Yumayra", last_name: "Cuevas", email: "yuma@outlook.com", country: "DR" }),
                  new Contact({first_name: "Yanerys", last_name: "Cuevas", email: "yanerys@outlook.com", country: "DR" }),
                  new Contact({first_name: "Salvador", last_name: "Cuevas", email: "scuevas@outlook.com", country: "DR" }),
                  new Contact({first_name: "Denys", last_name: "Vega", email: "denysvega@outlook.com", country: "CO" }),
                  new Contact({first_name: "Yumayra", last_name: "Cuevas", email: "yuma@outlook.com", country: "DR" }),
                  new Contact({first_name: "Yanerys", last_name: "Cuevas", email: "yanerys@outlook.com", country: "DR" }),
                  new Contact({first_name: "Salvador", last_name: "Cuevas", email: "scuevas@outlook.com", country: "DR" }),
                  new Contact({first_name: "Denys", last_name: "Vega", email: "denysvega@outlook.com", country: "CO" }),
                  new Contact({first_name: "Yumayra", last_name: "Cuevas", email: "yuma@outlook.com", country: "DR" }),
                  new Contact({first_name: "Yanerys", last_name: "Cuevas", email: "yanerys@outlook.com", country: "DR" })
      
         ];
      }

      console.debug( $scope.contacts );
})
/*
List View
 */
.controller('listController', function ($scope, $location) {
      document.getElementsByTagName("html")[0].className = "listController";

      $scope.goForm = function (_id) {
            $location.path("contact").search({id: _id});
      }

      //Scroll control
      $scope.btn_scroll_down = function (direction) {
            $scope.scroll_direction = direction;
            $scope.scroll_timer = setInterval(scroll_exe, 10);
            
      };
      $scope.btn_scroll_up = function () {
            clearInterval($scope.scroll_timer);

      };
      var scroll_exe = function () {
        var wrapper = document.getElementsByClassName("list-wrapper")[0];
        wrapper.scrollTo(0,wrapper.scrollTop + $scope.scroll_direction);
            
      };
      
})
/*
form View
 */
.controller('contactController', function ($scope,$routeParams,$location) {
      document.getElementsByTagName("html")[0].className = "contactController";

      //Back to list

      $scope.goList = function () {
            $location.path('/'); 
      };

      //country list
      $scope.countries = window.countries;
       
      //controls if new or edit and change the button bar depending on it
      $scope.new = true;
      var id_param = Number($routeParams.id);
      if (!_.isNaN(id_param)) {
            $scope.savedContact = _.find($scope.contacts, function (o) {
                  return o.id == id_param;
            });
            $scope.contact = angular.copy($scope.savedContact);
            $scope.new = false;
      };

      //save new contact
      $scope.add = function () {
            var new_contact = new Contact();
            _.forIn($scope.contact, function (value, key) {
                  new_contact[key] = value;
            });
            scope.contact.push(new_contact);
            returnHome();
            
      };

       //update contact
      $scope.update = function () {
            _.forIn($scope.contact, function (value, key) {
                  $scope.savedContact[key] = value;
            }); 
            returnHome();
      };

       //delete contact
       $scope.delete = function () {
            var deleted = _.remove($scope.contact, function (object) {
                  return object.id == $scope.contact.id;
            });
      };


      var returnHome = function () {
            persistData();
            $scope.goList();
      };

      var persistData = function () {
            localStorage.setItem("addressApp_data",JSON.stringify($scope.contacts));
      };



})

/**
 * at the end of the list render if show scroll bar
 */
.directive("listReadyDirective",function ($timeout) {
      return {
            restrict: 'A',
            link: function ($scope, elem, attrs) {
                  if ($scope.$last === true) {
                        //timeout needed to refresh the size of the ul element
                        //and wait for the finish of the view transition
                        $timeout(function() {
                              var wrapper = document.getElementsByClassName("list-wrapper")[0];
                              var ul = wrapper.getElementsByTagName("ul")[0];
                              var _display = "none";
                              console.log(ul.offsetHeight + " > " + wrapper.offsetHeight);
                              if (ul.offsetHeight > wrapper.offsetHeight) {
                                    _display = "block";
                              }
                              document.getElementsByClassName("scroll_bar")[0].style.display = _display;
                        }, 10)
                        
                  }
                  
            }
      }
      
})