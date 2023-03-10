import { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,

} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Trending from "../components/Trending";
import { useNavigation } from "@react-navigation/native";
import EstilosHome from "./styleHome";
import data from '../platillos'
import PlatillosImages from '../platillosImages'

const styles = EstilosHome()

export default function Home() {

  const navigation = useNavigation();
  console.log(data,'dataa')
  return (
    <View style={styles.container}>
      {/* Componente SearchBar */}
      <View style={styles.inputContainer}>
        <Icon style={styles.iconSearch} name="search" size={17} />
        <TextInput
          style={styles.textStyleInput}
          placeholder="What do you want to eat?"
          placeholderTextColor={"#ffffff"}
        />
        <Icon style={styles.iconMicrophone} name="microphone" size={17} />
      </View>
      {/* Componente HorizontalList */}
      <Trending/>
      <View>
        <Text style={styles.textTittle}>RECENT</Text>
        {/* Recent */}
        <ScrollView horizontal={true}>
          { data.map((platillo) => {
            // console.log(platillo.imagePath,'platillllll')
            if (platillo.trending === false) {
              return (
                <View style={styles.listItemRecent} key={platillo.id}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("detailsFood", {
                        cardId: platillo.id,
                      })
                    }
                  >
                    <Image
                      style={styles.imgStyleRecent}
                      source={PlatillosImages[platillo.imagePath]}
                    />
                  </TouchableOpacity>
                  <Text style={styles.textListItem2}>{platillo.nombre}</Text>
                </View>
              );
            }
            return null;
          })}
        </ScrollView>
      </View>
    </View>
  );
}
