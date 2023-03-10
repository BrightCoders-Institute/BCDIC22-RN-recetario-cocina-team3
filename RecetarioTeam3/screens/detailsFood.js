import React, { useState, useEffect } from "react";
// import type { Node } from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import platillos  from "../platillos";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import PlatillosImages from '../platillosImages'
import EstilosDetalles from "./styleDetailsFood";
const styles = EstilosDetalles()

export default function App() {
  const route = useRoute();
  const { cardId } = route.params;
  const platilloEncontrado = platillos.find(
    (platillo) => platillo.id === cardId
  );
  const navigation = useNavigation();

  const [trending, setTrending] = useState(false);

  useEffect(() => {
    platilloEncontrado.trending === true ? setTrending(!trending) : null;
  }, []);
  return (
    <View style={styles.container}>
      {/* <ImageBackground style={styles.imageContainer} source={require('../assets/images/comida1.jpeg')}>
      </ImageBackground> */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageBackground}
          source={PlatillosImages[platilloEncontrado.imagePath]}
        />

        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("home")}>
            <Icon style={styles.iconClose} name="close" size={40} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon style={styles.iconShare} name="share-outline" size={35} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTrending(!trending)}>
            {trending ? (
              <Icon style={styles.iconHeart} name="heart" size={35} />
            ) : (
              <Icon style={styles.iconHeart} name="heart-outline" size={35} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.categoriaContainer}>
          <Text style={styles.textCategoria}>
            {trending ? "TRENDING" : "RECENT"}
          </Text>
          <Text style={styles.textCategoria}>{platilloEncontrado.nombre}</Text>
        </View>
      </View>
      <View style={{ marginBottom: 30, marginTop: 10 }}>
        <View>
          <Text style={styles.textDetalles}>Ingredients</Text>
        </View>
        <View style={styles.textIngredientes}>
          <Text style={styles.textServings}>for</Text>
          <Text style={styles.textServings}>
            {" "}
            {platilloEncontrado.servings}
          </Text>
          <Text style={styles.textServings}> servings</Text>
        </View>
      </View>

      <ScrollView style={{ marginBottom: 30 }} vertical={true}>
        {platilloEncontrado.ingredients.map((element) => {
          return (
            <View key={element.name}>
              <View style={styles.ingredientesContainer}>
                <Text style={styles.textDetalles}>{element.name}</Text>
                <Text style={styles.textDetalles}>{element.qty}</Text>
              </View>
              <View style={styles.Divider} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
