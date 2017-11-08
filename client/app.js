angular.module('whatsGood', ['ngMaterial'])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('altTheme')
      .primaryPalette('blue-grey')
      .accentPalette('deep-purple')
      .dark();
    // $mdThemingProvider.enableBrowserColor({
    //   theme: 'altTheme', // Default is 'default'
    //   palette: 'accent', // Default is 'primary', any basic material palette and extended palettes are available
    //   hue: '200' // Default is '800'
    // });
    $mdThemingProvider.setDefaultTheme('altTheme');
  })
  .component('myApp', {
    bindings: {
    },
    controller: function($mdDialog) {
      const ctrl = this;
      this.currentNavItem = 'home';
      this.isValidUser = false;
      this.user = {};
      this.password = '';

      //collapse this
      this.openLoginModal = (event, loginType) => {
        var loginController = function($mdDialog) {
          this.loginType = loginType;
          this.username = '';
          this.password = '';

          this.handleLoginButton = function(username, password) {
            if (this.loginType === 'signup') {
              //create new user and switch back to login
              this.password = '';
              this.loginType = 'login';
            } else {
              //log in new user
              this.answer(username);
            }
          };

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
                    <h2 ng-if="login.loginType === 'login'">Please Login</h2>
                    <h2 ng-if="login.loginType === 'signup'">Sign Up!</h2>
                    <span flex></span>
                    <md-button class="md-icon-button" ng-click="login.cancel()">
                      <md-icon aria-label="Close dialog">&#xE14C</md-icon>
                    </md-button>
                  </div>
                </md-toolbar>

                <md-dialog-content layout-padding>
                  <h3 ng-if="login.loginType === 'login'" content-padding>Please enter your username and password</h3>
                  <h3 ng-if="login.loginType === 'signup'" content-padding>Sign up with a username and a password</h3>
                  <md-content layout="column" layout-align="center center">
                    <md-input-container>
                      <label>Username</label>
                      <input md-autofocus ng-model="login.username">
                    </md-input-container>
                    <md-input-container>
                      <label>Password</label>
                      <input type="password" ng-model="login.password">
                    </md-input-container>
                    <md-input-container ng-if="login.loginType === 'signup'">
                      <label>Password</label>
                      <input type="password" ng-model="passwordRepeat">
                    </md-input-container>
                  </md-content>
                </md-dialog-content>

                <md-dialog-actions layout="row">
                  <md-button ng-click="login.handleLoginButton(login.username, login.password)">
                    Login
                  </md-button>
                  <span flex></span>
                  <md-button ng-click="login.loginType='signup'">
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
            ctrl.user.username = username;
            ctrl.isValidUser = true;
          }, function () {
            console.log('canceled');
          });
      };

      this.logout = () => {
        this.isValidUser = false;
        this.user = {};
        this.password = '';
      };

      this.$onInit = () => {
      };

      this.goto = (page) => {
        console.log(page);
        ctrl.currentNavItem = page;
      };
    },
    template: `
    <div layout="row">
      <div layout="column" layout-fill>
        <md-toolbar>
          <div class="md-toolbar-tools">
            <span class="md-flex">What's Good?</span>
          </div>
        </md-toolbar>

        <!-- collapse divs here -->
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
          <span flex></span>
          <div ng-if="!$ctrl.isValidUser">
            <md-button md-no-ink class="md-primary" ng-click="$ctrl.openLoginModal($event, 'login')">
              Login
            </md-button>
            <md-button md-no-ink class="md-primary" ng-click="$ctrl.openLoginModal($event, 'signup')">
              Sign Up
            </md-button>
          </div>
          <div ng-if="$ctrl.isValidUser">
            <md-button md-no-ink class="md-primary" ng-click="$ctrl.goto('home')" name="userProfile">
              Hello, {{$ctrl.user.username}}
            </md-button>
            <md-button class="md-icon-button" ng-click="$ctrl.goto('home')" aria-label="More">
              <md-icon style="color:#673AB7;font:bold;">&#xE853;</md-icon>
            </md-button>
            <md-button class="md-icon-button" ng-click="$ctrl.logout()" aria-label="More">
              <md-icon style="color:#673AB7;font:bold;">&#xE879;</md-icon>
            </md-button>
          </div>
        </md-nav-bar>
        <!-- start of app content -->
        <md-content flex>
          <div ng-if="$ctrl.currentNavItem === 'home' && $ctrl.isValidUser === false">
            <md-content layout="column" flex>
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
        </md-content>
      </div>
    </div>
`
  });
