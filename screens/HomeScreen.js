import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: "https://i.ibb.co/rwQ53Kj/Bathub.png",
      name: "Bathub",
    },
    {
      id: "1",
      image:
        "https://i.ibb.co/vX3xwVk/Cabinet.png",
      name: "Cabinet",
    },
    {
      id: "2",
      image:
        "https://i.ibb.co/kQ29vDF/Chair.png",
      name: "Chair",
    },
    {
      id: "3",
      image:
        "https://i.ibb.co/6BVFrZn/Sink.png",
      name: "Sink",
    },
    {
      id: "4",
      image:
        "https://i.ibb.co/gP4hgZ9/Sofa.png",
      name: "Sofa",
    },
    {
      id: "5",
      image: "https://i.ibb.co/hRnVdLr/Table.png",
      name: "Table",
    },
  ];
  const images = [
    "https://i.ibb.co/SXZyH4d/Frame-33.png",
    "https://i.ibb.co/dcwLMMk/Frame-34.png",
    "https://i.ibb.co/bJpdJG2/Frame-35.png",
  ];
  const deals = [
    {
      id: "20",
      title: "Sofa Matcha Depan",
      oldPrice: 999999999999,
      price: 999999999,
      image:
        "https://i.ibb.co/bJWYyvC/Frame-13.png",
      carouselImages: [
        "https://i.ibb.co/2Kk40c7/Frame-1.png",
        "https://i.ibb.co/3rW9Tky/Frame-2.png",
        "https://i.ibb.co/jkG9pnQ/Frame-3.png",
      ],
      color: "Matcha",
      size: "Large",
    },
    {
      id: "30",
      title:
        "Table Matcha Indah",
      oldPrice: 888999999888,
      price: 888999999,
      image:
        "https://i.ibb.co/3df93x2/Frame-14.png",
      carouselImages: [
        "https://i.ibb.co/Y79gf9r/Frame-4.png",
        "https://i.ibb.co/ZdtQs1V/Frame-5.png",
        "https://i.ibb.co/tP4VcPm/Frame-6.png",
      ],
      color: "Brown",
      size: "Large",
    },
    {
      id: "40",
      title:
        "Sink Matcha Lalu",
      oldPrice: 777999999777,
      price: 777999999,
      image:
        "https://i.ibb.co/9wzNmnQ/Frame-15.png",
      carouselImages: [
        "https://i.ibb.co/hV11Qfh/Frame-7.png",
        "https://i.ibb.co/RcB6Fm0/Frame-8.png",
        "https://i.ibb.co/FBx88Cq/Frame-9.png",
      ],
      color: "White",
      size: "Large",
    },
    {
      id: "40",
      title:
        "Chair Matcha Kini",
      oldPrice: 666999999666,
      price: 666999999,
      image:
        "https://i.ibb.co/X5sRprk/Frame-16.png",
      carouselImages: [
        "https://i.ibb.co/zhnbQyS/Frame-10.png",
        "https://i.ibb.co/GsBWP6q/Frame-11.png",
        "https://i.ibb.co/KxFG0RT/Frame-12.png",
      ],
      color: "Brown",
      size: "Large",
    },
  ];
  const offers = [
    {
      id: "0",
      title: "Sofa Matcha Depan",
      offer: "72% off",
      oldPrice: 999999999999,
      price: 999999999,
      image:
        "https://i.ibb.co/ngghR3Z/Frame-17.png",
      carouselImages: [
        "https://i.ibb.co/2Kk40c7/Frame-1.png",
        "https://i.ibb.co/3rW9Tky/Frame-2.png",
        "https://i.ibb.co/jkG9pnQ/Frame-3.png",
      ],
      color: "Matcha",
      size: "Large",
    },
    {
      id: "1",
      title:
        "Table Matcha Indah",
      offer: "72% off",
      oldPrice: 888999999888,
      price: 888999999,
      image:
        "https://i.ibb.co/M6zZSgF/Frame-18.png",
      carouselImages: [
        "https://i.ibb.co/Y79gf9r/Frame-4.png",
        "https://i.ibb.co/ZdtQs1V/Frame-5.png",
        "https://i.ibb.co/tP4VcPm/Frame-6.png",
      ],
      color: "Brown",
      size: "Large",
    },
    {
      id: "2",
      title:
        "Table Matcha Indah",
      offer: "72% off",
      oldPrice: 888999999888,
      price: 888999999,
      image:
        "https://i.ibb.co/fY5BZYR/Frame-19.png",
      carouselImages: [
        "https://i.ibb.co/Y79gf9r/Frame-4.png",
        "https://i.ibb.co/ZdtQs1V/Frame-5.png",
        "https://i.ibb.co/tP4VcPm/Frame-6.png",
      ],
      color: "Brown",
      size: "Large",
    },
    {
      id: "3",
      title:
        "Sink Matcha Lalu",
      offer: "72% off",
      oldPrice: 777999999777,
      price: 777999999,
      image:
        "https://i.ibb.co/G902jWH/Frame-20.png",
      carouselImages: [
        "https://i.ibb.co/hV11Qfh/Frame-7.png",
        "https://i.ibb.co/RcB6Fm0/Frame-8.png",
        "https://i.ibb.co/FBx88Cq/Frame-9.png",
      ],
      color: "White",
      size: "Large",
    },
  ];
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("jewelery");
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress,setSelectedAdress] = useState("");
  console.log(selectedAddress)
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchData();
  }, []);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.18.43:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  console.log("address", addresses);
  return (
    <>
      <SafeAreaView
        style={{
          paddinTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView style={{ marginTop: 30 }} >
          <View
            style={{
              backgroundColor: "#025CB2",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Search Ruang Kreasi" />
            </Pressable>

            <Feather name="mic" size={24} color="white" />
          </View>

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#148CFF",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />

            <Pressable>
            {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    Add a Address
                </Text>
              )}
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <SliderBox
            images={images}
            autoPlay
            circleLoop
            dotColor={"#13274F"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Trending Deals of the week
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </Pressable>
            ))}
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Today's Deals
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />

                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Upto {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added addresses */}
            {addresses?.map((item, index) => (
              <Pressable
              onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:selectedAddress === item ? "#FBCEB1" : "white"
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  Indonesia, Bandung
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter an Indian pincode
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Currect location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#0066b2" />

              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
