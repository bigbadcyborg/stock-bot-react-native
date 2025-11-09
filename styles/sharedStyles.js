import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  // Container styles
  appContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  // Header styles
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 40,
  },
  marketHeader: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  
  // List styles
  list: {
    flex: 1,
  },
  listContent: {
    padding: 15,
  },
  
  // Item container styles
  portfolioItemContainer: {
    marginBottom: 10,
  },
  marketItemContainer: {
    marginBottom: 10,
  },
  
  // Item styles
  portfolioItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
  },
  portfolioItemHovered: {
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  marketItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
  },
  marketItemHovered: {
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  marketItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  // Item header styles
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemLeft: {
    flex: 1,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  
  // Text styles
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  shares: {
    fontSize: 14,
    color: '#666',
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profitLoss: {
    fontSize: 14,
    color: '#34C759',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  change: {
    fontSize: 14,
    marginTop: 5,
  },
  hintText: {
    fontSize: 10,
    color: '#999',
    marginTop: 8,
    fontStyle: 'italic',
  },
  
  // Button styles
  addButtonFooter: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: '#007AFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  
  // Swipe action styles
  swipeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  swipeActionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    paddingHorizontal: 10,
  },
  editSwipeButton: {
    backgroundColor: '#007AFF',
  },
  deleteSwipeButton: {
    backgroundColor: '#FF3B30',
  },
  swipeActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // Hover action styles
  hoverActions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  hoverActionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    minWidth: 70,
    alignItems: 'center',
    marginRight: 8,
  },
  editHoverButton: {
    backgroundColor: '#007AFF',
  },
  deleteHoverButton: {
    backgroundColor: '#FF3B30',
  },
  viewHoverButton: {
    backgroundColor: '#34C759',
  },
  hoverActionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

