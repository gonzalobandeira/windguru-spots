import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions,
  Keyboard,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import windguruSpots from '../data/windguru_spots.json';
import { Portal } from '@gorhom/portal';
import styles from '../styles/SpotSearch.styles';

const SpotSearch = ({ onSpotSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0, width: 0 });
  const [keyboardHeight, setKeyboardHeight] = useState(0);
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
        Object.entries(spots).forEach(([spotName, spotData]) => {
          if (
            spotName.toLowerCase().includes(searchLower) ||
            country.toLowerCase().includes(searchLower)
          ) {
            results.push({
              name: spotName,
              country,
              continent,
              id: spotData.id
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

  // Add keyboard listeners
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
        <MaterialIcons name="search" size={20} color={styles.searchInput?.color || '#888'} />
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
          placeholderTextColor={styles.searchInput?.color || '#888'}
          onFocus={handleFocus}
        />
        {searchQuery ? (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setSearchResults([]);
            }}
          >
            <MaterialIcons name="close" size={20} color={styles.searchInput?.color || '#888'} />
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
                maxHeight: keyboardHeight > 0 
                  ? Dimensions.get('window').height - dropdownPos.y - keyboardHeight - 10 
                  : 300,
              },
            ]}
          >
            <FlatList
              data={searchResults}
              renderItem={renderSpotItem}
              keyExtractor={(item) => `${item.id}-${Math.random().toString(36).substr(2, 9)}`}
              style={styles.resultsList}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </Portal>
      )}
    </View>
  );
};

export default SpotSearch;
