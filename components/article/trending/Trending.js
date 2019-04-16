import React, { Component } from 'react';
import { Platform, ScrollView, StyleSheet, StatusBar, Text, View, Image, ImageBackground, TouchableHighlight, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc, removeOrientationListener as rol } from 'react-native-responsive-screen';
import { Images, Fonts } from '../../../themes';
import Moment from 'moment';

const Trending = props => {
  const {
    multimedia = [],
    title,
    byline = {},
    published_date,
  } = props.article;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.author}>{byline}</Text>
        <Text style={styles.date}>{Moment(published_date).startOf('day').fromNow()}</Text>
      </View>
      <View>
        {multimedia.length ? (
          <Image style={styles.image} source={{ uri: multimedia[4].url }} />
        ) : (
          <Image style={styles.image} source={{ uri: Images.noImage }} />
        )}
      </View>
    </View>
  );
};

export default Trending;
const styles = StyleSheet.create({

    container: {
      
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: hp('20%'),
        top: hp('1%')
    },
    content: {
        flex: 0.7,
        paddingLeft: 20,
        bottom: hp('1%')
    },
    cover: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 100,
        right: wp('3%'),
        top: hp('1%')
    },
    title: {
        fontFamily: Fonts.type.bold,
        fontSize: wp('4%'),
        color: '#000'
    },
    author: {
        fontFamily: Fonts.type.regular,
        color: '#000',
        fontSize: wp('2.5%')
    },
    date: {
        fontFamily: Fonts.type.regular,
        color: '#000',
        fontSize: wp('3%')
    },
})
