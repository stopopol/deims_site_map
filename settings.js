// geoserver settings

var geoserver_base_url = "https://deims.org/geoserver/";
var geoserver_getcapabilities_url = geoserver_base_url + "ows?service=wms&version=1.3.0&request=GetCapabilities";
var geoserver_workspace = "deims";
	
// settings for cartography

// initial zoom and position
var initial_zoom_level = 4;
var map_centre = [1929025.946814, 7494089.923109]; // EPSG:3857

// define the initial layer to be displayed; excluding the workspace name
// All sites available on DEIMS-SDR
var wms_layer_name = "deims_all_sites";
// All sites that are part of ILTER
//var wms_layer_name = "lter_all_formal";	
// All sites that are part of LTER Europe
//var wms_layer_name = "lter_eu_formal";
		
wms_layer_name = geoserver_workspace + ":" + wms_layer_name;

// object sizes
var cross_size = 4;
	
//	colour styles
var orange_fill = new ol.style.Fill({
	color: 'rgba(255,153,51,0.75)'
});

var blue_fill = new ol.style.Fill({
	color: 'rgba(44, 130, 201,0.75)'
});
				
var white_stroke = new ol.style.Stroke({
	color: '#FFFFFF',
	width: 1.5
});
		
var grey_stroke = new ol.style.Stroke({
	color: '#808080',
	width: 1
});

var white_dashed_stroke = new ol.style.Stroke({
	color: '#FFFFFF',
	width: 2,
	lineDash: [.1, 5] //or other combinations
});	

var blue_dashed_stroke = new ol.style.Stroke({
	color: '#3399FF',
	width: 2,
	lineDash: [.1, 5] //or other combinations
});

var white_cross = new ol.style.RegularShape({
	//fill: fill,
	stroke: white_stroke,
	points: cross_size,
	radius: cross_size,
	radius2: 0,
	angle: 0
});

var grey_cross = new ol.style.RegularShape({
    //fill: fill,
    stroke: grey_stroke,
	points: cross_size,
	radius: cross_size,
	radius2: 0,
	angle: 0
});

var orange_point = new ol.style.Circle({
	fill: orange_fill,
	stroke: white_stroke,
	radius: 5
});

// styles for layers
// site boundaries and centroid/representative coordinates			
var boundaries_styles = [
	new ol.style.Style({
		image: orange_point,
		fill: orange_fill,
		stroke: white_stroke,
	})
];
			
//	hydrological colour styles
var hydro_styles = [
	new ol.style.Style({
		stroke: blue_dashed_stroke,
	})
];
		
//	sampling_area_layer	
var sampling_area_styles = [
	new ol.style.Style({
		image: white_cross,
		stroke: white_dashed_stroke,
	})
];	

//	equipment_location_layer					
var equipment_location_styles = [
    new ol.style.Style({
		image: grey_cross,
		stroke: grey_stroke,
	})
];
