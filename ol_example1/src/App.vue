<template>
  <div id="app">
    <div id="map">
      <form class="form-inline">
        <label for="type">Geometry type: &nbsp;</label>
        <select class="form-control mr-2 mb-2 mt-2" id="type">
          <option value="Point">Point</option>
          <option value="LineString">LineString</option>
          <option value="Polygon">Polygon</option>
          <option value="Circle">Circle</option>
          <option value="None">None</option>
        </select>
        <input
          class="form-control mr-2 mb-2 mt-2"
          type="button"
          value="Undo"
          id="undo"
        />
      </form>
    </div>
  </div>
</template>
<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import Overlay from "ol/Overlay";
import Draw from "ol/interaction/Draw";
// import Select from "ol/interaction/Select";

export default {
  async mounted() {
    await this.initiateMap();
  },

  props: {
    lat: {
      required: true,
      type: Number,
    },

    lon: {
      required: true,
      type: Number,
    },

    zoom: {
      required: false,
      type: Number,
      default: 4,
    },

    markers: {
      required: false,
      type: Array,
      default() {
        return [];
      },
    },
  },

  methods: {
    initiateMap() {
      // create vector layer
      var source = new VectorSource({ wrapX: false });
      var vector = new VectorLayer({
        source: source,
      });
      // create title layer
      var raster = new TileLayer({
        source: new OSM(),
      });
      // create map with 2 layer
      var map = new Map({
        controls: defaultControls().extend([
          new ScaleLine({
            units: "degrees",
          }),
        ]),
        target: "map",
        layers: [raster, vector],
        view: new View({
          projection: "EPSG:4326",
          center: [121, 24],
          zoom: 8.5,
          minZoom: 4,
          maxZoom: 16,
        }),
      });

      var typeSelect = document.getElementById("type");

      var draw; // global so we can remove it later
      function addInteraction() {
        var value = typeSelect.value;
        if (value !== "None") {
          draw = new Draw({
            source: source,
            type: typeSelect.value,
          });
          map.addInteraction(draw);
        }
      }

    
      typeSelect.onchange = function () {
        map.removeInteraction(draw);
        addInteraction();
      };

      document.getElementById("undo").addEventListener("click", function () {
        let features = vector.getSource().getFeatures();
        features.forEach((feature) => {
          vector.getSource().removeFeature(feature);
        });
      });

      addInteraction();

      for (var i = 0; i < 10; i++) {
        var element = document.createElement("div");
        element.innerHTML =
          '<img src="https://cdn.mapmarker.io/api/v1/fa/stack?size=50&color=DC4C3F&icon=fa-microchip&hoffset=1" />';
        var marker = new Overlay({
          position: [i, i],
          positioning: "center-center",
          element: element,
          stopEvent: false,
        });
        map.addOverlay(marker);
      }
    },
  },
};
</script>
<style>
html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#map {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>