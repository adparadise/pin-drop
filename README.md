# Pin Drop

A project to randomly pick a location on a map within walking distance
of your location.

## Deployment

1. Create an API key following the instructions here:
[https://developers.google.com/maps/documentation/javascript/tutorial#api_key](Google
Maps API Key tutorial)

2. Insert the API key in `index.html`

    <script src="https://maps.googleapis.com/maps/api/js?key=[API Key Here]"></script>

3. Serve this with a hostname:port that matches any restrictions you
may have set up.

## Use

1. Center the map where you want
2. If you use the recenter button, be patient! It's slow.
3. Press the big "Drop Pin" button to pick a location
     Note that it may appear out of your view. It is placed within 1 mile of the center of your view.
