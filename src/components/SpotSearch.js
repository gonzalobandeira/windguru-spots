import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '../constants/Styles';
import windguruSpots from '../data/windguru_spots.json';
import { Portal } from '@gorhom/portal';

const SpotSearch = ({ onSpotSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0, width: 0 });
  const searchInputRef = useRef(null);

  const searchSpots = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const results = [];
    const searchLower = query.toLowerCase();
    Object.entries(windguruSpots).forEach(([continent, countries]) => {
      Object.entries(countries).forEach(([country, spots]) => {
        Object.entries(spots).forEach(([spotName, spotId]) => {
          if (
            spotName.toLowerCase().includes(searchLower) ||
            country.toLowerCase().includes(searchLower)
          ) {
            results.push({
              name: spotName,
              country,
              continent,
              id: spotId,
            });
          }
        });
      });
    });
    results.sort((a, b) => {
      const aExactMatch = a.name.toLowerCase() === searchLower;
      const bExactMatch = b.name.toLowerCase() === searchLower;
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      return a.name.localeCompare(b.name);
    });
    setSearchResults(results.slice(0, 10));
  };

  const handleSpotSelect = (spot) => {
    onSpotSelect(spot);
    setSearchQuery(spot.name);
    setShowResults(false);
  };

  const renderSpotItem = ({ item }) => (
    <TouchableOpacity
      style={styles.spotItem}
      onPress={() => handleSpotSelect(item)}
    >
      <View style={styles.spotInfo}>
        <Text style={styles.spotName}>{item.name}</Text>
        <Text style={styles.spotLocation}>
          {item.country}, {item.continent}
        </Text>
      </View>
      <Text style={styles.spotId}>ID: {item.id}</Text>
    </TouchableOpacity>
  );

  // Measure the absolute position of the search input
  const handleFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.measureInWindow((x, y, width, height) => {
        setDropdownPos({ x, y: y + height, width });
      });
    }
    setShowResults(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={Colors.text.secondary} />
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            searchSpots(text);
            setShowResults(true);
          }}
          placeholder="Search for a spot..."
          placeholderTextColor={Colors.text.secondary}
          onFocus={handleFocus}
        />
        {searchQuery ? (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setSearchResults([]);
            }}
          >
            <MaterialIcons name="close" size={20} color={Colors.text.secondary} />
          </TouchableOpacity>
        ) : null}
      </View>

      {showResults && searchResults.length > 0 && (
        <Portal>
          <View
            style={[
              styles.resultsContainer,
              {
                position: 'absolute',
                top: dropdownPos.y,
                left: dropdownPos.x,
                width: dropdownPos.width,
                maxWidth: Dimensions.get('window').width - dropdownPos.x - 8,
              },
            ]}
          >
            <FlatList
              data={searchResults}
              renderItem={renderSpotItem}
              keyExtractor={(item) => item.id}
              style={styles.resultsList}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: FontSize.md,
    color: Colors.text.primary,
  },
  resultsContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    maxHeight: 300,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  resultsList: {
    maxHeight: 300,
  },
  spotItem: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  spotInfo: {
    marginBottom: Spacing.xs,
  },
  spotName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.text.primary,
  },
  spotLocation: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  spotId: {
    fontSize: FontSize.sm,
    color: Colors.primary,
  },
});

export default SpotSearch; 