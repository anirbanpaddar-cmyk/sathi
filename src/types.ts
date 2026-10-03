/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type KurtiCategory =
  | 'All'
  | 'Sleeveless Cotton Kurti'
  | 'Printed Kurti'
  | 'Anarkali Kurti'
  | 'A-Line Kurti'
  | 'Straight Kurti'
  | 'Embroidered Kurti'
  | 'Festive Kurti'
  | 'Casual Daily-Wear Kurti'
  | 'Office-Wear Kurti'
  | 'Designer Kurti';

export interface ProductVariant {
  id: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: string;
  colorHex: string;
  stock: number;
  inStock: boolean;
}

export interface Review {
  id: string;
  reviewer: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

export interface Product {
  productId: string;
  name: string;
  category: string;
  productType?: 'blouse' | 'kurti';
  price: number; // Original MRP
  salePrice: number; // Current selling price
  images: string[];
  description: string;
  shortDescription?: string;
  stock: number;
  SKU: string;
  variants: ProductVariant[];
  rating: number;
  reviewsCount?: number;
  reviews: Review[];
  isHot?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  badge?: string;
  fabric: string;
  pattern: string;
  fit?: string;
  neckline?: string;
  sleeveCut?: string;
  craftsmanship?: string;
  careInstructions?: string;
  deliveryInfo?: string;
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  colors: { name: string; hex: string }[];
}

export interface CartItem {
  id: string; // unique item line id
  productId: string;
  name: string;
  image: string;
  SKU: string;
  variantId: string;
  size: string;
  color: string;
  quantity: number;
  price: number; // salePrice
  lineTotal: number;
}

export interface Cart {
  cartId: string;
  customerId: string;
  items: CartItem[];
  quantity: number; // total units
  price: number; // subtotal at regular MRP
  subtotal: number; // subtotal at salePrice
  discount: number; // discount from coupon/sale
  shipping: number; // delivery fee (0 if free threshold met)
  total: number; // grand payable amount
  appliedCoupon?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type PaymentMethod = 'Cash on Delivery' | 'Online Payment' | 'UPI' | 'Card' | 'NetBanking';
export type PaymentStatus = 'Pending' | 'Paid' | 'Cash on Delivery';
export type OrderStatus =
  | 'Pending'
  | 'Placed'
  | 'Processing'
  | 'Confirmed'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface Order {
  orderId: string;
  customerId: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  discount: number;
  shippingCharge?: number;
  shipping?: number;
  grandTotal: number;
  orderDate?: string;
  createdAt?: string;
  estimatedDelivery?: string;
  estimatedDeliveryDate?: string;
  trackingNumber: string;
  courierName?: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  savedAddresses: ShippingAddress[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  itemCount: string;
  image: string;
  description: string;
  badge?: string;
}
