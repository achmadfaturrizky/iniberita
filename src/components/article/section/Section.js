import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native';
import { Images, Fonts, Colors } from '../../../themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc, removeOrientationListener as rol } from 'react-native-responsive-screen';
import Moment from 'moment';

const Section = props => {
  const { searchResult } = props;
  const {
    multimedia = [],
    title,
    byline = {},
    published_date,
    headline,
    pub_date
  } = props.article;

  if (searchResult) {
    return (
      <View style={styles.rootView}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{headline.main}</Text>
          <Text style={styles.author}>{byline.original}</Text>
          <Text style={styles.date}>{Moment(pub_date).startOf('day').fromNow()}</Text>
        </View>
        <View style={styles.cover}>
          {multimedia.length > 1 ? (
            <Image
              style={styles.image}
              source={{ uri: `https://static01.nyt.com/${multimedia[4].url}` }}
            />
          ) : (
            <Image style={styles.image} source={{ uri: Images.noImage }} />
          )}
        </View>
      </View>
      </View>
    );
  }

  return (
    <View style={styles.rootView}>
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.author}>{byline}</Text>
        <Text style={styles.date}>{Moment(published_date).startOf('day').fromNow()}</Text>
      </View>
      <View style={styles.cover}>
        {multimedia.length ? (
          <Image style={styles.image} source={{ uri: multimedia[4].url }} />
        ) : (
          <Image style={styles.image} source={{ uri: Images.noImage }} />
        )}
      </View>
    </View>
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  rootView:{
    justifyContent: 'center',
    alignItems: 'center',
    bottom: hp('2.5%')
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    height: hp('20%'),
    width: wp('90%'),
    borderRadius: 10,
    elevation: 10,
    margin: 10
  },
  content: {
    flex: 0.7,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'flex-start',
    bottom: hp('1%')

  },
  cover: {
    flex: 0.3,
    alignItems: 'center'
  },
  image: {
    width: hp('15%'),
    height: wp('20%'),
    right: wp('3%')
  },
  title: {
    fontFamily: Fonts.type.bold,
    color: Colors.darkGray,
    fontSize: hp('2%'),
    padding: 10,
  },
  author: {
    fontFamily: Fonts.type.bold,
    color: Colors.darkGray,
    fontSize: wp('2.5%'),
    left: wp('3%'),
    bottom: hp('1%')
  },
  date: {
    color: Colors.darkGray,
    fontSize: wp('2%'),
    left: wp('3%'),
    bottom: hp('1%')

  }
})