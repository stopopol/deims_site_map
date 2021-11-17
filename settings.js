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
	
	//	colour styles
		var orange_fill = new ol.style.Fill({
		   color: 'rgba(255,153,51,0.75)'
		});
				
		var white_stroke = new ol.style.Stroke({
		   color: '#FFFFFF',
		   width: 1.5
		});
		
		var grey_stroke = new ol.style.Stroke({
		   color: '#808080',
		   width: 1.5
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
		   color: '#3399FF',
		   width: 2,
		   lineDash: [.1, 5] //or other combinations
		});
				
		var hydro_styles = [
		   new ol.style.Style({
			 //fill: blue_fill,
			 stroke: blue_dashed_stroke,
		   })
		];
		
	//	sampling_area_layer	
		var white_cross = new ol.style.Style({
          image: new ol.style.RegularShape({
            //fill: fill,
            stroke: white_stroke,
            points: 4,
            radius: 10,
            radius2: 0,
            angle: 0
          })
        });

		var white_dashed_stroke = new ol.style.Stroke({
		   color: '#FFFFFF',
		   width: 2,
		   lineDash: [.1, 5] //or other combinations
		});
				
		var sampling_area_styles = [
		   new ol.style.Style({
			 image: new ol.style.RegularShape({
				//fill: fill,
				stroke: white_stroke,
				points: 4,
				radius: 4,
				radius2: 0,
				angle: 0
			  }),
			 stroke: white_dashed_stroke,
		   })
		];	

	//	equipment_location_layer				
		var grey_dashed_stroke = new ol.style.Stroke({
		   color: '#808080',
		   width: 1,
		   //lineDash: [.1, 5] //or other combinations
		});
				
		var equipment_location_styles = [
		   new ol.style.Style({
			 image: new ol.style.Circle({
			   stroke: grey_stroke,
			   radius: 3
			 }),
			 stroke: grey_dashed_stroke,
		   })
		];
