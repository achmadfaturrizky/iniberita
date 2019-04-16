import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc, removeOrientationListener as rol } from 'react-native-responsive-screen';
import LinearGradient from "react-native-linear-gradient";

import { Fonts, Images } from '../../../themes';
import Moment from 'moment';

const Populer = props => {
  const { multimedia, title, byline, published_date, abstract } = props.article;

  return (
    <View style={styles.container}>
    
      <View style={styles.cover}>
        {multimedia.length ? (
          
          <Image style={styles.image} source={{ uri: multimedia[4].url }} />
        ) : (
            <Image style={styles.image} source={{ uri: Images.noImage }} />
          )}
          <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            width: wp('100%'),
            height: hp('80%')
          }}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.abstract}>{abstract}</Text>
        <Text style={styles.author}>{byline}</Text>
        <Text style={styles.date}>{Moment(published_date).startOf('day').fromNow()}</Text>
      </View>
    </View>
  );
};

export default Populer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    bottom: hp('30%'),
    padding: wp('5%')
  },
  image: {
    width: wp('100%'),
    height: hp('80%')
  },
  cover: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: wp('4.5%'),
    color: '#fff'
  },
  abstract: {
    fontFamily: Fonts.type.regular,
    fontSize: wp('3.5%'),
    top: hp('1%'),
    color: '#fff'
  },
  author: {
    fontFamily: Fonts.type.regular,
    color: '#fff',
    top: hp('1%'),
    fontSize: wp('4%')
  },
  date: {
    fontFamily: Fonts.type.regular,
    color: '#fff',
    fontSize: wp('3.5%'),
    top: 5

  }
})

