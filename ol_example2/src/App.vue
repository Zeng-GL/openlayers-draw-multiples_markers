<template>
  <vl-map data-projection="EPSG:4326" style="height: 400px">
    <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

    <vl-layer-tile>
      <vl-source-osm></vl-source-osm>
    </vl-layer-tile>

    <vl-feature>
      <vl-geom-multi-point :coordinates="[[116.544921,40.451633],[116.545264,40.451649],[116.545865,40.451698],[116.546144,40.451551],[116.546337,40.451274],[116.546788,40.451143],[116.547324,40.451078],[116.547539,40.450996],[116.547839,40.450719],[116.548440,40.450506],[116.548933,40.450604],[116.549448,40.450604],[116.550242,40.450376],[116.550865,40.450163],[116.551702,40.449935],[116.552581,40.449576]]"></vl-geom-multi-point>
    </vl-feature>
  </vl-map>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data () {
      return {
        zoom: 17,
        center: [116.54875,40.45064],
        rotation: 0,
      }
    },
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
