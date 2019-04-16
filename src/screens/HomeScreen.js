import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc, removeOrientationListener as rol } from 'react-native-responsive-screen';

// Actions
import { getArticles } from '../publics/actions';

// Components
import { NewsLoader } from '../components/loader';
import FlatList from '../components/flatlist';
import Populer from '../components/article/populer';
import ArticleSection from '../components/article/section';
import Trending from '../components/article/trending';

import { Colors, Fonts } from '../themes';

class HomeScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    radius: new Animated.Value(0)
  };

  componentDidMount() {
    StatusBar.setBackgroundColor(Colors.white, true);
    StatusBar.setBarStyle('dark-content');

    this.props.getArticles();
    
  }

  renderItemTrendingArticle = ({ item }) => (
    <TouchableOpacity onPress={() => this.handlePressArticle(item)}>
      <Trending article={item} />
    </TouchableOpacity>
  );

  renderItemNewArticle = ({ item }) => (
    <TouchableOpacity onPress={() => this.handlePressArticle(item)}>
      <Populer article={item} />
    </TouchableOpacity>
  );

  renderItemSectionArticle = ({ item }) => (
    <TouchableOpacity onPress={() => this.handlePressArticle(item)}>
      <ArticleSection article={item} />
    </TouchableOpacity>
  );

  renderNewArticle = data => (
    <FlatList
      data={data.slice(0, 1)}
      maxToRenderPerBatch={1}
      renderItem={this.renderItemNewArticle}
      showsVerticalScrollIndicator={false}

    />
  );

  renderTrendingArticle = data => (
    <FlatList
      data={data.slice(0, 5)}
      maxToRenderPerBatch={5}
      renderItem={this.renderItemTrendingArticle}
      showsVerticalScrollIndicator={false}
      

    />
  );

  renderSectionArticle = data => (
    <FlatList
      data={data}
      renderItem={this.renderItemSectionArticle}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );

  handlePressArticle = item => {
    this.props.navigation.navigate('Article', { url: item.url });
  };

  render() {
    const { user, userLoading, articles, articleLoading } = this.props;

    const NewsSection = articles.filter(item => item.section === 'World');
    const OpinionSection = articles.filter(item => item.section === 'Opinion');
    const ArtsSection = articles.filter(item => item.section === 'Arts');
    const LivingSection = articles.filter(item => item.section === 'Health');

    return (
      
      <View style={styles.rootView}>
        
        <Animated.View
          style={[
            styles.container,
            {transform: [{ scale: this.state.scale }]},
            {opacity: this.state.opacity},
            {borderRadius: this.state.radius}
          ]}
        >
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {articleLoading ? (
                <View style={styles.articleLoaderWrapper}>
                  <NewsLoader />
                  <NewsLoader />
                </View>
              ) : (
                  <>
                  <View>
                    {this.renderNewArticle(articles)}
                    </View>
                    <View style={{bottom: hp('21%')}}>
                    <Text style={styles.subTitle}>Trending</Text>
                    {this.renderTrendingArticle(articles)}

                    <Text style={styles.subTitle}>News</Text>
                    <View style={styles.line} />
                    {this.renderTrendingArticle(NewsSection)}

                    </View>
                  </>
                )}
            </ScrollView>
          </View>
        </Animated.View>
      </View>
     
    );
  }
}

const mapStateToProps = ({ article }) => ({
  articles: article.articles,
  articleLoading: article.isLoading
});

const mapDispatchToProps = {
  getArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: 'black',
    
  },
  line: {
    borderWidth: 1,
    width: wp('100%'),
    borderColor: Colors.silver,
    top: hp('1%')
  },
  container: {
   
  backgroundColor: Colors.white,
  overflow: 'hidden',
  },
  articleLoaderWrapper: {
    left: wp('5%'),
    top: hp('5%'),
    height: hp('100%')
  },
  subTitle: {
    fontFamily: Fonts.type.bold,
    color: Colors.black,
    fontSize: 20,
    marginLeft: 20,
    
  },

})