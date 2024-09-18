import { supabase } from '../supabaseClient';

export const addProduct = async (
  name: string,
  description: string,
  price: number,
  imageUrl: string,
  category: string,
  stockQuantity: number
): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description,
          price,
          image_url: imageUrl,
          category,
          stock_quantity: stockQuantity,
        },
      ]);

    if (error) {
      throw error;
    }

    console.log('Product added successfully:', data);
  } catch (error:any) {
    console.error('Error adding product:', error.message);
  }
};

export const getProduct = async (): Promise<any[] | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.log (`error: ${error}`);
      throw error;
    }
    
    console.log (data);
    return data;
  } catch (error:any) {
    console.error('Error fetching products:', error.message);
    return null;
  }
};

const getOrCreateCart = async (userId: string): Promise<string | null> => {
  try {
    const { data: cartData, error: fetchError } = await supabase
      .from('cart')
      .select('cart_id')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (cartData) {
      return cartData.cart_id;
    }

    const { data: newCart, error: createError } = await supabase
      .from('cart')
      .insert([
        {
          user_id: userId,
        },
      ])
      .select('cart_id')
      .single();

    if (createError) {
      throw createError;
    }

    return newCart.cart_id;
  } catch (error:any) {
    console.error('Error creating or fetching cart:', error.message);
    return null;
  }
};

export const addProductToCart = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<void> => {
  try {
    const cartId = await getOrCreateCart(userId);

    if (!cartId) {
      console.error('Failed to retrieve or create cart');
      return;
    }

    const { data, error } = await supabase
      .from('cart_item')
      .insert([
        {
          cart_id: cartId,
          product_id: productId,
          quantity,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    console.log('Product added to cart:', data);
  } catch (error: any) {
    console.error('Error adding product to cart:', error.message);
  }
};


export const getCartItems = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('cart_item')
      .select('cart_id, quantity, product:products(name, price)')
      .eq('cart_id', (await getUserCartId(userId))?.cart_id);

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error('Error fetching cart items:', error.message);
    return null;
  }
};

const getUserCartId = async (userId: string) => {
  const { data, error } = await supabase
    .from('cart')
    .select('cart_id')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user cart ID:', error.message);
    return null;
  }

  return data;
};
