import create from "zustand";

const useAppStore = create((set, get) => ({
  showCart: false,
  isLoggedin: false,
  setIsLoggedin: (state) => set({ isLoggedin: state }),
  setShowCart: (state) => set({ showCart: state }),
  showAuthModal: false,
  setShowAuthModal: (state) => set({ showAuthModal: state }),
  user: null,
  setUser: (user) => set({ user }),
  showTotal: false,
  setShowTotal: (state) => set({ showTotal: state }),
  //shop step
  currentShopStep: 0,
  setCurrentShopStep: (state) => set({ currentShopStep: state }),
  drawingStyle: null,
  setDrawingStyle: (state) => set({ drawingStyle: state }),
  selectedImage: "",
  setSelectedImage: (state) => set({ selectedImage: state }),
  numberOfPersonTobeDrawn: null,
  setNumberOfPersonTobeDrawn: (state) =>
    set({ numberOfPersonTobeDrawn: state }),
  additionalComments: "",
  setAdditionalComments: (state) => set({ additionalComments: state }),
  product: null,
  setProduct: (state) => set({ product: state }),
  clearCartDetails: () => {
    set({
      drawingStyle: null,
      product: null,
      numberOfPersonTobeDrawn: null,
      additionalComments: "",
      selectedImage: "",
      currentShopStep: 0,
      selectedProducts: [],
    });
  },
  selectedProducts: [],
  getProductQuantityById: (productId) => {
    let currentSelectedProducts = get().selectedProducts;
    let index = currentSelectedProducts.findIndex(
      (item) => item.product._id === productId
    );
    if (index === -1) return 0;
    return currentSelectedProducts[index].quantity;
  },
  updateProductContentById: (productId, json) => {
    let currentSelectedProducts = get().selectedProducts;
    let index = currentSelectedProducts.findIndex(
      (item) => item.product._id === productId
    );
    if (index === -1) return;
    currentSelectedProducts[index].content = json;
    return set({ selectedProducts: currentSelectedProducts });
  },
  updateSelectedProducts: ({ product, quantity, content }) =>
    set((state) => {
      let selectedProducts = [...state.selectedProducts];
      console.log(`Upading...`, product, quantity, content);
      let index = selectedProducts.findIndex(
        (p) => p?.product?._id === product?._id
      );
      if (quantity === 0 && index != -1) {
        selectedProducts = selectedProducts?.filter(
          (item) => item.product?._id !== product?._id
        );
      } else if (index === -1) {
        selectedProducts.push({ product, quantity, content: content || [] });
      } else {
        selectedProducts = selectedProducts.map((item) => {
          if (item?.product?._id === product?._id)
            return { ...item, quantity, content: content || [] };
          return item;
        });
      }
      return { selectedProducts };
    }),
}));


export default useAppStore;
