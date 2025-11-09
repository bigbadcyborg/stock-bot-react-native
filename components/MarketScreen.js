import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert, Pressable, ActionSheetIOS, Platform } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import DeleteConfirmModal from './DeleteConfirmModal';
import DetailsModal from './DetailsModal';
import { sharedStyles } from '../styles/sharedStyles';

const MarketScreen = () => {
  const [marketData, setMarketData] = useState([
    { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, change: 2.34, changePercent: 1.35 },
    { id: '2', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.00, change: -15.20, changePercent: -0.55 },
    { id: '3', symbol: 'TSLA', name: 'Tesla Inc.', price: 850.00, change: 45.00, changePercent: 5.63 },
    { id: '4', symbol: 'MSFT', name: 'Microsoft Corp.', price: 330.00, change: 1.25, changePercent: 0.38 },
    { id: '5', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.00, change: -2.75, changePercent: -1.86 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    price: '',
    change: '',
    changePercent: '',
  });

  const handleItemPress = (item) => {
    setEditingItem(item);
    setFormData({
      symbol: item.symbol,
      name: item.name,
      price: item.price.toString(),
      change: item.change.toString(),
      changePercent: item.changePercent.toString(),
    });
    setModalVisible(true);
  };

  const handleAddStock = () => {
    setEditingItem(null);
    setFormData({
      symbol: '',
      name: '',
      price: '',
      change: '',
      changePercent: '',
    });
    setModalVisible(true);
  };

  const handleSaveItem = () => {
    if (!formData.symbol || !formData.name || !formData.price || !formData.change || !formData.changePercent) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newItem = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      symbol: formData.symbol.toUpperCase(),
      name: formData.name,
      price: parseFloat(formData.price),
      change: parseFloat(formData.change),
      changePercent: parseFloat(formData.changePercent),
    };

    if (editingItem) {
      setMarketData(prevData => prevData.map(item => item.id === editingItem.id ? newItem : item));
    } else {
      setMarketData(prevData => [...prevData, newItem]);
    }

    setModalVisible(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (item) => {
    setItemToDelete(item);
    setDeleteConfirmVisible(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      console.log('=== MARKET DELETE ===');
      console.log('Item to delete:', itemToDelete);
      
      setMarketData(prevData => {
        console.log('List BEFORE deletion:', prevData);
        console.log('List length BEFORE:', prevData.length);
        
        // Delete the item from the list
        const newData = prevData.filter(i => i.id !== itemToDelete.id);
        
        console.log('List AFTER deletion:', newData);
        console.log('List length AFTER:', newData.length);
        console.log('Deleted item ID:', itemToDelete.id);
        console.log('Remaining items:', newData.map(item => ({ id: item.id, symbol: item.symbol })));
        console.log('====================');
        
        return newData;
      });
      
      if (editingItem && editingItem.id === itemToDelete.id) {
        setModalVisible(false);
        setEditingItem(null);
      }
    }
    setDeleteConfirmVisible(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmVisible(false);
    setItemToDelete(null);
  };

  const handleLongPress = (item) => {
    const options = ['Edit', 'Delete', 'View Details', 'Cancel'];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 3;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          destructiveButtonIndex,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            handleItemPress(item);
          } else if (buttonIndex === 1) {
            handleDeleteItem(item);
          } else if (buttonIndex === 2) {
            handleViewDetails(item);
          }
        }
      );
    } else {
      Alert.alert(
        item.symbol,
        `Choose an action for ${item.name}`,
        [
          { text: 'View Details', onPress: () => handleViewDetails(item) },
          { text: 'Edit', onPress: () => handleItemPress(item) },
          { text: 'Delete', style: 'destructive', onPress: () => handleDeleteItem(item) },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setDetailsModalVisible(true);
  };

  const handleCloseDetails = () => {
    setDetailsModalVisible(false);
    setSelectedItem(null);
  };

  const handleEditFromDetails = () => {
    setDetailsModalVisible(false);
    if (selectedItem) {
      handleItemPress(selectedItem);
    }
  };

  const swipeableRefs = useRef({});

  const renderRightActions = (item) => {
    return (
      <View style={sharedStyles.swipeActions}>
        <TouchableOpacity
          style={[sharedStyles.swipeActionButton, sharedStyles.editSwipeButton]}
          onPress={() => {
            swipeableRefs.current[item.id]?.close();
            handleItemPress(item);
          }}
        >
          <Text style={sharedStyles.swipeActionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[sharedStyles.swipeActionButton, sharedStyles.deleteSwipeButton]}
          onPress={() => {
            swipeableRefs.current[item.id]?.close();
            handleDeleteItem(item);
          }}
        >
          <Text style={sharedStyles.swipeActionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const isPositive = item.change >= 0;
    const changeColor = isPositive ? '#34C759' : '#FF3B30';
    const isHovered = hoveredItem === item.id;
    
    return (
      <View style={sharedStyles.marketItemContainer}>
        <Swipeable
          ref={(ref) => {
            if (ref) {
              swipeableRefs.current[item.id] = ref;
            }
          }}
          renderRightActions={() => renderRightActions(item)}
          rightThreshold={40}
        >
          <Pressable
            style={[
              sharedStyles.marketItem,
              isHovered && sharedStyles.marketItemHovered
            ]}
            onPress={() => handleViewDetails(item)}
            onLongPress={() => handleLongPress(item)}
            onHoverIn={() => setHoveredItem(item.id)}
            onHoverOut={() => setHoveredItem(null)}
            android_ripple={{ color: '#e0e0e0' }}
          >
            <View style={sharedStyles.marketItemContent}>
              <View style={sharedStyles.itemLeft}>
                <Text style={sharedStyles.symbol}>{item.symbol}</Text>
                <Text style={sharedStyles.name}>{item.name}</Text>
              </View>
              <View style={sharedStyles.itemRight}>
                <Text style={sharedStyles.price}>${item.price.toFixed(2)}</Text>
                <Text style={[sharedStyles.change, { color: changeColor }]}>
                  {isPositive ? '+' : ''}{item.change.toFixed(2)} ({isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%)
                </Text>
              </View>
            </View>
            {isHovered && (
              <View style={sharedStyles.hoverActions}>
                <TouchableOpacity
                  style={[sharedStyles.hoverActionButton, sharedStyles.editHoverButton]}
                  onPress={() => handleItemPress(item)}
                >
                  <Text style={sharedStyles.hoverActionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[sharedStyles.hoverActionButton, sharedStyles.deleteHoverButton]}
                  onPress={() => handleDeleteItem(item)}
                >
                  <Text style={sharedStyles.hoverActionText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[sharedStyles.hoverActionButton, sharedStyles.viewHoverButton]}
                  onPress={() => handleViewDetails(item)}
                >
                  <Text style={sharedStyles.hoverActionText}>Details</Text>
                </TouchableOpacity>
              </View>
            )}
            {!isHovered && (
              <Text style={sharedStyles.hintText}>Tap for details • Long press for options • Swipe left for actions</Text>
            )}
          </Pressable>
        </Swipeable>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <TouchableOpacity 
        style={sharedStyles.addButtonFooter} 
        onPress={handleAddStock}
        activeOpacity={0.7}
      >
        <Text style={sharedStyles.addButtonText}>+</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={sharedStyles.container}>
      <View style={sharedStyles.marketHeader}>
        <Text style={sharedStyles.headerTitle}>Market Data</Text>
      </View>
  
      <FlatList
        data={marketData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={sharedStyles.list}
        contentContainerStyle={sharedStyles.listContent}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={{ paddingTop: 20, paddingBottom: 100 }}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={sharedStyles.modalOverlay}>
          <View style={sharedStyles.modalContent}>
            <Text style={sharedStyles.modalTitle}>
              {editingItem ? 'Edit Market Item' : 'Add Market Item'}
            </Text>
            
            <TextInput
              style={sharedStyles.input}
              placeholder="Symbol (e.g., AAPL)"
              value={formData.symbol}
              onChangeText={(text) => setFormData({ ...formData, symbol: text })}
            />
            <TextInput
              style={sharedStyles.input}
              placeholder="Company Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <TextInput
              style={sharedStyles.input}
              placeholder="Price"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={sharedStyles.input}
              placeholder="Change"
              value={formData.change}
              onChangeText={(text) => setFormData({ ...formData, change: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={sharedStyles.input}
              placeholder="Change %"
              value={formData.changePercent}
              onChangeText={(text) => setFormData({ ...formData, changePercent: text })}
              keyboardType="numeric"
            />

            <View style={sharedStyles.modalButtons}>
              <TouchableOpacity
                style={[sharedStyles.modalButton, sharedStyles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={sharedStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[sharedStyles.modalButton, sharedStyles.saveButton]}
                onPress={handleSaveItem}
              >
                <Text style={sharedStyles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <DeleteConfirmModal
        visible={deleteConfirmVisible}
        itemToDelete={itemToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <DetailsModal
        visible={detailsModalVisible}
        item={selectedItem}
        onClose={handleCloseDetails}
        onEdit={handleEditFromDetails}
      />
    </View>
  );
};

export default MarketScreen;

