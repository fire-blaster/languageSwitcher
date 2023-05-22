import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Button,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {useTranslation} from 'react-i18next';

const SwiperComponent = () => {
  const {t} = useTranslation();
  const {i18n} = useTranslation();

  const handleLanguageChange = language => {
    i18n.changeLanguage(language);
  };
  const swiperRef = useRef(null);
  const swipeAnimation = useRef(new Animated.Value(0)).current;
  const [swipeEnabled, setSwipeEnabled] = useState(true);

  const handleSwipeLeft = () => {
    if (swipeEnabled) {
      setSwipeEnabled(false);
      Animated.timing(swipeAnimation, {
        toValue: -500,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        swiperRef.current.swipeLeft();
        resetAnimation();
      });
    }
  };

  const handleSwipeRight = () => {
    if (swipeEnabled) {
      setSwipeEnabled(false);
      Animated.timing(swipeAnimation, {
        toValue: 500,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        swiperRef.current.swipeRight();
        resetAnimation();
      });
    }
  };

  const resetAnimation = () => {
    Animated.timing(swipeAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSwipeEnabled(true);
    });
  };

  const renderCard = (card, index) => {
    return (
      <Animated.View
        key={index}
        style={[
          styles.card,
          {
            transform: [
              {translateX: swipeAnimation},
              {
                rotate: swipeAnimation.interpolate({
                  inputRange: [-500, 0, 500],
                  outputRange: ['-10deg', '0deg', '10deg'],
                }),
              },
            ],
          },
        ]}>
        <Text style={styles.cardText}>Name: {t('hello') + card?.name}</Text>
        <Text style={styles.cardText}>Age: {card?.age}</Text>
        <Image
          source={{uri: card?.image}}
          style={{width: '80%', height: '50%', resizeMode: 'contain'}}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSwipeLeft}
            disabled={!swipeEnabled}>
            <Text style={styles.buttonText}>Dislike</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSwipeRight}
            disabled={!swipeEnabled}>
            <Text style={styles.buttonText}>Like</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button title="English" onPress={() => handleLanguageChange('en')} />
          <Button title="French" onPress={() => handleLanguageChange('fr')} />
        </View>
      </Animated.View>
    );
  };

  const cards = [
    {
      name: 'John Doe',
      image: 'https://via.placeholder.com/300',
      age: 28,
    },
    {
      name: 'Jane Smith',
      image: 'https://via.placeholder.com/300',
      age: 24,
    },
    {
      name: 'Michael Johnson',
      image: 'https://via.placeholder.com/300',
      age: 32,
    },
    // Add more cards as needed
  ];

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={cards}
        renderCard={renderCard}
        backgroundColor="transparent"
        stackSize={3}
        stackSeparation={15}
        useViewOverflow={Platform.OS === 'ios'}
        cardVerticalMargin={40}
        cardHorizontalMargin={20}
        disableTopSwipe
        disableBottomSwipe
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  card: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  cardText: {
    fontSize: 24,
    color: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 100,
  },
  button: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF4E4E',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SwiperComponent;
