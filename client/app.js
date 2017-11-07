angular.module('whatsGood', ['ngMaterial'])
  .component('myApp', {
    bindings: {
    },
    controller: function() {
      const ctrl = this;
      ctrl.currentNavItem = 'home';
      this.goto = function(page) {
        ctrl.currentNavItem = page;
      }
    },
    template: `
      <md-content layout="row" flex>
        <md-nav-bar md-selected-nav-item="currentNavItem" nav-bar-aria-label="navigation links">
          <md-nav-item md-nav-click="$ctrl.goto('home')" name="home">
            Home
          </md-nav-item>
        </md-nav-bar>
        <md-content layout="column" flex="100">
          content
        </md-content>
      </md-content>
`
  });
