import React from "react";
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { MenuList } from './menuList';
import { StatusBar } from "react-native";

function Appetizers() {
  const starters = MenuList.filter((item) => item.category === "Appetizer");
  
  const renderMenuItems = () => {
    const gridItems = [];
    for (let i = 0; i < starters.length; i += 3) {
      const rowItems = [];
      for (let j = i; j < i + 3; j++) {
        if (j < starters.length) {
          rowItems.push(
            <View style={styles.gridItem} key={j}>
              <MenuItem
                image={starters[j].image}
                name={starters[j].name}
                price={starters[j].price}
              />
            </View>
          );
        }
      }
      gridItems.push(
        <View style={styles.gridRow} key={i}>
          {rowItems}
        </View>
      );
    }
    return gridItems;
  };
  return (
    <View>
      <Text style={styles.bigTitle}>Our Starters</Text>
      <View style={styles.gridContainer}>{renderMenuItems()}</View>
    </View>
  );
}

function MainCourseMenu() {
  const mainCourseItems = MenuList.filter((item) => item.category === "Main Course");
  const renderMenuItems = () => {
    const gridItems = [];
    for (let i = 0; i < mainCourseItems.length; i += 3) {
      const rowItems = [];
      for (let j = i; j < i + 3; j++) {
        if (j < mainCourseItems.length) {
          rowItems.push(
            <View style={styles.gridItem} key={j}>
              <MenuItem
                image={mainCourseItems[j].image}
                name={mainCourseItems[j].name}
                price={mainCourseItems[j].price}
              />
            </View>
          );
        }
      }
      gridItems.push(
        <View style={styles.gridRow} key={i}>
          {rowItems}
        </View>
      );
    }
    return gridItems;
  }
  return (
    <View>
      <Text style={styles.bigTitle}>Our Main Courses</Text>
      <View style={styles.gridContainer}>{renderMenuItems()}</View>
    </View>
  );
}

function DrinksMenu() {
    const drinksItems = MenuList.filter((item) => item.category === "Drinks");
  
    const renderMenuItems = () => {
      const gridItems = [];
      for (let i = 0; i < drinksItems.length; i += 3) {
        const rowItems = [];
        for (let j = i; j < i + 3; j++) {
          if (j < drinksItems.length) {
            rowItems.push(
              <View style={styles.gridItem} key={j}>
                <MenuItem
                  image={drinksItems[j].image}
                  name={drinksItems[j].name}
                  price={drinksItems[j].price}
                />
              </View>
            );
          }
        }
        gridItems.push(
          <View style={styles.gridRow} key={i}>
            {rowItems}
          </View>
        );
      }
      return gridItems;
    };
  
    return (
      <View>
        <Text style={styles.bigTitle}>Our Drinks</Text>
        <View style={styles.gridContainer}>{renderMenuItems()}</View>
      </View>
    );
}

function DessertMenu() {
  const dessertItems = MenuList.filter((item) => item.category === "Dessert");
  const renderMenuItems = () => {
    const gridItems = [];
    for (let i = 0; i < dessertItems.length; i += 3) {
      const rowItems = [];
      for (let j = i; j < i + 3; j++) {
        if (j < dessertItems.length) {
          rowItems.push(
            <View style={styles.gridItem} key={j}>
              <MenuItem
                image={dessertItems[j].image}
                name={dessertItems[j].name}
                price={dessertItems[j].price}
              />
            </View>
          );
        }
      }
      gridItems.push(
        <View style={styles.gridRow} key={i}>
          {rowItems}
        </View>
      );
    }
    return gridItems;
  };

  return (
    <View>
      <Text style={styles.bigTitle}>Our Desserts</Text>
      <View style={styles.gridContainer}>{renderMenuItems()}</View>
    </View>
  );
}

const MenuItem = ({ name, image, price }) => {
    return (
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.smallTitle}>{price}</Text>
      </View>
    );
};

export default function Menu() {
    return (
        <View style={styles.menu}>
          <Text style={styles.title}>Our Menu</Text>
          <StatusBar barStyle='dark-content' backgroundColor='#d59f21'/>          
          <ScrollView>
            <View style={styles.container}>
              <Appetizers />
              <MainCourseMenu />
              <DessertMenu />
              <DrinksMenu />
            </View>
          </ScrollView>
        </View>
    );
};
 
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d59f21',
  },
  container: {
    flex: 1,
    backgroundColor: '#fffcf2',
    width: '100%',
    height: '100%',
    marginTop: 50,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingLeft: 20,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#c69214',
    borderWidth: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 10,
  },
  cardTitle: {
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 5
  },
  text: {
    fontFamily: 'Regular'
  },
  bigTitle: {
    fontFamily: 'Bold',
    textAlign: 'center',
    margin: 25,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#c69214',
    borderRadius: 10,
    padding: 10,
  },
  smallTitle: {
    fontFamily: 'Regular'
  },
  gridContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gridItem: {
    flexBasis: '28%',
    margin: 10,
  },
  title: {
    fontFamily: 'Bold',
    fontSize: 26,
    marginTop: 30,
    color: '#fffcf2'
  },
});
