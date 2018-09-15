import React, { PureComponent } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { StylesConst } from '../../../../utils/styles';
import CategoryListItem from './Item';

class HorizontalCategories extends PureComponent {
    _renderCategoryItem = (item, index) => {
        return (
            <CategoryListItem
                data={item}
                key={item.id}
                backgroundColor={
                    this.props.selectedCategory !== item.id ? '#fff' : StylesConst.accentColor
                }
                borderWidth={
                    this.props.selectedCategory !== item.id ? 1 : 0
                }
                onPress={this.props.updateCategoryHandler}
                listPosition={index + 1}
            />
        )
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.container}

                ListFooterComponent={() => <View style={{height: '100%', width: 16}}/>}
                data={this.props.categories}
                keyExtractor={this._keyExtractor}
                renderItem={({ item, index }) => this._renderCategoryItem(item, index)}
                initialNumToRender={6}
                getItemLayout={(data, index) => (
                    { length: 68, offset: 68 * index, index }
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 8,
        height: 146
    }
})

export default HorizontalCategories;