var map;


function PinDrop () {
    this.initialize.apply(this, arguments);
}

(function (proto) {
    proto.initialize = function (mapElement, buttonElement) {
        this.mapElement = mapElement;
        this.buttonElement = buttonElement;
        this.minRadius = 0.0;
        this.maxRadius = 0.006;
        this.zoom = 15;

        this.location = {
            lat: 42.3516294,
            lng: -71.0495707
        }
    };

    // Construct a google map within the element we chose.
    proto.createMap = function () {
        if (this.map) {
            return;
        }

        options = {
            zoom: this.zoom,
            center: this.location
        }
        this.map = new google.maps.Map(this.mapElement, options);

        this.livenButton();
        this.livenCenterButton();
    }

    proto.getClickEventName = function () {
        var clickEventName;

        clickEventName = 'click';

        return clickEventName;
    }

    proto.livenButton = function () {
        this.buttonElement.addEventListener(this.getClickEventName(),
                                            this.dropPin.bind(this));
    }

    proto.livenCenterButton = function () {
        this.buttonElement.addEventListener(this.getClickEventName(),
                                            this.useLocation.bind(this));
    }

    proto.dropPin = function () {
        var center, centerLocation, pinLocation;

        center = this.map.getCenter();
        centerLocation = {
            lat: center.lat(),
            lng: center.lng()
        };
        pinLocation = this.generateLocationNear(centerLocation, this.minRadius, this.maxRadius);

        if (!this.pin) {
            this.pin = new google.maps.Marker({
                position: pinLocation,
                map: this.map
            });
        } else {
            this.pin.setPosition(pinLocation);
        }

        console.log(pinLocation);
    };

    proto.generateLocationNear = function (location, minRadius, maxRadius) {
        var theta, radius;
        var dx, dy;

        theta = Math.random() * Math.PI * 2;
        radius = Math.random() * (maxRadius - minRadius) + minRadius;

        dx = Math.cos(theta) * radius;
        dy = Math.sin(theta) * radius;

        return {
            lat: location.lat + dx,
            lng: location.lng + dy
        };
    }

    proto.recenter = function (location) {
        this.location = location;
        if (this.map) {
            console.log('panning to:', location);
            this.map.panTo(location);
        }
    }

    proto.useLocation = function () {
        var self = this;
        navigator.geolocation.getCurrentPosition(handleBrowserLocation);

        function handleBrowserLocation (browserLocation) {
            self.recenter({
                lat: browserLocation.coords.latitude,
                lng: browserLocation.coords.longitude
            });
        }
    }

}(PinDrop.prototype));
