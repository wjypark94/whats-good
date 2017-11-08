angular.module('whatsGood')
  .component('itinerary', {
    bindings: {
    },
    controller: function() {
      //remove after bindings so not overwritten
      this.itinerary = {};
      this.itinerary.imagePath = 'http://dandelionmoms.com/wp-content/uploads/2012/11/Photo.SantaMonica.4541889759_89e6bdc232_z.jpg';
      this.itinerary.itineraryName = 'SM Trip with the boys';
    },
    template: `
      <div layout="row">
        <div flex="35" layout="column" class="boxWithHeight" layout-padding>
          <!-- itinerary list -->
          <section flex="80">
            <md-content class="md-padding" layout-xs="column" layout="row">
              <div flex-xs flex-gt-xs="95" layout="column">
                <md-card>
                  <div style="position:relative">
                    <img flex="100" ng-src="{{$ctrl.itinerary.imagePath}}" class="md-card-image" alt="Washed Out">
                    <div style="position:absolute; bottom:0px; left:0px; height:auto; width:100%; text-align:center; font-size:1.5em; padding: 10px 0px; background-color:rgba(0,0,0,0.6)">
                      {{$ctrl.itinerary.itineraryName}}
                    </div>
                  </div>
                  <md-card-content>
                    <p>
                      The titles of Washed Out's breakthrough song and the first single from Paracosm share the
                      two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well...
                    </p>
                    <p>
                      The titles of Washed Out's breakthrough song and the first single from Paracosm share the
                      two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well...
                    </p>
                    <p>
                      The titles of Washed Out's breakthrough song and the first single from Paracosm share the
                      two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well...
                    </p>
                  </md-card-content>
                  <md-card-actions layout="row" layout-align="end center">
                    <md-button>Action 1</md-button>
                    <md-button>Action 2</md-button>
                  </md-card-actions>
                </md-card>
              </div>
            </md-content>
          </section>

          <section flex></section>
        </div>

        <div flex layout="column" class="boxWithHeight" layout-padding>

          <section flex="70">

          </section>
          <section flex ></section>
        </div>
      </div>
`
  });
