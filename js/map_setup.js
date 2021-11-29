/**
 * map_setup.js
 *
 * Initialises the map and all of its sub-elements
 *
 */

var site_info_var = false;
var bio_geo_check_var = false;
var sampling_check_var = true;
var equipment_check_var = true;
var hydrological_catchment_check_var = false;
var eshape_check_var = false;
var model_area_check_var = false;
var airshed_check_var = false;
var socio_ecological_check_var = false;
var other_location_check_var = false;

// site names and coordinates
var site_names = [];
var site_names_appendix = [];

// fill up the menu with available layers and site names on geoserver	
parse_geoserver_getcapabilities(geoserver_getcapabilities_url);
var autocomplete_field = document.getElementById("sites_autocomplete");
var awesomplete = new Awesomplete(autocomplete_field);
fill_autocomplete(wms_layer_name, awesomplete);

// default text for Awesomplete
$('.default-value').each(function () {
	var $t = $(this),
		default_value = this.value;
	$t.css('color', '#929292');
	$t.focus(function () {
		if (this.value == default_value) {
			this.value = '';
			$t.css('color', 'black');
		}
	});
	$t.blur(function () {
		if ($.trim(this.value) == '') {
			$t.css('color', '#929292');
			this.value = default_value;
		}
	});
});


// event listener for Awesomplete
Awesomplete.$('#sites_autocomplete').addEventListener("awesomplete-selectcomplete", function () {

	overlay.setPosition(undefined);
	closer.blur();

	var inter = site_names_appendix[site_names.indexOf(Awesomplete.$('#sites_autocomplete').value)];
	var coords_3857 = ol.proj.transform([inter["lon"], inter["lat"]], 'EPSG:4326', 'EPSG:3857');

	var viewResolution = /** @type {number} */ (view.getResolution());
	var url = wmsSource.getGetFeatureInfoUrl(
		coords_3857, viewResolution, 'EPSG:3857', {
		'INFO_FORMAT': 'application/json'
	});

	var temp_deimsid = inter["deimsid"];
	
	var query_url = geoserver_base_url + geoserver_workspace + "/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=" + wms_layer_name + "&CQL_FILTER=deimsid='" + temp_deimsid + "'&outputFormat=application%2Fjson";

	view.animate({
		center: coords_3857,
		duration: 1000
	});
	render_info_box(query_url);

});

// Listener for all hasObservation links
$('#detailed_information').on('click', "a.obs_link", function () {

	var current_observation_title = $(this).text();
	var current_observation = $(this).attr('id');
	document.getElementById('observation_modal_title').innerHTML = "<h3>" + current_observation_title + "</h3>";
	document.getElementById('observation_modal_content').innerHTML = "<h4>What do you want to do with the observation?</h4><br>";
	document.getElementById('observation_modal_content').innerHTML += "<a href ='" + current_observation + "'class='no_underline_link' target='_blank'>" + "Go to the original record<sup><i class='fa fa-external-link' aria-hidden='true'></i></sup></a><br>";

});

// Close modals on escape key press
$(document).keyup(function (e) {
	if (e.keyCode == 27) { // escape key maps to keycode `27`
		$("#myModal").modal('hide');
		$("#observation_modal").modal('hide');
	}
});

// Reset map extent on R key press
$(document).keyup(function (e) {
	if (e.keyCode == 82 && !$('#sites_autocomplete').is(':focus')) { // escape key maps to keycode `27`
		set_to_wms_extent(geoserver_getcapabilities_url);
	}
});

// zoom in
$(document).keyup(function (e) {
	if (e.keyCode == 107 && !$('#sites_autocomplete').is(':focus')) {
		map.getView().animate({
		  zoom: map.getView().getZoom() + 1,
		  duration: 250
		})
	}
});

// zoom out
$(document).keyup(function (e) {
	if ((e.keyCode == 189 || e.keyCode == 109) && !$('#sites_autocomplete').is(':focus')) {
		map.getView().animate({
		  zoom: map.getView().getZoom() - 1,
		  duration: 250
		})
	}
});

/**
 * Layers listener
 *
 * get desired layer, update wms layer according to selection and print status message
 *
 */
 
// to do here
$('#layers_selection').on('click', "li", function () {
	$('#layers_selection li a').css({
		"color": ""
	});
	$('#layers_selection li').css({
		'background-color': '',
	});
	$(this).css({
		"background-color": "#337ab7",
	});
	$(this).find("a").css({
		"color": "white"
	});

	wms_layer_name = $(this).find("a").attr('id');
	var params_obj = {
		'LAYERS': wms_layer_name
	};
	wmsSource.refresh();

	fill_autocomplete(wms_layer_name, awesomplete);

	document.getElementById('map').setAttribute("style", "width:100%");
	document.getElementById('site_info').setAttribute("style", "width:0%", "height:0%");
	document.getElementById('map').style.height = window.innerHeight - document.getElementById('footer_id').clientHeight - document.getElementById('nav_menu').offsetHeight + 'px';					
	document.getElementById('wrapper').style.height = window.innerHeight - document.getElementById('footer_id').clientHeight - document.getElementById('nav_menu').offsetHeight + 'px';					
	
	map.updateSize();
	vectorSource.clear();
	selected_site_source.clear();
	overlay.setPosition(undefined);
	closer.blur();
	wmsSource.updateParams(params_obj);
	set_to_wms_extent(geoserver_getcapabilities_url);
	$("#closer_button").remove();

});

// Listener for Sampling Area layer	
$("#sampling_checkbox").change(function () {
	if (sampling_check_var == false) {
		sampling_area_layer.setVisible(true);
		sampling_check_var = true;
	} else {
		// turn off legend
		sampling_area_layer.setVisible(false);
		sampling_check_var = false;
	}
});

// Listener for Sampling Area layer	
$("#equipment_checkbox").change(function () {
	if (equipment_check_var == false) {
		equipment_location_layer.setVisible(true);
		equipment_check_var = true;
	} else {
		// turn off legend
		equipment_location_layer.setVisible(false);
		equipment_check_var = false;
	}
});

// Listener for Hydrological catchment layer	
$("#hydro_checkbox").change(function () {
	if (hydrological_catchment_check_var == false) {
		hydrological_catchment_layer.setVisible(true);
		hydrological_catchment_check_var = true;
	} else {
		// turn off legend
		hydrological_catchment_layer.setVisible(false);
		hydrological_catchment_check_var = false;
	}
});

// Listener for e-shape layer	
$("#eshape_checkbox").change(function () {
	if (eshape_check_var == false) {
		eshape_layer.setVisible(true);
		eshape_check_var = true;
	} else {
		// turn off legend
		eshape_layer.setVisible(false);
		eshape_check_var = false;
	}
});

// Listener for model area layer	
$("#loc_type_model").change(function () {
	if (model_area_check_var == false) {
		model_area_location_layer.setVisible(true);
		model_area_check_var = true;
	} else {
		// turn off legend
		model_area_location_layer.setVisible(false);
		model_area_check_var = false;
	}
});

// Listener for socio-ecological layer	
$("#loc_type_socioecological").change(function () {
	if (socio_ecological_check_var == false) {
		socio_ecological_location_layer.setVisible(true);
		socio_ecological_check_var = true;
	} else {
		// turn off legend
		socio_ecological_location_layer.setVisible(false);
		socio_ecological_check_var = false;
	}
});

// Listener for airshed layer
$("#loc_type_airshed").change(function () {
	if (airshed_check_var == false) {
		airshed_location_layer.setVisible(true);
		airshed_check_var = true;
	} else {
		// turn off legend
		airshed_location_layer.setVisible(false);
		airshed_check_var = false;
	}
});

// Listener for airshed layer
$("#loc_type_other").change(function () {
	if (other_location_check_var == false) {
		other_location_layer.setVisible(true);
		other_location_check_var = true;
	} else {
		// turn off legend
		other_location_layer.setVisible(false);
		other_location_check_var = false;
	}
});

// Listener for BioRegions/BiogeographicalRegions_LAEA/MapServer/WMSServer layer		
$("#biogeo_europe").change(function () {
	if (bio_geo_check_var == false) {
		bgr.setVisible(true);
		$('#legend_container').css("visibility", "visible");
		// turn on legend
		bio_geo_check_var = true;
	} else {
		// turn off legend
		bgr.setVisible(false);
		$('#legend_container').css("visibility", "hidden");
		bio_geo_check_var = false;
	}
});


// resize info-box and map on window change
$(window).on('resize', function () {
	resize_elements();
});

$(document).ready(function() {
	resize_elements();
});


function resize_elements() {
	document.getElementById('map').style.height = window.innerHeight - document.getElementById('footer_id').clientHeight - document.getElementById('nav_menu').offsetHeight + 'px';					
	var current_infobox_height = window.innerHeight - document.getElementById('closer').scrollHeight - document.getElementById('nav_menu').scrollHeight  - document.getElementById('footer_id').clientHeight;
	$('.scrollable_style').css('max-height', current_infobox_height);
}


/**
 * Elements that make up the popup.
 */
container = document.getElementById('popup');
content = document.getElementById('popup-content');
closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay( /** @type {olx.OverlayOptions} */({
	element: container,
	autoPan: true,
	autoPanAnimation: {
		duration: 250
	}
}));

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
	vectorSource.clear();
	selected_site_source.clear();
	overlay.setPosition(undefined);
	closer.blur();
	return false;
};

var selected_site_source = new ol.source.Vector({});
var vectorSource = new ol.source.Vector({});
var hydrological_catchment_source = new ol.source.Vector({});
var equipment_location_source = new ol.source.Vector({});
var sampling_area_source = new ol.source.Vector({});
var eshape_source = new ol.source.Vector({});
var model_area_source = new ol.source.Vector({});
var socio_ecological_source = new ol.source.Vector({});
var airshed_source = new ol.source.Vector({});
var other_locations_source = new ol.source.Vector({});
var point_layer = new ol.layer.Vector({
	source: selected_site_source,
	style: boundaries_styles,
	projection: 'EPSG:3857',
	zIndex: '5'
});

var boundaries_layer = new ol.layer.Vector({
	source: vectorSource,
	style: boundaries_styles,
	projection: 'EPSG:3857',
	zIndex: '1'
});

var hydrological_catchment_layer = new ol.layer.Vector({
	source: hydrological_catchment_source,
	style: hydro_styles,
	projection: 'EPSG:3857',
	zIndex: '2',
	visible: false
});

var eshape_layer = new ol.layer.Vector({
	source: eshape_source,
	style: eshape_location_styles,
	projection: 'EPSG:3857',
	zIndex: '2',
	visible: false
});

var sampling_area_layer = new ol.layer.Vector({
	source: sampling_area_source,
	style: sampling_area_styles,
	projection: 'EPSG:3857',
	zIndex: '2'
});

var equipment_location_layer = new ol.layer.Vector({
	source: equipment_location_source,
	style: equipment_location_styles,
	projection: 'EPSG:3857',
	zIndex: '2'
});

var model_area_location_layer = new ol.layer.Vector({
	source: model_area_source,
	style: model_area_location_styles,
	projection: 'EPSG:3857',
	zIndex: '2',
	visible: false
});

var socio_ecological_location_layer = new ol.layer.Vector({
	source: socio_ecological_source,
	style: socio_ecological_location_styles,
	projection: 'EPSG:3857',
	zIndex: '2',
	visible: false
});

var airshed_location_layer = new ol.layer.Vector({
	source: airshed_source,
	style: airshed_location_styles,
	projection: 'EPSG:3857',
	zIndex: '2',
	visible: false
});

var other_location_layer = new ol.layer.Vector({
	source: other_locations_source,
	style: other_location_styles,
	projection: 'EPSG:3857',
	zIndex: '2',
	visible: false
});

// here could change the layer to queried, add a cql filter, etc. 
var wmsSource = new ol.source.TileWMS({
	url: geoserver_getcapabilities_url + geoserver_workspace + '/wms?',
	params: {
		'LAYERS': wms_layer_name
	},
	ratio: 1,
	serverType: 'geoserver',
});

var deimsWmsLayer = new ol.layer.Tile({
	source: wmsSource
});

var bgr = new ol.layer.Image({
	visible: false,
	source: new ol.source.ImageWMS({
		url: 'http://bio.discomap.eea.europa.eu/arcgis/services/BioRegions/BiogeographicalRegions_LAEA/MapServer/WMSServer?',
		params: {
			'LAYERS': '0',
			'STYLES': 'default'
		}
	})
});

var osm = [
	new ol.layer.Tile({
		source: new ol.source.OSM()
	}),
	bgr,
	deimsWmsLayer,
	point_layer,
	boundaries_layer,
	hydrological_catchment_layer,
	sampling_area_layer,
	equipment_location_layer,
	eshape_layer,
	model_area_location_layer,
	socio_ecological_location_layer,
	airshed_location_layer,
	other_location_layer
];

var view = new ol.View({
	projection: 'EPSG:3857',
	center: map_centre,
	zoom: initial_zoom_level
});

/**
  * Define a namespace for the application.
  */
window.app = {};
var app = window.app;

/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 */
app.ResetMapControl = function (opt_options) {

	var options = opt_options || {};
	var button = document.createElement('button');
	button.innerHTML = 'R';

	var handleRotateNorth = function () {
		set_to_wms_extent(geoserver_getcapabilities_url);
	};

	button.addEventListener('click', handleRotateNorth, false);
	button.addEventListener('touchstart', handleRotateNorth, false);

	var element = document.createElement('div');
	element.className = 'reset-map-button ol-unselectable ol-control';
	element.appendChild(button);

	ol.control.Control.call(this, {
		element: element,
		target: options.target
	}); 

};
ol.inherits(app.ResetMapControl, ol.control.Control);

var map = new ol.Map({
	controls: ol.control.defaults({
		attributionOptions: {
			collapsible: false
		}
	}).extend([
		new app.ResetMapControl()
	]),
	layers: osm,
	overlays: [overlay],
	target: 'map',
	view: view
});

// set first extent of map

// for reading the deims.id from the url parameters
if (window.location.search) {
	var urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get('id')) {
		// wait a bit for the footer id to render
		setTimeout(function(){
			show_site_details("https://deims.org/api/sites/" + urlParams.get('id'));
		}, 500);
	}
}
else {
	set_to_wms_extent(geoserver_getcapabilities_url);
}


function set_to_wms_extent(geoserver_getcapabilities_url) {

	// get boundaries of WMS layer
	var x = new XMLHttpRequest();
	x.open("GET", geoserver_getcapabilities_url, true);
	x.onreadystatechange = function () {
		// on success, do the parsing
		if (x.readyState == 4 && x.status == 200) {
			var doc = x.responseXML;
			var x2js = new X2JS();
			var jsonObj = x2js.xml2json(doc);

			// get the number according to the name of the wms layer
			for (i = 0; i < jsonObj["WMS_Capabilities"]["Capability"]["Layer"]["Layer"].length; i++) {
				if (jsonObj["WMS_Capabilities"]["Capability"]["Layer"]["Layer"][i]["Name"] == wms_layer_name) {
					layer_number = i;
				}
			}

			var minlon = parseFloat(jsonObj["WMS_Capabilities"]["Capability"]["Layer"]["Layer"][layer_number]["EX_GeographicBoundingBox"]["westBoundLongitude"]);
			var maxlon = parseFloat(jsonObj["WMS_Capabilities"]["Capability"]["Layer"]["Layer"][layer_number]["EX_GeographicBoundingBox"]["eastBoundLongitude"]);
			var maxlat = parseFloat(jsonObj["WMS_Capabilities"]["Capability"]["Layer"]["Layer"][layer_number]["EX_GeographicBoundingBox"]["northBoundLatitude"]);
			var minlat = parseFloat(jsonObj["WMS_Capabilities"]["Capability"]["Layer"]["Layer"][layer_number]["EX_GeographicBoundingBox"]["southBoundLatitude"]);

			// Transform extent to EPSG:3857
			var extent = [minlon, minlat, maxlon, maxlat];
			extent = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));


			// zoom to extent
			view.fit(extent, {
				constrainResolution: false,
				duration: 1000,
				padding: [50, 50, 50, 50]
			});
			map.updateSize();

		}
	};

	x.send(null);
	return true;

}

function fill_autocomplete(wms_layer_name, awesomplete) {

	var fetch_url = geoserver_base_url + geoserver_workspace + "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + wms_layer_name + "&outputFormat=application%2Fjson";
	$.getJSON(fetch_url, function (data) {

		site_names.length = 0;
		site_names_appendix.length = 0;
		for (i = 0; i < data["features"].length; i++) {
			site_names.push(data["features"][i]["properties"]["name"]);
			site_names_appendix.push({
				lat: data["features"][i]["properties"]["field_coordinates_lat"],
				lon: data["features"][i]["properties"]["field_coordinates_lon"],
				deimsid: data["features"][i]["properties"]["deimsid"]
			});
		}
		awesomplete.list = site_names;

	})
	.fail(function () {
		$.notify("Layer could not be loaded :(", "error");
	});

}

// parse the GeoServer to get the number of layers and their names
function parse_geoserver_getcapabilities(geoserver_getcapabilities_url) {

	// get boundaries of WMS layer
	var x = new XMLHttpRequest();
	x.open("GET", geoserver_getcapabilities_url, true);
	x.onreadystatechange = function () {
		// on success, do the parsing
		if (x.readyState == 4 && x.status == 200) {
			var doc = x.responseXML;
			var X2JS = window.X2JS;
			var x2js = new X2JS();
			var jsonObj = x2js.xml2json(doc);
			var wfs_base_address = geoserver_base_url + geoserver_workspace + "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="

			// print layers to drop-down menu
			for (i = 0; i < jsonObj["WMS_Capabilities"]["Capability"]["Layer"]["Layer"].length; i++) {
				if (jsonObj["WMS_Capabilities"]["Capability"]["Layer"]["Layer"][i]["Name"]) {
					var layer_name = jsonObj["WMS_Capabilities"]["Capability"]["Layer"]["Layer"][i]["Name"];
					var layer_title = jsonObj["WMS_Capabilities"]["Capability"]["Layer"]["Layer"][i]["Title"];
					var layer_abstract = jsonObj["WMS_Capabilities"]["Capability"]["Layer"]["Layer"][i]["Abstract"];
					var layer_address = wfs_base_address + layer_name + "&outputFormat=shape-zip";

					if (layer_title.substring(0, 4) == "LTER") {
						layer_title = '- ' + layer_title;
					}

					$('#layers_selection').append('<li class="custom_menu_list"><a href="#" class="custom_menu_link" title="' + layer_abstract + '" id =' + layer_name + '>' + layer_title + '</a></li>');
					$('#export_layers_selection').append('<li class="custom_menu_list"><a href="' + layer_address + '"class="custom_menu_link" title="' + layer_abstract + ' as a Shapefile">' + layer_title + ' [.shp]</a></li>');

				}
			}
			
			var parent_list_element = document.getElementById(wms_layer_name).parentElement;
			parent_list_element.style.backgroundColor = "#337ab7";
			
			document.getElementById(wms_layer_name).style.color = "white";

		}
		if (x.status != 200) {
			$('#layers_selection').append('<li><a href="#" id="error_layer">Error: Layers could not be loaded :/</a></li>');
			$('a').filter(function (index) {
				return $(this).attr('id') === "error_layer";
			}).css({
				"background-color": "red",
				"color": "white"
			});
		}
	};

	x.send(null);
	return true;
}

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
	var viewResolution = /** @type {number} */ (view.getResolution());
	var url = wmsSource.getGetFeatureInfoUrl(
		evt.coordinate, viewResolution, 'EPSG:3857', {
		'INFO_FORMAT': 'application/json'
	});

	if (url) {
		render_info_box(url);
	}
});

function close_details() {
	document.getElementById('map').style.width = "100%";
	document.getElementById('site_info').style.height = "0px";
	document.getElementById('detailed_information').innerHTML = "";
	document.getElementById('closer').innerHTML = "";

	map.updateSize();
	vectorSource.clear();
	selected_site_source.clear();
	hydrological_catchment_source.clear();
	sampling_area_source.clear();
	equipment_location_source.clear();
	eshape_source.clear();
	$('#legend_locations_container').css("visibility", "hidden");
	location_layers_invisible();

	$("#closer_button").remove();
	site_info_var = false;

}

function location_layers_invisible () {
	$('#loc_type_hydro').css("visibility", "hidden");
	$('#loc_type_hydro').css("display", "none");
	$('#loc_type_sampling').css("visibility", "hidden");
	$('#loc_type_sampling').css("display", "none");
	$('#loc_type_equipment').css("visibility", "hidden");
	$('#loc_type_equipment').css("display", "none");
	$('#loc_type_eshape').css("visibility", "hidden");
	$('#loc_type_eshape').css("display", "none");
	$('#loc_type_socioecological').css("visibility", "hidden");
	$('#loc_type_socioecological').css("display", "none");
	$('#loc_type_model').css("visibility", "hidden");
	$('#loc_type_model').css("display", "none");
	$('#loc_type_other').css("visibility", "hidden");
	$('#loc_type_other').css("display", "none");	
	$('#loc_type_airshed').css("visibility", "hidden");
	$('#loc_type_airshed').css("display", "none");	
}

function show_site_details(json_address) {
	site_info_var = true;
	
	document.getElementById('map').setAttribute("style", "width:50%");
	
	document.getElementById('map').style.height = $(document).innerHeight() - document.getElementById('footer_id').offsetHeight - document.getElementById('nav_menu').offsetHeight + 'px';
			
	document.getElementById('site_info').setAttribute("style", "width:50%", "padding-bottom: 15px");
	map.updateSize();

	overlay.setPosition(undefined);
	closer.blur();

	parse_json(json_address);
	document.getElementById('closer').innerHTML = "<a id='closer_button' class='no_underline_link' href='javascript:;'><i class='fa fa-times' aria-hidden='true'>&nbsp;</i>Close</a>";

	// Listener for closer details
	$('#closer_button').click(function () {
		close_details();
	})

	var closer_listener = $(document).keyup(function (e) {
		if (e.keyCode == 27) { // escape key maps to keycode `27`
			if (site_info_var == true) {
				close_details();
			}
		}
	});
}


function render_info_box(url) {

	$.getJSON(url, function (data) {
		var features = data["features"];

		if (features[0]) {
			var properties = features[0];
			var information_obj = properties["properties"];
			var site_url = "<a href='" + information_obj["deimsid"] + "' class='no_underline_link' target='_blank'>View record on DEIMS-SDR<sup><i class='fa fa-external-link' aria-hidden='true'></i></sup></a>";
			var json_address = 'https://deims.org/api/sites/' + information_obj["deimsid"].substr(18);

			content.innerHTML = "<h4>" + information_obj["name"] + "</h4>";

			if (information_obj["classification"]) {
				content.innerHTML += "LTER Classification: " + information_obj["classification"] + "<br>";
			}
			content.innerHTML += site_url;
			content.innerHTML += '<br>' + '<a href=' + json_address + ' class="no_underline_link" style="white-space: nowrap;">Download site information [.json]</a>';
			content.innerHTML += "<br><a id='something' href='javascript:;' class='no_underline_link'>Show more details ...</a>";

			var current_coords = ol.proj.transform([information_obj["field_coordinates_lon"], information_obj["field_coordinates_lat"]], 'EPSG:4326', 'EPSG:3857');

			overlay.setPosition(current_coords);

			var selected_site = new ol.Feature({
				geometry: new ol.geom.Point(current_coords),
			});

			vectorSource.clear();
			selected_site_source.clear();
			hydrological_catchment_source.clear();
			sampling_area_source.clear();
			equipment_location_source.clear();
			eshape_source.clear();
			selected_site_source.addFeature(selected_site);

			$(document).keyup(function (e) {
				if (e.keyCode == 27 && typeof overlay.getPosition() !== 'undefined' && typeof overlay.getPosition() !== 'undefined') { // escape key maps to keycode `27`
					overlay.setPosition(undefined);
					closer.blur();
					vectorSource.clear();
					selected_site_source.clear();
					sampling_area_source.clear();
					hydrological_catchment_source.clear();
					equipment_location_source.clear();
				}
			});

			$(document).keyup(function (e) {
				if (e.keyCode == 13 && typeof overlay.getPosition() !== 'undefined' && typeof overlay.getPosition() !== 'undefined') { // enter key maps to keycode `13`
					document.getElementById('something').click();
				}
			});

			// Listener for site details 
			$('#something').click(function () {
				show_site_details(json_address);
			})
		};
	});
}
