import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc, removeOrientationListener as rol } from 'react-native-responsive-screen';

// Actions
import { searchArticles } from '../publics/actions';

// Components
import { NewsLoader } from '../components/loader/Loader';
import FlatList from '../components/flatlist/FlatList';
import SearchBox from '../components/common/searchbox/SearchBox';
import Article from '../components/article/section/Section';
import { Colors, Fonts } from '../themes';

class SearchArticleScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });

  state = {
    query: '',
    sort: '',
    sortOptions: ['Newest', 'Oldest']
  };

  handlePressSearch = () => {
    const { query } = this.state;
    if (query) this.props.searchArticles(query);
  };

  handleTextChange = query => {
    this.setState({ query });
  };

  handlePressSort = sort => {
    const { query } = this.state;

    if (this.state.sort === sort) {
      this.setState({ sort: '' });
      this.props.searchArticles(query);
    } else {
      this.setState({ sort });
      this.props.searchArticles(query, sort);
    }
  };

  renderItemArticle = ({ item }) => (
    <TouchableOpacity onPress={() => this.handlePressArticle(item)}>
      <Article searchResult article={item} />
    </TouchableOpacity>
  );

  renderArticle = data => (
    <FlatList
      data={data}
      renderItem={this.renderItemArticle}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );

  renderSortable = data => (
    <View style={styles.wrapper}>
      {data.map((sort, index) => (
        <Text
          key={index}
          onPress={() => this.handlePressSort(sort)}
          style={[styles.sortOptions, {color: this.state.sort === sort ? Colors.primary : Colors.black}]}
        >
          {sort}
        </Text>
      ))}
    </View>
  );

  handlePressArticle = item => {
    this.props.navigation.navigate('Article', { url: item.web_url });
  };

  render() {
    const { query, sortOptions } = this.state;
    const { searchLoading, searchResults } = this.props;
    let content;
    let sorter;

    if (searchLoading) content = <View style={styles.loader}><NewsLoader /></View>;

    if (!searchLoading && searchResults.length > 0) {
      content = this.renderArticle(searchResults);
      sorter = this.renderSortable(sortOptions);
    }

    if (!searchLoading && !searchResults.length > 0) {
      content = null;
      sorter = null;
    }

    return (
      <View style={styles.container}>
        <SearchBox
          placeholder="Cari artikel..."
          value={query}
          onChangeText={this.handleTextChange}
          onPress={this.handlePressSearch}
        />
        {sorter}
        {content}
      </View>
    );
  }
}

const mapStateToProps = ({ articleSearch }) => ({
  searchResults: articleSearch.searchResults,
  searchLoading: articleSearch.isLoading
});

const mapDispatchToProps = {
  searchArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchArticleScreen);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  wrapper: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    margin: 25,
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    borderRadius: 10
  },
  sortOptions: {
    fontSize: hp('3%'),
    fontFamily: Fonts.type.bold,
    color: Colors.black
  },
  text: {
    alignSelf: 'center'
  },
  loader: {
    top: hp('5%'),
    left: wp('25%'),
    justifyContent: 'center',
    alignItems: 'center'
  }

})