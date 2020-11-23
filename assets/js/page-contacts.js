$(function() {
	googleMap();

});

const googleMap = () => {
    let coor =
        typeof coordinates !== "undefined"
            ? coordinates
			: { lat: 36.544452, lng: 31.995427 };

    initMap();

	function initMap() {
        let popupContent = '<p class="marker_content">Address</p>',
            image = {
                url: "assets/images/icons/map_marker.svg" // size: new google.maps.Size(126, 40),
            },
            coordinates = coor,
            map = new google.maps.Map(document.querySelector(".map-holder"), {
                center: coordinates,
                zoom: 15,
                // disableDefaultUI: true,
                styles: [
                    {
                        featureType: "road",
                        elementType: "labels",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        featureType: "transit",
                        elementType: "labels.text",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    }
                ]
            }),
            marker = new google.maps.Marker({
                position: coordinates,
                map: map,
                icon: image,
                animation: google.maps.Animation.DROP
            }),
            infowindow = new google.maps.InfoWindow({
                content: popupContent
            });
        marker.addListener("click", function() {
            infowindow.open(map, marker);
        });
    }

};
