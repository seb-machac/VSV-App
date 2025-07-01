import { StyleSheet, Text, View} from "react-native";

export default function Index() {
  return (
    <html>
      <body>
        <gmp-map center="-33.9,151.2" zoom="10" map-id="DEMO_MAP_ID">
          
        </gmp-map>
      </body>
    <Text style={style.text}>hello</Text>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAykSwMb92Ro1FKcBHZroNNETAOx7ZwYuQ&callback=console.debug&libraries=maps,marker&v=beta"
      defer
      ></script>
    </html>
  );
}


const style = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "#3333",
  },
});