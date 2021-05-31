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
		// All sites participating in the H2020 project EcoPotential
		//var wms_layer_name = "ecopotential_all";
		// All sites that are part of ILTER
		//var wms_layer_name = "lter_all_formal";	
		// All sites that are part of LTER Europe
		//var wms_layer_name = "lter_eu_formal";
		// All sites participating in the Teabag initiative
		//var wms_layer_name = "teabag_all";
		
		wms_layer_name = geoserver_workspace + ":" + wms_layer_name;
	
	//	colour styles
		var orange_fill = new ol.style.Fill({
		   color: 'rgba(255,153,51,0.75)'
		});
				
		var white_stroke = new ol.style.Stroke({
		   color: '#FFFFFF',
		   width: 1.25
		});
				
		var styles = [
		   new ol.style.Style({
			 image: new ol.style.Circle({
			   fill: orange_fill,
			   stroke: white_stroke,
			   radius: 5
			 }),
			 fill: orange_fill,
			 stroke: white_stroke,
		   })
		];
		
		
	//	hydrological colour styles
		var blue_fill = new ol.style.Fill({
		   color: 'rgba(44, 130, 201,0.75)'
		});
				
		var blue_dashed_stroke = new ol.style.Stroke({
		   color: '#336699',
		   width: 3,
		   lineDash: [.1, 5] //or other combinations
		});
				
		var hydro_styles = [
		   new ol.style.Style({
			 //fill: blue_fill,
			 stroke: blue_dashed_stroke,
		   })
		];
