import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { sharedStyles } from '../styles/sharedStyles';

const DetailsModal = ({ visible, item, onClose, onEdit }) => {
  if (!item) return null;

  const jsonString = JSON.stringify(item, null, 2);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={sharedStyles.modalOverlay}>
        <View style={styles.jsonModalContent}>
          <Text style={styles.jsonTitle}>
            {item.symbol || item.name || 'Item Details'}
          </Text>
          
          <ScrollView 
            style={styles.jsonContainer}
            contentContainerStyle={styles.jsonScrollContent}
          >
            <Text style={styles.jsonText}>{jsonString}</Text>
          </ScrollView>

          <View style={styles.jsonModalButtons}>
            {onEdit && (
              <TouchableOpacity
                style={[styles.jsonModalButton, styles.editButton]}
                onPress={onEdit}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.jsonModalButton, styles.closeButton]}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  jsonModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  jsonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  jsonContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    maxHeight: 400,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  jsonScrollContent: {
    padding: 5,
  },
  jsonText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  jsonModalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  jsonModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#e0e0e0',
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailsModal;

