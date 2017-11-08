angular.module('whatsGood', ['ngMaterial'])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('altTheme')
      .primaryPalette('blue-grey')
      .dark();
    // $mdThemingProvider.setDefaultTheme('altTheme');
  })
  .component('myApp', {
    bindings: {
    },
    controller: function($mdDialog) {
      const ctrl = this;
      this.currentNavItem = 'home';
      this.isValidUser = false;
      this.username = '';
      this.password = '';

      this.openLoginModal = (event) => {
        var loginController = function($mdDialog) {
          this.hide = function () {
            console.log('hide');
            $mdDialog.hide();
          };

          this.cancel = function () {
            console.log('cancel');

            $mdDialog.cancel();
          };

          this.answer = function (answer) {
            console.log('answer', answer);
            $mdDialog.hide(answer);
          };
        };

        $mdDialog.show({
          controller: loginController,
          controllerAs: 'login',
          template: `
            <md-dialog aria-label="User Login">
              <form ng-cloak>
                <md-toolbar>
                  <div class="md-toolbar-tools">
                    <h2>Please Login</h2>
                    <span flex></span>
                    <md-button class="md-icon-button" ng-click="login.cancel()">
                      <md-icon aria-label="Close dialog">&#xE14C</md-icon>
                    </md-button>
                  </div>
                </md-toolbar>

                <md-dialog-content>
                  <h2>Please enter your username and password</h2>
                  <md-input-container>
                    <label>Username</label>
                    <input ng-model="username">
                  </md-input-container>
                  <md-input-container>
                    <label>Password</label>
                    <input type="password" ng-model="password">
                  </md-input-container>
                </md-dialog-content>

                <md-dialog-actions layout="row">
                  <md-button md-autofocus ng-click="login.answer(username)">
                    Login
                  </md-button>
                  <span flex></span>
                  <md-button ng-click="login.cancel()">
                    Sign-Up
                  </md-button>
                  <md-button ng-click="login.cancel()">
                    Cancel
                  </md-button>
                </md-dialog-actions>
              </form>
            </md-dialog>
          `,
          targetEvent: event,
          parent: angular.element(document.body),
          clickOutsideToClose: true,
        })
          .then(function (username) {
            console.log('answered');
            ctrl.isValidUser = true;
          }, function () {
            console.log('canceled');
          });
      };

      this.$onInit = () => {
      };

      this.goto = (page) => {
        console.log(page);
        ctrl.currentNavItem = page;
      };
    },
    template: `
      <md-content layout="column" flex>
        <md-nav-bar md-selected-nav-item="$ctrl.currentNavItem" nav-bar-aria-label="navigation links">
          <md-nav-item md-nav-click="$ctrl.goto('home')" name="home">
            Home
          </md-nav-item>
          <md-nav-item md-nav-click="$ctrl.goto('search')" name="search">
            Search
          </md-nav-item>
          <md-nav-item md-nav-click="$ctrl.goto('itinerary')" name="itinerary">
            Itinerary
          </md-nav-item>
        </md-nav-bar>
      </md-content>
      <md-content>
        <div ng-if="$ctrl.currentNavItem === 'home' && $ctrl.isValidUser === false">
          <md-content layout="column" flex>
            <md-button class="md-primary md-raised" ng-click="$ctrl.openLoginModal($event)">
              Login
            </md-button>
            <!-- Home for anon user-->
            <home-anon />

          </md-content>
        </div>
        <div ng-if="$ctrl.currentNavItem === 'home' && $ctrl.isValidUser === true">
          <md-content layout="column" flex>
            <!-- Home for valid user-->
            <home-user />

          </md-content>
        </div>
        <div ng-if="$ctrl.currentNavItem === 'search'">
          <md-content layout="column" flex>
            <!-- search field -->
            <itinerary-search />

          </md-content>
        </div>
        <div ng-if="$ctrl.currentNavItem === 'itinerary'">
          <md-content layout="column" flex>
            <!-- itinerary area-->
            <itinerary />

          </md-content>
        </div>
      <md-content>
`
  });
