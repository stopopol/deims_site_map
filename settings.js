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
var stroke_width = 2;
var style_zindex = 1;
var line_dash_value = [3, 5];

//	colour styles
var orange_fill = new ol.style.Fill({
	color: 'rgba(255,153,51,0.75)'
});

var blue_fill = new ol.style.Fill({
	color: 'rgba(44, 130, 201,0.75)'
});

var green_fill = new ol.style.Fill({
	color: '#336600'
});

var grey_fill = new ol.style.Fill({
	color: '#999999'
});

var brown_fill = new ol.style.Fill({
	color: '#996633'
});

var invisible_fill = new ol.style.Fill({
	color: '#ffffff00'
});

var white_stroke = new ol.style.Stroke({
	color: '#FFFFFF',
	width: stroke_width
});

var thin_white_stroke = new ol.style.Stroke({
	color: '#FFFFFF',
	width: stroke_width-1
});

var white_border_stroke = new ol.style.Stroke({
	color: '#FFFFFF',
	width: stroke_width+1.5,
	zIndex: style_zindex-1,
});

var white_border_stroke_dashed = new ol.style.Stroke({
	color: '#FFFFFF',
	width: stroke_width+1.5,
	zIndex: style_zindex-1,
	lineDash: line_dash_value
});

var grey_stroke = new ol.style.Stroke({
	color: '#999999',
	width: stroke_width
});

var green_stroke = new ol.style.Stroke({
	color: '#336600',
	width: stroke_width
});

var pinkish_stroke = new ol.style.Stroke({
	color: '#cc0066',
	width: stroke_width,
	lineDash: line_dash_value
});

var blueish_stroke = new ol.style.Stroke({
	color: '#666699',
	width: stroke_width,
	lineDash: line_dash_value
});

var airshed_blue_stroke = new ol.style.Stroke({
	color: '#6699cc',
	width: stroke_width,
	lineDash: line_dash_value
});

var invisible_stroke = new ol.style.Stroke({
	color: '#ffffff00',
	width: 0,
	lineDash: line_dash_value
});


var redish_stroke = new ol.style.Stroke({
	color: '#cc3333',
	width: stroke_width,
	lineDash: line_dash_value
});

var brown_stroke = new ol.style.Stroke({
	color: '#996633',
	width: stroke_width,
	lineDash: line_dash_value
});

var bright_red_stroke = new ol.style.Stroke({
	color: '#FF0000',
	width: stroke_width+1,
});

var blue_dashed_stroke = new ol.style.Stroke({
	color: '#3399FF',
	width: stroke_width,
	lineDash: line_dash_value
});

var invisble_point = new ol.style.Circle({
	fill: invisible_fill,
	stroke: invisible_stroke,
	radius: 0
});

var orange_point = new ol.style.Circle({
	fill: orange_fill,
	stroke: white_stroke,
	radius: 5
});

var green_point = new ol.style.Circle({
	fill: green_fill,
	stroke: thin_white_stroke,
	radius: 3
});

var grey_point = new ol.style.Circle({
	fill: grey_fill,
	stroke: thin_white_stroke,
	radius: 3
});

var brown_point = new ol.style.Circle({
	fill: brown_fill,
	stroke: thin_white_stroke,
	radius: 3
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
		stroke: white_border_stroke_dashed
    }),
	new ol.style.Style({
		stroke: blue_dashed_stroke,
	})
];
		
//	sampling_area_layer	
var sampling_area_styles = [
	new ol.style.Style({
		stroke: white_border_stroke,
    }),
	new ol.style.Style({
		image: green_point,
		stroke: green_stroke,
	}),
];	

//	equipment_location_layer					
var equipment_location_styles = [
	new ol.style.Style({
		stroke: white_border_stroke,
    }),
    new ol.style.Style({
		image: grey_point,
		stroke: grey_stroke
    }),
	
];

//	eshape_location_layer					
var eshape_location_styles = [
    new ol.style.Style({
		stroke: white_border_stroke_dashed
    }),
	new ol.style.Style({
		stroke: pinkish_stroke,
	}),
];

//	model_area_location_layer					
var model_area_location_styles = [
    new ol.style.Style({
		stroke: white_border_stroke_dashed
    }),
	new ol.style.Style({
		stroke: blueish_stroke,
	}),
];

//	socio_ecological_location_layer					
var socio_ecological_location_styles = [
    new ol.style.Style({
		stroke: white_border_stroke_dashed
    }),
	new ol.style.Style({
		stroke: redish_stroke,
	}),
];

//	airshed_location_layer					
var airshed_location_styles = [
    new ol.style.Style({
		stroke: white_border_stroke_dashed
    }),
	new ol.style.Style({
		stroke: airshed_blue_stroke,
	}),
];

//	other_location_layer					
var other_location_styles = [
    new ol.style.Style({
		stroke: white_border_stroke_dashed
    }),
	new ol.style.Style({
		stroke: brown_stroke,
		image: brown_point
	}),
]

var highlighting_locations_styles = [
    new ol.style.Style({
		stroke: invisible_stroke
    }),
	new ol.style.Style({
		stroke: invisible_stroke,
		image: invisble_point
	}),
]

var highlighting_locations_styles_2 = [
    new ol.style.Style({
		stroke: bright_red_stroke
    }),
	new ol.style.Style({
		stroke: invisible_stroke,
		image: invisble_point
	}),
]
