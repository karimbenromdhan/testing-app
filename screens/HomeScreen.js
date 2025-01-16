import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Linking, Animated } from 'react-native';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  
  // Animation values
  const [scaleAnim] = useState(new Animated.Value(1));

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Handle form submission here
      console.log({ name, email, message });
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Address Section */}
      <View style={styles.section}>
        <View style={styles.titleContainer}>
          <MaterialIcons name="location-city" size={28} color="#f4511e" />
          <Text style={styles.sectionTitle}>Our Location</Text>
        </View>
        <View style={[styles.addressContainer, styles.elevatedCard]}>
          <MaterialIcons name="location-on" size={28} color="#f4511e" />
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressLabel}>Visit Us At:</Text>
            <Text style={styles.addressText}>
              Route Teniour KM 1.5, Sfax-Tunis
            </Text>
          </View>
        </View>
      </View>

      {/* Need Help Section */}
      <View style={styles.section}>
        <View style={styles.titleContainer}>
          <MaterialIcons name="help-outline" size={28} color="#f4511e" />
          <Text style={styles.sectionTitle}>Need Help?</Text>
        </View>
        <View style={[styles.helpContainer, styles.elevatedCard]}>
          <TouchableOpacity 
            style={styles.helpItem}
            onPress={() => Linking.openURL('tel:+21625668963')}
          >
            <View style={[styles.iconContainer, styles.iconBackground]}>
              <MaterialIcons name="phone" size={24} color="#f4511e" />
            </View>
            <View style={styles.contactInfoContainer}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.helpText}>+216 2566 8963</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.helpItem}
            onPress={() => Linking.openURL('mailto:contact@company.com')}
          >
            <View style={[styles.iconContainer, styles.iconBackground]}>
              <MaterialIcons name="email" size={24} color="#f4511e" />
            </View>
            <View style={styles.contactInfoContainer}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.helpText}>contact@company.com</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.helpItem}
            onPress={() => Linking.openURL('https://m.me/yourpage')}
          >
            <View style={[styles.iconContainer, styles.iconBackground]}>
              <MaterialCommunityIcons name="facebook-messenger" size={24} color="#f4511e" />
            </View>
            <View style={styles.contactInfoContainer}>
              <Text style={styles.contactLabel}>Messenger</Text>
              <Text style={styles.helpText}>Message us on Facebook</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.helpItem}
            onPress={() => Linking.openURL('https://t.me/yourhandle')}
          >
            <View style={[styles.iconContainer, styles.iconBackground]}>
              <FontAwesome5 name="telegram-plane" size={24} color="#f4511e" />
            </View>
            <View style={styles.contactInfoContainer}>
              <Text style={styles.contactLabel}>Telegram</Text>
              <Text style={styles.helpText}>Chat with us on Telegram</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Keep in Touch Section */}
      <View style={styles.section}>
        <View style={styles.titleContainer}>
          <MaterialIcons name="connect-without-contact" size={28} color="#f4511e" />
          <Text style={styles.sectionTitle}>Keep in Touch</Text>
        </View>
        <View style={[styles.socialContainer, styles.elevatedCard]}>
          {[
            { 
              icon: 'facebook',
              iconFamily: FontAwesome5,
              url: 'https://facebook.com/yourpage',
              label: 'Facebook',
              color: '#1877f2'
            },
            { 
              icon: 'twitter',
              iconFamily: FontAwesome5,
              url: 'https://twitter.com/yourhandle',
              label: 'Twitter',
              color: '#1da1f2'
            },
            { 
              icon: 'linkedin',
              iconFamily: FontAwesome5,
              url: 'https://linkedin.com/company/yourcompany',
              label: 'LinkedIn',
              color: '#0a66c2'
            },
            { 
              icon: 'telegram-plane',
              iconFamily: FontAwesome5,
              url: 'https://t.me/yourhandle',
              label: 'Telegram',
              color: '#0088cc'
            }
          ].map((social, index) => (
            <Animated.View key={index} style={styles.socialButtonContainer}>
              <TouchableOpacity 
                style={[styles.socialButton, { backgroundColor: social.color }]}
                onPress={() => Linking.openURL(social.url)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                <social.iconFamily name={social.icon} size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.socialLabel}>{social.label}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Contact Form Section */}
      <View style={styles.section}>
        <View style={styles.titleContainer}>
          <MaterialIcons name="message" size={28} color="#f4511e" />
          <Text style={styles.sectionTitle}>Send Us a Message</Text>
        </View>
        <View style={[styles.form, styles.elevatedCard]}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Message</Text>
            <TextInput
              style={[styles.messageInput, errors.message && styles.inputError]}
              placeholder="Type your message here"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
            />
            {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
          </View>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  elevatedCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressTextContainer: {
    marginLeft: 15,
  },
  addressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  helpContainer: {
    backgroundColor: '#fff',
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  helpText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  socialButtonContainer: {
    alignItems: 'center',
  },
  socialButton: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 8,
  },
  socialLabel: {
    fontSize: 13,
    color: '#555',
    marginTop: 6,
    fontWeight: '500',
  },
  form: {
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 5,
  },
  messageInput: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#eee',
  },
  submitButton: {
    backgroundColor: '#f4511e',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconBackground: {
    backgroundColor: '#fff5f2',
    padding: 12,
    borderRadius: 14,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f4511e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
}); 