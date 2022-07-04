
// import React from 'react';
// import t from "tcomb-form-native";
// import { StyleSheet, Text, View, TouchableHighlight } from 'react-native-web';


// export default function Login(){
// var Form = t.form.Form;
 
// // here we are: define your domain model
// var Person = t.struct({
//   name: t.String,              // a required string
//   surname: t.maybe(t.String),  // an optional string
//   age: t.Number,               // a required number
//   rememberMe: t.Boolean        // a boolean
// });
 
// var options = {}; // optional rendering options (see documentation)
 
 
//   function onPress () {
//     var value = this.refs.form.getValue();
//     if (value) { 
//       console.log(value); // value here is an instance of Person
//     }
//   }
 
//     return (
//       <View style={styles.container}>
//         {/* display */}
//         <Form
//           ref="form"
//           type={Person}
//           options={options}
//         />
//         <TouchableHighlight style={styles.button} onPress={onPress} underlayColor='#99d9f4'>
//           <Text style={styles.buttonText}>Save</Text>
//         </TouchableHighlight>
//       </View>
//     );
  
// }
 
// var styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     marginTop: 50,
//     padding: 20,
//     backgroundColor: '#ffffff',
//   },
//   buttonText: {
//     fontSize: 18,
//     color: 'white',
//     alignSelf: 'center'
//   },
//   button: {
//     height: 36,
//     backgroundColor: '#48BBEC',
//     borderColor: '#48BBEC',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 10,
//     alignSelf: 'stretch',
//     justifyContent: 'center'
//   }
// });



// import React from 'react';
// import { View, StyleSheet } from 'react-native';


// import {t} from 'tcomb-form-native'; // 0.6.9

// const Form = t.form.Form;

// const User = t.struct({
//   email: t.String,
//   username: t.String,
//   password: t.String,
//   terms: t.Boolean
// });

// export default function Login() {
//     return (
//       <View style={styles.container}>
//         <Form type={User} /> {/* Notice the addition of the Form component */}
//       </View>
//     );
//   }


// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     marginTop: 50,
//     padding: 20,
//     backgroundColor: '#ffffff',
//   },
// });

// import { View, Text } from 'react-native'
// import React from 'react'
//  import t from 'tcomb-form-native'; // 0.6.9

// export default function Login() {
//   return (
//     <View>
//       <Text>Login</Text>
//     </View>
//   )
// }


var React = require('react-native');
var t = require('tcomb-form-native');
var { AppRegistry, StyleSheet, Text, View, TouchableHighlight } = React;

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  rememberMe: t.Boolean        // a boolean
});

var options = {}; // optional rendering options (see documentation)

var AwesomeProject = React.createClass({

  onPress: function () {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={Person}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);