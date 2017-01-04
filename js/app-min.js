function initMap(){var e={lat:22.0584376,lng:-159.4974082};map=new google.maps.Map(document.getElementById("map"),{center:e,zoom:15,scrollwheel:!1,styles:[{featureType:"all",elementType:"labels",stylers:[{lightness:63},{hue:"#ff0000"}]},{featureType:"administrative",elementType:"all",stylers:[{hue:"#000bff"},{visibility:"on"}]},{featureType:"administrative",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"labels",stylers:[{color:"#4a4a4a"},{visibility:"on"}]},{featureType:"administrative",elementType:"labels.text",stylers:[{weight:"0.01"},{color:"#727272"},{visibility:"on"}]},{featureType:"administrative.country",elementType:"labels",stylers:[{color:"#ff0000"}]},{featureType:"administrative.country",elementType:"labels.text",stylers:[{color:"#ff0000"}]},{featureType:"administrative.province",elementType:"geometry.fill",stylers:[{visibility:"on"}]},{featureType:"administrative.province",elementType:"labels.text",stylers:[{color:"#545454"}]},{featureType:"administrative.locality",elementType:"labels.text",stylers:[{visibility:"on"},{color:"#737373"}]},{featureType:"administrative.neighborhood",elementType:"labels.text",stylers:[{color:"#7c7c7c"},{weight:"0.01"}]},{featureType:"administrative.land_parcel",elementType:"labels.text",stylers:[{color:"#404040"}]},{featureType:"landscape",elementType:"all",stylers:[{lightness:16},{hue:"#ff001a"},{saturation:-61}]},{featureType:"poi",elementType:"labels.text",stylers:[{color:"#828282"},{weight:"0.01"}]},{featureType:"poi.government",elementType:"labels.text",stylers:[{color:"#4c4c4c"}]},{featureType:"poi.park",elementType:"all",stylers:[{hue:"#00ff91"}]},{featureType:"poi.park",elementType:"labels.text",stylers:[{color:"#7b7b7b"}]},{featureType:"road",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels.text",stylers:[{color:"#999999"},{visibility:"on"},{weight:"0.01"}]},{featureType:"road.highway",elementType:"all",stylers:[{hue:"#ff0011"},{lightness:53}]},{featureType:"road.highway",elementType:"labels.text",stylers:[{color:"#626262"}]},{featureType:"transit",elementType:"labels.text",stylers:[{color:"#676767"},{weight:"0.01"}]},{featureType:"water",elementType:"all",stylers:[{hue:"#0055ff"}]}]}),vm=new ViewModel,ko.applyBindings(vm)}function googleError(){alert("At this time we are unable to load Google Maps")}var map,vm,Attraction=function(e){this.title=e.title,this.fact=e.fact,this.lat=e.location.lat,this.lng=e.location.lng,this.marker=e.marker,this.wikiTitle=e.wikiTitle},markers=[],ViewModel=function(){function e(e,t){var i=this;i.content=e,i.url=t}function t(e){e.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){e.setAnimation(google.maps.Animation["null"])},2e3)}function l(e,t){function i(t,i){if(i==google.maps.StreetViewStatus.OK){var l=t.location.latLng,a=google.maps.geometry.spherical.computeHeading(l,e.position);u.setContent("<div>"+e.title+"</div><div>"+e.fact+'</div><div id="thumbnail"></div>');var o={position:l,pov:{heading:a,pitch:15}};new google.maps.StreetViewPanorama(document.getElementById("thumbnail"),o)}else u.setContent("<div>"+e.title+"</div><div>No Street View Found</div>")}if(t.marker!=e){u.setContent(""),t.marker=e,e.setIcon(s),t.addListener("closeclick",function(){e.setIcon(r),t.setMarker=null});var l=new google.maps.StreetViewService,a=50;l.getPanoramaByLocation(e.position,a,i),u.open(map,e)}}var a=this;a.myList=ko.observableArray([]),model.forEach(function(e){a.myList.push(new Attraction(e))}),a.currentAttraction=function(){l(this.marker,u),t(this.marker,c),wikiFill(this.wikiTitle)},a.filter=ko.observable(""),a.attractionList=ko.computed(function(){var e=a.filter().toLowerCase();if(e){var t=ko.utils.arrayFilter(a.myList(),function(t){return-1!==t.title.toLowerCase().indexOf(e)?(t.marker.setVisible(!0),!0):(t.marker.setVisible(!1),!1)});return t}return a.myList()}),a.articleList=ko.observableArray([]),wikiFill=function(t){a.articleList.removeAll();var i=setTimeout(function(){alert("Wikipedia API could not be reached")},3e3);wikiUrl="https://en.wikipedia.org/w/api.php?action=opensearch&search="+t+"&format=json&callback=wikiCallback",$.ajax({url:wikiUrl,dataType:"jsonp",success:function(t){a.articleList.removeAll(),articleList=t[1],articleStr=articleList[0];var l="https://en.wikipedia.org/wiki/"+articleStr;a.articleList.push(new e(articleStr,l)),clearTimeout(i)}})};var o=new google.maps.LatLngBounds,r="https://maps.google.com/mapfiles/ms/icons/red-dot.png",s="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";for(i=0;i<a.myList().length;i++){var n=new google.maps.LatLng(a.myList()[i].lat,a.myList()[i].lng),m=a.myList()[i].title,p=a.myList()[i].fact,y=a.myList()[i].wikiTitle,c=new google.maps.Marker({map:map,icon:r,position:n,title:m,fact:p,wikiTitle:y,animation:google.maps.Animation.DROP,id:i});markers.push(c),a.myList()[i].marker=c;var u=new google.maps.InfoWindow;c.addListener("click",function(){l(this,u),t(this,c),wikiFill(this.wikiTitle)}),c.addListener("mouseover",function(){this.setIcon(s)}),c.addListener("mouseout",function(){this.setIcon(r)}),o.extend(markers[i].position),map.fitBounds(o)}};