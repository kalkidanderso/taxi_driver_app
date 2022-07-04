import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
// impotr MapboxGL from "@react"
// import MapboxGL from "@react-native-mapbox-gl/maps";

// import MapboxGL from "@mapbox/react-native-mapbox-gl";


MapboxGL.setAccessToken('pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA');

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato'
  },
  map: {
    flex: 1
  }
});

export default function App() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} />
        </View>
      </View>
    );
  }





// import React from "react";
// import { View } from "react-native";
// import MapboxGL from "@react-native-mapbox-gl/maps";






// MapboxGL.setAccessToken("pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA");
// // mapboxgl.accessToken ="pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA";

// export default MapScreen = () => {
//   return (
//     <View style={{flex: 1, height: "100%", width: "100%" }}>
//       <MapboxGL.MapView
//         // styleURL={MapboxGL.StyleURL.Street}
//         zoomLevel={16}
//         centerCoordinate={[3.3362400, 6.5790100]}
//         style={{flex: 1}}>
//            <MapboxGL.Camera
//               zoomLevel={16}
//               centerCoordinate={[3.3362400, 6.5790100]}
//               animationMode={'flyTo'}
//               animationDuration={0}
//           	>
//           </MapboxGL.Camera>
//       </MapboxGL.MapView>
//     </View>
//   )
// }









// import React, { Component } from 'react';
// import { StyleSheet, View } from 'react-native';
// // import MapboxGL from '@rnmapbox/maps';
// // import MapboxGL from "@react-native-mapbox-gl/maps";


// MapboxGL.setAccessToken("pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA");

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   container: {
//     height: 300,
//     width: 300,
//     backgroundColor: 'tomato'
//   },
//   map: {

//     flex: 1
//   }
// });
// export default function Map() {
//     return (
//       <View style={styles.page}>
//         <View style={styles.container}>
//           <MapboxGL.MapView style={styles.map} />
//         </View>
//       </View>
//     );
//   }














