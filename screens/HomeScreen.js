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
    backgroundColor: '#f8f9fa',
    paddingTop: 15,
  },
  section: {
    padding: 20,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(244, 81, 30, 0.1)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3436',
    marginLeft: 12,
    letterSpacing: 0.5,
  },
  elevatedCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  addressTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  addressLabel: {
    fontSize: 13,
    color: '#636e72',
    marginBottom: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  addressText: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '600',
    lineHeight: 24,
  },
  helpContainer: {
    backgroundColor: '#fff',
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconContainer: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    backgroundColor: 'rgba(244, 81, 30, 0.08)',
    padding: 14,
    borderRadius: 16,
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfoContainer: {
    marginLeft: 16,
    flex: 1,
  },
  contactLabel: {
    fontSize: 13,
    color: '#636e72',
    marginBottom: 4,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  helpText: {
    fontSize: 15,
    color: '#2d3436',
    fontWeight: '500',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    marginVertical: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
  socialButtonContainer: {
    alignItems: 'center',
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 10,
  },
  socialLabel: {
    fontSize: 12,
    color: '#636e72',
    marginTop: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  form: {
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 13,
    color: '#636e72',
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    color: '#2d3436',
  },
  inputError: {
    borderColor: '#ff6b6b',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
  messageInput: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    fontSize: 15,
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    color: '#2d3436',
  },
  submitButton: {
    backgroundColor: '#f4511e',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#f4511e',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
}); 