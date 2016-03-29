angular.module('uiRouterApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("/heroes.list");

    $stateProvider
        .state('heroes', {
          abstract: true,
          template: '<ui-view/>'
        })
        .state('heroes.list', {
          url: '/heroes?query&page',
          templateUrl: 'partials/heroes.html',
          controller: 'HeroesController',
          controllerAs: 'ctrl'
        })
        .state('heroes.details', {
          url: '/heroes/{heroId:int}',
          templateUrl: 'partials/hero.details.html',
          controller: 'HeroDetailsController',
          controllerAs: 'ctrl'
        })
        .state('crisis', {
          url: '/crisis',
          templateUrl: 'partials/crisis.list.html',
          controller: 'CrisisListController',
          controllerAs: 'ctrl'
        });
  })
  .controller('HeroesController', function($stateParams, $state, HeroesService) {
    var vm = this;
    vm.query = $stateParams.query;

    vm.heroes = searchHeroes(vm.query, HeroesService.heroes);
    vm.search = function() {
      $state.go('.', {query: vm.query}, {notify: false});
      vm.heroes = searchHeroes(vm.query, HeroesService.heroes);
    };

    function searchHeroes(query, heroes) {
      if (query) {
        return heroes.filter(function(hero) {
          return hero.name.indexOf(query) == 0;
        });
      } else {
        return heroes;
      }
    }
  })
  .controller('HeroDetailsController', function($stateParams, HeroesService) {
    var vm = this;
    vm.hero = HeroesService.heroes.find(jfunction(hero) {
      return hero.id == $stateParams.heroId;
    });
  })
  .controller('CrisisListController', function(CrisisService) {

  })
  .service('HeroesService', function() {
    this.heroes = [
      {name: 'Spiderman', id: 1},
      {name: 'Batman', id: 2},
      {name: 'Superman', id: 3},
      {name: 'Hulk', id: 4}
    ];
  })
  .service('CrisisService', function() {
    this.crisises = [
    ];
  });
