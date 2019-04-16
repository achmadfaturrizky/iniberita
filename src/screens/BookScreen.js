import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

// Actions
import { getBooks, searchArticles } from '../publics/actions';

// Helpers
import { containBooks } from '../helpers';

// Components
import { NewsLoader } from '../components/loader/Loader';
import FlatList from '../components/flatlist/FlatList';
import SearchBox from '../components/common/searchbox/SearchBox';
import Book from '../components/book';
import { Colors } from '../themes';

class BookScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });

  state = {
    query: '',
    data: [],
    fullData: []
  };

  componentDidMount() {
    this.props.getBooks();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.books) {
      this.setState({
        data: nextProps.books,
        fullData: nextProps.books
      });
    }
  }

  handleSearch = query => {
    const { fullData } = this.state;
    const formatQuery = query.toLowerCase();

    const data = _.filter(fullData, book => containBooks(book, query));

    this.setState({ query: formatQuery, data });
  };

  renderItemBook = ({ item }) => (
    <TouchableOpacity onPress={() => this.handlePressBook(item)}>
      <Book book={item} />
    </TouchableOpacity>
  );

  renderBook = data => (
    <FlatList
      data={data}
      renderItem={this.renderItemBook}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );

  handlePressBook = item => {
    this.props.navigation.navigate('Article', { url: item.amazon_product_url });
  };

  render() {
    const { query } = this.state;
    const { bookLoading } = this.props;

    return (
      <View style={styles.container}>
        <SearchBox
          placeholder="Cari Buku..."
          value={query}
          disabled
          onChangeText={this.handleSearch}
          onPress={this.handlePressSearch}
        />
        {bookLoading ? (
          <View style={styles.bookLoaderWrapper}>
            <NewsLoader />
            <NewsLoader />
          </View>
        ) : (
            this.renderBook(this.state.data)
          )}
      </View>
    );
  }
}

const mapStateToProps = ({ book }) => ({
  books: book.books,
  bookLoading: book.isLoading
});

const mapDispatchToProps = {
  searchArticles,
  getBooks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookScreen);

const styles = StyleSheet.create({
  container: {
   
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  bookLoaderWrapper: {
    marginTop: 20,
    marginLeft: 20,
    height: 10.5
  },

})

